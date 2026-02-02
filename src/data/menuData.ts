// Datos del menú centralizados
export interface MenuItem {
	name: string;
	price: string;
	image: string;
	ingredients: string[];
	hasToggle?: boolean;
	toggleOptions?: {
		[key: string]: {
			title: string;
			price: string;
			image: string;
			ingredients: string[];
		};
	};
}

export const menuItems: MenuItem[] = [
	{
		name: 'Humitas',
		price: '$0.50',
		image: '/assets/menu/huma.png',
		ingredients: [
			'Choclo tierno molido',
			'Queso fresco',
			'Huevos',
			'Mantequilla',
			'Hojas de choclo'
		]
	},
	{
		name: 'Empanadas de Queso',
		price: '$0.50',
		image: '/assets/menu/empanada.png',
		ingredients: [
			'Masa de harina de trigo',
			'Queso fresco',
		]
	},
	{
		name: 'Empanadas Chilenas',
		price: '$1.00',
		image: '/assets/menu/empanada-carne.png',
		ingredients: [
			'Carne molida de res',
			'Pasas',
			'Huevo duro',
			'Comino y especias'
		]
	},
	{
		name: 'Café',
		price: '$0.50',
		image: '/assets/menu/cafe.png',
		ingredients: [
			'Café pasado',
		]
	},
	{
		name: 'Colada Morada',
		price: '$0.75',
		image: '/assets/menu/colada-morada.png',
		ingredients: [
			'Harina de maíz morado',
			'Mora, mortiño, frutilla',
			'Naranjilla',
			'Canela, clavo, ishpingo',
			'Panela'
		]
	},
	{
		name: 'Morocho',
		price: '$0.75',
		image: '/assets/menu/morocho.png',
		ingredients: [
			'Maíz morocho molido',
			'Leche fresca',
			'Canela en rama',
			'Azúcar o panela',
			'Pasas (opcional)'
		]
	},
	{
		name: 'Pinchos',
		price: '$2.50',
		image: '/assets/menu/pincho.png',
		ingredients: [
			'Carne de res marinada',
			'Pimientos de colores',
			'Cebolla perla',
            'Chorizo',
			'Salsa chimichurri'
		],
		hasToggle: true,
		toggleOptions: {
			solo: {
				title: 'Pincho Solo',
				price: '$2.50',
				image: '/assets/menu/pincho.jpg',
				ingredients: [
					'Carne de res marinada',
					'Pimientos de colores',
					'Cebolla perla',
					'Salsa chimichurri'
				]
			},
			papas: {
				title: 'Pincho con Papas',
				price: '$3.00',
				image: '/assets/menu/pincho-papas.jpg',
				ingredients: [
					'Carne de res marinada',
					'Pimientos de colores',
					'Cebolla perla',
					'Salsa chimichurri',
					'Papas al horno'
				]
			}
		}
	},
	{
		name: 'Hamburguesas',
		price: '$2.25',
		image: '/assets/menu/hamburguesa.png',
		ingredients: [
			'Carne de res 200g',
			'Pan brioche artesanal',
			'Lechuga, tomate, cebolla',
			'Salsa especial'
		],
		hasToggle: true,
		toggleOptions: {
			simple: {
				title: 'Hamburguesa Simple',
				price: '$2.25',
				image: '/assets/menu/hamburguesa.png',
				ingredients: [
					'Carne de res 200g',
					'Pan de hamburguesa',
					'Lechuga, tomate, cebolla',
					'Salsa especial'
				]
			},
			mixta: {
				title: 'Hamburguesa Mixta',
				price: '$2.75',
				image: '/assets/menu/hamburguesa.png',
				ingredients: [
					'Carne de res 200g',
					'Pan de hamburguesa',
					'Jamón y queso',
					'Lechuga, tomate, cebolla',
					'Salsa especial'
				]
			}
		}
	},
	{
		name: 'Empanadas de Verde',
		price: '$0.50',
		image: '/assets/menu/empanada-verde.webp',
		ingredients: [
			'Plátano verde',
			'Queso fresco',
			'Mantequilla',
			'Sal al gusto'
		]
	},
	{
		name: 'Cake de Banano',
		price: '$1.00',
		image: '/assets/menu/cake-banano.webp',
		ingredients: [
			'Banano maduro',
			'Harina de trigo',
			'Huevos',
			'Azúcar',
			'Mantequilla'
		]
	}
];
