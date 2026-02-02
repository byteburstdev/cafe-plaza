import { menuItems } from '../data/menuData';

// Variables globales
let modalOverlay: HTMLElement | null = null;
let modalImage: HTMLImageElement | null = null;
let modalTitle: HTMLElement | null = null;
let modalPrice: HTMLElement | null = null;
let modalIngredientsList: HTMLElement | null = null;

// Inicializar modal
export function initializeModal() {
	modalOverlay = document.getElementById('product-modal');
	modalImage = document.getElementById('modal-image') as HTMLImageElement;
	modalTitle = document.getElementById('modal-title');
	modalPrice = document.getElementById('modal-price');
	modalIngredientsList = document.getElementById('modal-ingredients-list');

	const closeBtn = document.getElementById('modal-close');
	
	// Cerrar modal al hacer click en el botón
	closeBtn?.addEventListener('click', closeModal);
	
	// Cerrar modal al hacer click fuera del contenido
	modalOverlay?.addEventListener('click', (e) => {
		if (e.target === modalOverlay) {
			closeModal();
		}
	});

	// Cerrar modal con tecla ESC
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			closeModal();
		}
	});
}

// Abrir modal con información del producto
function openModal(name: string, price: string, image: string, ingredients: string[]) {
	if (!modalOverlay || !modalImage || !modalTitle || !modalPrice || !modalIngredientsList) return;

	modalTitle.textContent = name;
	modalPrice.textContent = price;
	modalImage.src = image;
	modalImage.alt = name;

	// Limpiar y agregar ingredientes
	modalIngredientsList.innerHTML = '';
	ingredients.forEach((ingredient) => {
		const li = document.createElement('li');
		li.textContent = ingredient;
		modalIngredientsList?.appendChild(li);
	});

	modalOverlay.classList.add('active');
	document.body.style.overflow = 'hidden'; // Prevenir scroll
}

// Cerrar modal
function closeModal() {
	if (!modalOverlay) return;
	modalOverlay.classList.remove('active');
	document.body.style.overflow = ''; // Restaurar scroll
}

// Inicializar cards normales
export function initializeMenuCards() {
	const cards = document.querySelectorAll('[data-card]');

	cards.forEach(card => {
		card.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
			
			// Si se hace click en el toggle button, no abrir modal
			if (target.closest('[data-toggle-btn]')) return;

			const name = card.getAttribute('data-name') || '';
			const price = card.getAttribute('data-price') || '';
			const image = card.getAttribute('data-image') || '';
			const ingredientsStr = card.getAttribute('data-ingredients') || '[]';
			const ingredients = JSON.parse(ingredientsStr);

			addRippleEffect(card as HTMLElement);
			setTimeout(() => {
				openModal(name, price, image, ingredients);
			}, 200);
		});
	});
}

// Inicializar cards con toggle
export function initializeToggleCards() {
	const toggleCards = document.querySelectorAll('[data-toggle-item]');

	toggleCards.forEach(card => {
		const toggleBtn = card.querySelector('[data-toggle-btn]');
		const itemName = card.getAttribute('data-item-name') || '';

		// Click en el toggle button
		toggleBtn?.addEventListener('click', (e) => {
			e.stopPropagation();
			handleToggleClick(card, itemName);
		});

		// Click en la card (abrir modal)
		card.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
			
			// Si se hace click en el toggle button, no hacer nada
			if (target.closest('[data-toggle-btn]')) return;

			const currentOption = card.getAttribute('data-current-option') || '';
			const toggleOptionsStr = card.getAttribute('data-toggle-options') || '{}';
			const toggleOptions = JSON.parse(toggleOptionsStr);
			const data = toggleOptions[currentOption];

			if (data) {
				const titleElement = card.querySelector('[data-title]');
				const name = titleElement?.textContent || '';
				const image = (card.querySelector('[data-card-image]') as HTMLImageElement)?.src || '';

				addRippleEffect(card as HTMLElement);
				setTimeout(() => {
					openModal(name, data.price, image, data.ingredients);
				}, 200);
			}
		});
	});
}

// Manejar click en toggle
function handleToggleClick(card: Element, itemName: string) {
	const toggleBtn = card.querySelector('[data-toggle-btn]');
	const options = toggleBtn?.querySelectorAll('.toggle-option');
	const activeOption = toggleBtn?.querySelector('.toggle-option.active');
	
	if (!options || !activeOption) return;

	// Encontrar siguiente opción
	let nextOption: Element | null = null;
	options.forEach((option, index) => {
		if (option === activeOption && options[index + 1]) {
			nextOption = options[index + 1];
		}
	});

	if (!nextOption) nextOption = options[0];

	// Actualizar opciones activas
	options.forEach(opt => opt.classList.remove('active'));
	nextOption.classList.add('active');

	const optionType = nextOption.getAttribute('data-option') || '';
	card.setAttribute('data-current-option', optionType);
	
	updateCardContent(card, itemName, optionType);

	// Animar el card
	card.classList.add('toggling');
	setTimeout(() => card.classList.remove('toggling'), 600);
}

// Actualizar contenido del card con animación de flip
function updateCardContent(card: Element, itemName: string, optionType: string) {
	const menuItem = menuItems.find(item => item.name === itemName);
	if (!menuItem || !menuItem.toggleOptions) return;

	const data = menuItem.toggleOptions[optionType];
	if (!data) return;

	const titleElement = card.querySelector('[data-title]');
	const priceElement = card.querySelector('[data-price]');
	const imageWrapper = card.querySelector('.card-image-wrapper');
	const imageElement = card.querySelector('[data-card-image]') as HTMLImageElement;

	// Animar flip de imagen y cambiar src
	if (imageWrapper && imageElement) {
		imageWrapper.classList.add('flipping');
		
		// Cambiar imagen exactamente en el punto medio cuando está invisible
		setTimeout(() => {
			imageElement.src = data.image;
			imageElement.alt = data.title;
		}, 300);
		
		setTimeout(() => {
			imageWrapper.classList.remove('flipping');
		}, 600);
	}

	// Animar título
	if (titleElement) {
		titleElement.classList.add('animating');
		setTimeout(() => {
			titleElement.textContent = data.title;
			setTimeout(() => {
				titleElement.classList.remove('animating');
			}, 50);
		}, 400);
	}

	// Animar precio
	if (priceElement) {
		priceElement.classList.add('animating');
		setTimeout(() => {
			priceElement.textContent = data.price;
			setTimeout(() => {
				priceElement.classList.remove('animating');
			}, 50);
		}, 300);
	}
}

// Auto-toggle para cards con toggle
export function initializeAutoToggle() {
	const toggleCards = document.querySelectorAll('[data-auto-toggle="true"]');
	
	toggleCards.forEach((card, index) => {
		const itemName = card.getAttribute('data-item-name') || '';
		
		setInterval(() => {
			handleToggleClick(card, itemName);
		}, 4000 + (index * 500)); // Stagger para que no cambien todos a la vez
	});
}

// Efecto ripple
function addRippleEffect(card: HTMLElement) {
	card.classList.add('ripple');
	setTimeout(() => {
		card.classList.remove('ripple');
	}, 600);
}

// Animación de entrada escalonada
export function initializeFadeInAnimation() {
	const menuItems = document.querySelectorAll('.menu-item');
	menuItems.forEach((item, index) => {
		(item as HTMLElement).style.animationDelay = `${index * 0.05}s`;
	});
}

// Inicializar todo
export function initializeAll() {
	initializeModal();
	initializeMenuCards();
	initializeToggleCards();
	initializeAutoToggle();
	initializeFadeInAnimation();
}
