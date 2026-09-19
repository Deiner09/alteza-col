# ALTEZA — CLAUDE CODE RULES

## 1. Contexto obligatorio

Antes de realizar cualquier cambio:

1. Leer `PRODUCT.md`.
2. Leer `DESIGN.md`.
3. Inspeccionar la estructura existente.
4. Revisar los componentes reutilizables.
5. Revisar las rutas de imágenes existentes.
6. Entender el código antes de modificarlo.

No asumir que un archivo o componente no existe sin comprobarlo.

---

## 2. Objetivo principal

Construir una experiencia e-commerce profesional para Alteza.

La prioridad es:

1. Calidad visual
2. Consistencia
3. UX
4. Responsive
5. Accesibilidad
6. Performance
7. Mantenibilidad

---

## 3. Regla de cambios

Antes de modificar:

- HTML
- SCSS
- JavaScript
- componentes
- imágenes
- configuración

comprobar qué existe actualmente.

No reemplazar archivos completos si solamente
se necesita modificar una parte.

Preferir cambios pequeños y controlados.

---

## 4. No destruir trabajo existente

Nunca borrar o reemplazar:

- `main.scss`
- `index.html`
- componentes existentes
- imágenes existentes
- configuración Vite
- configuración Sass

sin comprobar primero su contenido.

Si un archivo debe reconstruirse:

1. explicar qué se va a cambiar
2. preservar funcionalidades existentes
3. verificar el resultado

---

## 5. Sistema de estilos

Usar el sistema SCSS existente.

Priorizar:

- variables
- mixins
- componentes
- layouts
- pages

No crear valores repetidos cuando ya exista
una variable equivalente.

No crear CSS inline salvo necesidad específica.

---

## 6. Componentes

Antes de crear un componente nuevo,
buscar si ya existe uno equivalente.

Componentes principales:

- Header
- Top Bar
- Hero
- Product Card
- Category Card
- Buttons
- Banner
- Newsletter
- Footer

Los componentes deben ser reutilizables.

---

## 7. Imágenes

Antes de agregar una imagen:

1. comprobar si ya existe.
2. comprobar dimensiones.
3. comprobar formato.
4. comprobar ruta.
5. mantener naming consistente.

Preferir WebP para fotografías.

Todas las imágenes deben tener `alt`.

No cambiar una ruta existente sin comprobar
qué componentes la utilizan.

---

## 8. Responsive

Toda modificación debe comprobar:

Desktop:

>= 1100px

Tablet:

700px–1099px

Mobile:

< 700px

Nunca considerar terminado un componente
hasta revisar al menos desktop y mobile.

---

## 9. Accesibilidad

Usar HTML semántico.

Los botones deben ser botones.

Los enlaces deben ser enlaces.

Los elementos interactivos deben tener:

- focus visible
- aria-label cuando corresponda

Las imágenes deben tener texto alternativo.

---

## 10. JavaScript

No utilizar JavaScript para resolver algo
que pueda resolverse correctamente con CSS.

Usar JS únicamente cuando exista comportamiento real:

- menú
- carrito
- wishlist
- filtros
- modal
- slider
- interacción

Mantener JavaScript modular.

---

## 11. Animaciones

Las animaciones deben ser:

- suaves
- rápidas
- útiles
- consistentes con Alteza

Preferir:

- transform
- opacity
- color
- background

Evitar animaciones excesivas.

---

## 12. QA

Después de implementar cualquier cambio importante:

1. ejecutar el proyecto.
2. revisar consola.
3. comprobar rutas.
4. comprobar imágenes.
5. comprobar responsive.
6. comprobar interacción.
7. comprobar que no se rompieron secciones existentes.

Cuando Playwright MCP esté disponible,
utilizarlo para pruebas visuales y funcionales.

---

## 13. Herramientas disponibles

El proyecto puede utilizar:

- Claude Code
- Impeccable
- Taste / design-taste-frontend
- UI/UX Pro Max
- Playwright MCP

Usar estas herramientas cuando aporten valor.

No ejecutar herramientas innecesariamente.

---

## 14. Impeccable

Antes de utilizar Impeccable para modificar
una sección importante:

- entender primero la intención de diseño
- revisar `DESIGN.md`
- conservar la identidad visual de Alteza

No aceptar automáticamente cambios que
contradigan el sistema visual existente.

---

## 15. Taste

Utilizar Taste para evaluar:

- jerarquía
- espaciado
- tipografía
- composición
- calidad visual

No utilizarlo como excusa para cambiar
el estilo de Alteza arbitrariamente.

---

## 16. UI/UX Pro Max

Utilizarlo para:

- explorar patrones de UX
- estudiar componentes
- comparar soluciones
- mejorar arquitectura de interfaz

La decisión final debe respetar:

`PRODUCT.md`

y

`DESIGN.md`.

---

## 17. Playwright

Cuando esté disponible:

- probar navegación
- comprobar imágenes
- verificar responsive
- probar interacciones
- detectar errores visuales

Primero inspeccionar.

Después modificar.

Nunca modificar automáticamente
sin entender el problema.

---

## 18. Workflow

Para tareas pequeñas:

ANALIZAR
→ IMPLEMENTAR
→ COMPROBAR

Para tareas grandes:

ANALIZAR
→ PLANIFICAR
→ IMPLEMENTAR
→ TESTEAR
→ REVISAR
→ PULIR

---

## 19. Comunicación

Antes de realizar cambios importantes,
explicar brevemente:

- qué se va a cambiar
- qué archivos serán afectados
- por qué

Después informar:

- qué se cambió
- qué se comprobó
- si queda algo pendiente

---

## 20. Regla final

Alteza debe sentirse como un producto profesional
desarrollado para un cliente real.

No producir código de demostración.

No producir interfaces genéricas.

No introducir patrones visuales inconsistentes.

Reutilizar.

Medir.

Comprobar.

Pulir.

Mantener.