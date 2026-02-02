# Estructura del Proyecto - Menú Refactorizado

## 📁 Arquitectura del Código

### `/src/components/`
Componentes reutilizables de Astro:

- **MenuCard.astro**: Componente para items del menú sin opciones toggle
  - Props: `name`, `price`, `image`, `ingredients[]`
  - Renderiza una card con imagen, precio y panel de ingredientes

- **MenuCardToggle.astro**: Componente para items con opciones múltiples
  - Props: `name`, `image`, `toggleOptions{}`
  - Maneja hamburguesas y pinchos con toggle entre opciones
  - Auto-toggle integrado

### `/src/data/`
Datos centralizados del menú:

- **menuData.ts**: 
  - Interface `MenuItem` con tipos TypeScript
  - Array `menuItems` con todos los productos
  - Fuente única de verdad para el menú

### `/src/scripts/`
Lógica de JavaScript modularizada:

- **menuInteractions.ts**:
  - `initializeMenuCards()`: Gestión de cards normales
  - `initializeToggleCards()`: Gestión de cards con toggle
  - `initializeAutoToggle()`: Auto-alternancia de opciones
  - `initializeIngredientButtons()`: Botones de ver ingredientes
  - `initializeOutsideClick()`: Cerrar al hacer click fuera
  - `initializeFadeInAnimation()`: Animación de entrada
  - `initializeTooltipAnimation()`: Tooltips flotantes

### `/src/styles/`
Estilos CSS organizados por responsabilidad:

- **animations.css**: Animaciones globales (fadeIn, slideUp, etc.)
- **menuCards.css**: Estilos de las cards (overlay, toggle, ripple)
- **menuComponents.css**: Componentes visuales (título, precio, botón)
- **menuToggle.css**: Toggle buttons y panel de ingredientes
- **global.css**: Estilos globales de Tailwind

### `/src/pages/`
Páginas de la aplicación:

- **menu.astro**: Página principal del menú (refactorizada)
- **menu.astro.backup**: Backup de la versión anterior

## 🎯 Ventajas de la Refactorización

### ✅ Código Limpio
- Separación de responsabilidades (SRP)
- Componentes reutilizables
- Lógica desacoplada

### ✅ Mantenibilidad
- Fácil de actualizar productos (solo menuData.ts)
- Estilos organizados por contexto
- JavaScript modular y testeablereact

### ✅ Escalabilidad
- Agregar nuevos items: solo modificar menuData.ts
- Nuevos tipos de cards: crear nuevo componente
- Nuevas interacciones: agregar función en menuInteractions.ts

### ✅ Performance
- Imports optimizados
- CSS separado para mejor caching
- JavaScript lazy-loadable

## 🔄 Flujo de Datos

```
menuData.ts
    ↓
menu.astro (itera menuItems)
    ↓
MenuCard / MenuCardToggle (renderiza UI)
    ↓
menuInteractions.ts (maneja eventos)
    ↓
menuData.ts (consulta datos para toggles)
```

## 📝 Cómo Agregar un Nuevo Item

1. Ir a `src/data/menuData.ts`
2. Agregar objeto al array `menuItems`:
```typescript
{
  name: 'Nombre del Producto',
  price: '$X.XX',
  image: '/assets/menu/imagen.png',
  ingredients: ['ing1', 'ing2', ...]
}
```
3. ¡Listo! El componente se renderiza automáticamente

## 🔧 Modificaciones Futuras

Para agregar nuevas funcionalidades:

1. **Nuevo tipo de card**: Crear componente en `/components/`
2. **Nueva interacción**: Agregar función en `/scripts/menuInteractions.ts`
3. **Nuevos estilos**: Agregar archivo CSS en `/styles/`
4. **Nuevo campo de datos**: Actualizar interface en `/data/menuData.ts`
