# UX-UI — Guía visual de estilos — CommunityCoursesIT

> **Qué es:** la gramática visual de la interfaz: tokens, componentes, estados, accesibilidad.
> No es un prototipo navegable (eso lo cubre el APPFlow); es el conjunto de reglas con las que
> se construye cada pantalla **antes** de escribir CSS.
> **Inspiración fijada por la SPEC:** la apariencia y experiencia deben ser similares a **Google**
> (estética Material: limpieza, espacio en blanco, azul primario, sombras sutiles, radios amplios).
> **Ejemplo completado:** [`03_UX-UI_EJEMPLO.md`](./03_UX-UI_EJEMPLO.md) — mirá el nivel de detalle
> esperado; no lo copies, adaptá.
> **Cuándo está bien:** dos personas que sigan esta guía construyen la misma pantalla y queda
> igual; todos los estados de cada componente (focus, error, empty, loading) están definidos
> de antemano; la estrategia mobile-first con mejora progresiva es explícita.

## 1. Principios (3 a 5)

1. **Limpieza sobre adorno:** si un elemento visual no comunica información ni acción, sobra.
2. **Espacio en blanco como herramienta:** el aire agrupa mejor que las cajas.
3. **Un solo color de acción por pantalla:** el azul primario marca lo que se puede hacer.
4. **Mobile primero:** el layout base se diseña para 360px y se mejora hacia arriba, nunca se repara.

## 2. Design tokens

### 2.1 Paleta de colores

| Token | Valor | Uso | Contraste AA |
|-------|-------|-----|--------------|
| `--color-primary` | `#004ac6` | botones primarios, links | vs `--surface`: 4.5:1 ✓ |
| `--color-on-primary` | `#ffffff` | texto/iconos sobre primario | vs primary: 4.5:1 ✓ |
| `--color-surface` | `#f9f9ff` | fondos de tarjetas | |
| `--color-background` | `#f9f9ff` | fondo de página | |
| `--color-text` | `#111c2d` | texto principal | vs background: 4.5:1 ✓ |
| `--color-text-muted` | `#434655` | texto secundario | vs background: ≥ 4.5:1 ✓ |
| `--color-success` | `#006c49` | confirmaciones | |
| `--color-warning` | `#784b00` | avisos | |
| `--color-error` | `#ba1a1a` | errores de validación | |

> Verificá el contraste en https://webaim.org/resources/contrastchecker/ y anotá el ratio real.

### 2.2 Tipografía

| Token | Familia | Tamaño / line-height | Uso |
|-------|---------|----------------------|-----|
| `--font-family-base` | Inter, system-ui | — | cuerpo |
| `--text-sm` | Inter | 13px / 20px | metadatos |
| `--text-base` | Inter | 15px / 24px | cuerpo |
| `--text-lg` | Inter | 16px / 24px | títulos de sección |
| `--text-xl` | Inter | 32px / 40px | títulos de página |

### 2.3 Espaciado, radios, sombras, z-index

| Token | Valor | Uso |
|-------|-------|-----|
| `--space-1` … `--space-8` | 4, 8, 12, 16, 24, 32, 40, 48 px | ritmo vertical y gutters |
| `--radius-sm / md / lg` | 4px / 8px / 12px | botones / cards / modales |
| `--shadow-sm / md` | Elevación sutil | elevación de cards / modales |
| `--z-header / --z-modal / --z-toast` | 50 / 200 / 300 | orden de capas |

### 2.4 Bloque de variables listo para copiar

```css
:root {
  --color-primary: #004ac6;
  --color-on-primary: #ffffff;
  --color-surface: #f9f9ff;
  --color-background: #f9f9ff;
  --color-text: #111c2d;
  --color-text-muted: #434655;
  --color-success: #006c49;
  --color-warning: #784b00;
  --color-error: #ba1a1a;

  --font-family-base: "Inter", system-ui, sans-serif;
  --text-sm: 13px;
  --text-base: 15px;
  --text-lg: 16px;
  --text-xl: 32px;

  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
}
```

## 3. Estrategia mobile-first con mejora progresiva

> Obligatorio según la SPEC. **Prohibido** usar media queries para "arreglar" el layout base:
> solo para agregar o mejorar a medida que la pantalla crece.

| Capa | Dónde aplica | Qué define |
|------|--------------|------------|
| **Base (sin media queries)** | todos los viewports | layout de 1 columna, menú sándwich, tablas densas → cards apiladas, tipografía mobile, targets ≥ 44px |
| `@media (min-width: 768px)` | tablets | grid de 2 columnas, nav horizontal en el header, tablas reales |
| `@media (min-width: 1024px)` | desktop | grid de 3 columnas, contenedor con max-width |

## 4. Componentes (anatomía + estados)

> Por cada componente: anatomía breve, tokens usados y **todos** sus estados.

### 4.1 Botón (primario / secundario / peligro)
- **Anatomía Primario:** Fondo `--color-primary`, texto en `--color-on-primary`, con un padding de 12px vertical y 24px horizontal. Utiliza bordes redondeados completos tipo píldora (`--radius-button` de 18px), tipografía Inter de 15px con peso semibold y un icono opcional de 20px a la izquierda del texto.
- **Anatomía Secundario:** Sin fondo sólido, texto en `--color-primary`, mismo padding y tipografía. En estado hover adquiere un fondo gris tenue (`--color-hover-grey`).
- **Anatomía Peligro:** Texto en `--color-error` y fondo transparente o rojo claro. Requiere siempre confirmación de doble paso para evitar acciones destructivas accidentales.
- **Estados:** `default` (normal), `hover` (elevación a `--shadow-2` o cambio de fondo), `focus-visible` (anillo de 2px sólido azul con offset), `active` (escala visualmente al 95%), `disabled` (opacidad al 38% y sin puntero), `loading` (muestra un spinner giratorio reemplazando el icono y se deshabilita).

### 4.2 Campo de formulario (input / select)
- **Anatomía:** Contenedor de 48px de alto, borde outlined de 1px sólido en `--color-border`, con un radio de `--radius-input` (8px). El texto interno utiliza `--text-base` (15px). El label flota en la parte superior del borde con tamaño `--text-sm` y color `--color-text-muted`.
- **Estados:** `default` (borde gris en reposo), `focus` (borde de 2px en `--color-primary` y label azul), `filled` (texto ya ingresado), `error` (borde y label en `--color-error` de 2px, texto de ayuda debajo con icono de alerta), `disabled` (fondo gris claro e interacción bloqueada).
- **Accesibilidad:** Todo mensaje de error o texto de ayuda inferior debe vincularse obligatoriamente al input correspondiente mediante el atributo `aria-describedby`.

### 4.3 Card de curso
- **Anatomía:** Tarjeta con fondo `--color-surface`, radio de `--radius-card` (12px), padding interno de `--space-4` (16px) y sombra base `--shadow-1`. Incluye el título en `--text-lg`, la categoría como un badge visual destacado, los nombres de los disertantes en texto secundario `--text-sm`, y una fila inferior con badges iconográficos (Certificado, Examen).
- **Estados:** `default` (reposo en la grilla), `hover` (la elevación/sombra se incrementa a `--shadow-2` y el cursor cambia a pointer indicando interactividad), `seleccionada` (adquiere un borde sólido `--color-primary` de 2px y un check para indicar que pertenece al roadmap del usuario).

### 4.4 Lista/tabla paginada
- **Comportamiento adaptativo:** En viewports menores a 768px (móviles), cada fila de la tabla se renderiza como una tarjeta (card) apilada verticalmente. En viewports mayores a 768px (tablets y desktop), el diseño se expande formando una tabla tradicional con filas separadas por divisores `--color-border`.
- **Paginador:** Utiliza un estilo centrado inferior con botones circulares para los números y flechas de navegación (« ‹ 1 2 3 › »). El número actual activo tiene fondo `--color-primary-container`.
- **Estado vacío:** Si la tabla no arroja resultados o filtros vacíos, se oculta el encabezado de columnas y se muestra el componente de Empty State.

### 4.5 Menú sándwich
- **Anatomía:** Botón de icono hamburguesa ubicado en la esquina superior izquierda del header. Al presionarse, despliega un panel lateral de 280px de ancho desde la izquierda (`--color-surface`) con bordes derechos redondeados, acompañado de un overlay oscuro translúcido (`backdrop`) que cubre el resto de la interfaz.
- **Estados:** `cerrado` (solo se ve el icono), `abierto` (panel visible con sombra `--shadow-2` y animación de entrada deslizante suave).
- **Cierre:** Se oculta de manera automática al hacer clic en un enlace interno, presionar el botón de cerrar (X), tocar la tecla `ESC` o hacer clic en el overlay exterior.
- **Accesibilidad:** Manejo estricto de atributos `aria-expanded` y `aria-controls`. El foco del teclado (focus trap) debe quedar atrapado dentro del panel mientras permanezca abierto.

### 4.6 Modal
- **Anatomía:** Contenedor central flotando sobre un overlay oscuro. Posee un radio pronunciado de 28px (estilo Material 3), fondo blanco, padding interno holgado (`--space-lg`), y botones de acción alineados a la derecha en la parte inferior (Cancelar / Confirmar).
- **Estados:** `cerrado` (invisible en el DOM), `abierto` (visible con transición de escala y opacidad, aplicando `focus trap` para impedir la navegación por detrás del modal).
- **Cierre:** Mediante botón "X" superior derecho, botón "Cancelar" o la tecla `ESC`.

### 4.7 Toast (notificación)
- **Anatomía:** Contenedor rectangular flotante de color oscuro, con texto blanco `--text-sm`, un icono representativo a la izquierda y bordes redondeados (`--radius-sm`). Se ubica centrado en la parte inferior en móviles, o en la esquina inferior izquierda en escritorio.
- **Tipos:** Éxito (icono check verde), Error (icono de alerta rojo), Info (icono de información azul).
- **Comportamiento:** Aparece con una animación deslizable desde abajo, dura entre 4 y 6 segundos, y desaparece automáticamente. Implementa siempre el atributo `role="status"` para alertar a los lectores de pantalla.

### 4.8 Skeleton y Empty state
- **Skeleton:** Bloques grises (`--color-hover-grey`) con formas que simulan la estructura del contenido final (títulos, imágenes de cursos), utilizando una animación de brillo (shimmer) de izquierda a derecha. Mantiene al usuario ocupado visualmente durante la carga asíncrona de datos.
- **Empty state:** Se compone de una ilustración o icono grande en color `--color-text-muted`, seguido de un título en `--text-lg`, un párrafo explicativo breve sobre la ausencia de datos, y un botón primario de acción (CTA) (ej. "Aportar el primer curso").

## 5. Layout y navegación

- **Header:** De comportamiento sticky (z-index `--z-header`), se mantiene adherido al borde superior al hacer scroll y adquiere una ligera sombra. En móviles contiene el icono hamburguesa y el logo; en desktop despliega los enlaces de navegación horizontalmente y el avatar de sesión a la derecha.
- **Contenedores:** El cuerpo principal de la aplicación tiene un ancho máximo (`max-width: 1140px`) y se centra con `margin: 0 auto`. Utiliza márgenes laterales (`px-margin`) que garantizan que el contenido nunca toque los bordes físicos en dispositivos móviles.
- **Pantallas:** Las vistas principales incluyen Catálogo, Mis Roadmaps, Panel de Aportes y Moderación. El flujo exacto y navegación entre estas pantallas se detalla exhaustivamente en el documento APPFlow.

## 6. Accesibilidad mínima (no negociable)

- [x] Contraste AA (≥ 4.5:1) garantizado en todo texto principal frente a su superficie de fondo, asegurando máxima legibilidad.
- [x] El pseudo-estado `:focus-visible` debe estar siempre visible mediante un contorno o anillo en botones, enlaces, e inputs para navegación por teclado.
- [x] El Menú sándwich declara siempre su estado mediante `aria-expanded` y `aria-controls` y cuenta con un manejador de foco.
- [x] La media query `prefers-reduced-motion` es respetada estrictamente: desactiva transiciones de elevación y animaciones tipo shimmer si el usuario así lo requiere en su sistema operativo.
- [x] Toda imagen no decorativa y cada icono de acción (sin texto) posee atributos `alt` o `aria-label` descriptivos.
- [x] Los mensajes de error de formularios están vinculados a su campo respectivo (`input`) empleando `aria-describedby`.

## 7. Iconografía y assets

- **Set elegido:** Material Symbols Outlined (iconografía oficial de Google Fonts).
- **Por qué:** Garantiza una total coherencia visual con los principios de diseño establecidos en la SPEC original, ofreciendo familiaridad al usuario y óptimo rendimiento escalable (variable font).
- **Tamaño y color por defecto:** Los iconos ubicados en botones miden 20px; en listados o cards, 24px. Salvo en estados de éxito o error explícitos, su color siempre hereda el valor del texto padre (`currentColor`).

---

**Referencias:**
- NN/g — Front-End Style-Guides (definición y checklist): https://www.nngroup.com/articles/front-end-style-guides/
- NN/g — Design Systems 101: https://www.nngroup.com/articles/design-systems-101/
