# ALTEZA — DESIGN SYSTEM

## 1. Dirección visual

Alteza debe sentirse como una marca de belleza premium
con una estética editorial, sofisticada y contemporánea.

Palabras clave:

- luxury beauty
- editorial
- minimal
- feminine
- sophisticated
- premium
- clean
- elegant

La interfaz debe transmitir calidad mediante:

- espacio negativo
- tipografía elegante
- fotografías de producto profesionales
- proporciones cuidadas
- composición editorial
- detalles pequeños y precisos

Evitar una estética que parezca:

- dashboard
- SaaS
- plantilla genérica
- tienda barata
- exceso de cards
- exceso de sombras
- exceso de gradients
- interfaz infantil

---

# 2. Paleta

## Base

Cream:

#FBF5F3

Warm White:

#FFFDFC

Soft Blush:

#F7E7E3

Rose:

#D9A6A8

Deep Rose:

#A86469

Dusty Rose:

#B9797E

Black:

#171516

Soft Text:

#756C6C

Border:

#E8DAD7

---

# 3. Tipografía

## Display

Usar una serif editorial similar a:

Cormorant Garamond

Uso:

- grandes titulares
- nombres destacados
- headings
- mensajes editoriales

Características:

- elegante
- contrastada
- grandes tamaños
- bastante espacio

## UI / Body

Usar una sans-serif limpia similar a:

Montserrat

Uso:

- navegación
- botones
- categorías
- precios
- labels
- metadata
- párrafos

La UI debe utilizar tracking moderado,
especialmente en textos uppercase.

---

# 4. Jerarquía tipográfica

Hero:

muy grande.

Desktop:

clamp(72px, 7vw, 120px)

Section headings:

clamp(50px, 5vw, 82px)

Product title:

aproximadamente 22–26px

Body:

14–16px

Micro labels:

9–11px

Los títulos grandes pueden usar italic serif
para palabras de énfasis.

Ejemplo:

Beauty

que te eleva.

---

# 5. Layout

Utilizar layouts amplios y editoriales.

Container desktop:

max-width aproximado:
1380px

Padding lateral:

24–48px

Evitar contenido pegado a los bordes.

Utilizar:

- grid
- flexbox
- CSS clamp
- aspect-ratio
- minmax()

Evitar posicionamiento absoluto salvo cuando
sea necesario para elementos visuales.

---

# 6. Header

El header debe ser:

- limpio
- blanco o cream
- ligero
- elegante

Estructura:

Logo

Navegación central

Acciones:

- search
- account
- wishlist
- cart

Navigation:

uppercase

font-size pequeño

letter-spacing amplio

Debe existir una jerarquía clara entre:

logo
navigation
actions

---

# 7. Top Bar

La barra superior puede utilizar:

background:
#171516

Texto pequeño uppercase.

Ejemplo:

ENVÍO GRATIS EN COMPRAS SUPERIORES A $150.000

Puede existir un enlace:

COMPRAR AHORA →

Debe ser discreta.

---

# 8. Hero

El Hero es una de las piezas más importantes.

Desktop:

dos grandes zonas.

Izquierda:

copy

Derecha:

fotografía / productos

La izquierda debe conservar espacio negativo.

No colocar productos importantes detrás
del texto.

La fotografía debe concentrarse
principalmente en el centro-derecha.

La imagen debe sentirse editorial,
no como una foto genérica de catálogo.

Hero hierarchy:

eyebrow

headline

supporting text

primary CTA

secondary link

---

# 9. Product Cards

La tarjeta de producto debe incluir:

- imagen
- badge opcional
- wishlist
- categoría
- nombre
- rating
- precio
- precio anterior opcional
- quick view

Desktop:

4 columnas

Tablet:

2 columnas

Mobile:

1 columna

Las fotografías deben compartir:

- proporción
- tratamiento
- escala visual
- alineación

No mezclar imágenes con composiciones
visualmente incompatibles.

---

# 10. Product Image System

Las imágenes de productos deben ser:

- nítidas
- fotorrealistas
- premium
- consistentes
- bien iluminadas

Preferir fondos:

- cream
- blush
- nude
- rose

El producto debe quedar visualmente centrado.

Evitar:

- productos cortados accidentalmente
- demasiado espacio vacío
- diferentes escalas entre tarjetas
- fondos con estilos incompatibles

---

# 11. Trending Products

La sección debe incluir:

Eyebrow:

LO MÁS DESEADO

Heading:

Trending Products.

Puede existir una palabra serif italic
para crear contraste.

A la derecha:

VER TODOS LOS PRODUCTOS →

Debe existir bastante espacio vertical
antes de las tarjetas.

---

# 12. Category Section

Categorías principales:

MAQUILLAJE

SKINCARE

CUIDADO CAPILAR

ACCESORIOS

Las categorías deben utilizar fotografías
editoriales.

Cada bloque puede incluir:

category label

title

EXPLORAR →

La fotografía ocupa la mayor parte del bloque.

El texto debe superponerse de forma elegante.

Hover:

- leve zoom
- overlay sutil
- desplazamiento mínimo
- transición suave

Evitar animaciones excesivas.

---

# 13. Buttons

Primary button:

background:
#171516

color:
#FFFFFF

Height:

aproximadamente 48–54px

Typography:

uppercase
small
letter-spacing amplio

Hover:

background:
#A86469

Transición:

200–350ms

Secondary links:

sin botón pesado.

Preferir:

texto + flecha

Ejemplo:

EXPLORAR COLECCIÓN →

---

# 14. Borders

Usar borders muy sutiles.

Color:

#E8DAD7

Evitar bordes fuertes en grandes cantidades.

---

# 15. Border Radius

Alteza no debe sentirse excesivamente redondeada.

Preferir:

0px
2px
4px
6px

Los elementos circulares se permiten para:

- wishlist
- icon buttons
- badges especiales

---

# 16. Shadows

Usar sombras mínimas.

No utilizar:

heavy shadow

glowing shadow

excessive glassmorphism

La profundidad debe venir principalmente
de:

- fotografía
- contraste
- espacio
- layering
- color

---

# 17. Motion

Las animaciones deben ser:

- suaves
- rápidas
- elegantes
- útiles

Duración habitual:

200–400ms

Preferir:

transform

opacity

color

background

scale

Evitar:

- bounce
- spin excesivo
- animaciones constantes
- scroll hijacking
- movimiento excesivo

---

# 18. Responsive

Desktop:

>= 1100px

Tablet:

700px–1099px

Mobile:

< 700px

Mobile debe ser diseñado,
no simplemente reducido.

En mobile:

- navigation se convierte en menú
- grids pasan a 1 columna
- títulos disminuyen con clamp
- botones pueden ocupar mayor ancho
- hero pasa a composición vertical
- imágenes mantienen proporciones

---

# 19. Accessibility

Todos los elementos interactivos deben:

- tener focus visible
- utilizar semantic HTML
- tener aria-label cuando corresponda

Todas las imágenes reales deben tener:

alt descriptivo.

No utilizar texto dentro de imágenes
cuando el mismo contenido pueda existir
como HTML accesible.

---

# 20. Performance

Priorizar:

- WebP
- imágenes optimizadas
- lazy loading fuera del viewport
- dimensiones explícitas
- CSS organizado
- JavaScript mínimo
- componentes reutilizables

---

# 21. Anti-patterns

NO utilizar:

- gradients excesivos
- glassmorphism genérico
- cards gigantes con sombras
- botones pill innecesarios
- colores saturados
- layouts de dashboard
- demasiadas cajas
- demasiados iconos
- animaciones llamativas sin propósito
- tipografías decorativas múltiples
- elementos visualmente inconsistentes

---

# 22. Regla de oro

Cada nueva sección debe parecer parte
de la misma marca.

No introducir un estilo nuevo
simplemente porque pueda verse bonito.

La prioridad es:

1. Consistencia
2. Jerarquía
3. Elegancia
4. Conversión
5. Accesibilidad
6. Performance

---

# 23. Arquitectura visual Home

Home debe seguir aproximadamente:

Top Bar

Header

Hero

Trending Products

Categories

Promotional Banner

Benefits

New Collection

Brand Story

New Arrivals

Blog

Newsletter

Footer

Las secciones deben respirar.

No amontonar contenido.

---

# 24. Referencia visual

La inspiración estructural principal
es una tienda de belleza editorial premium
similar a BeShop.

No copiar literalmente:

- textos
- imágenes
- branding
- código
- contenido

Utilizar únicamente principios de:

- composición
- jerarquía
- estructura
- ritmo visual
- experiencia e-commerce

Adaptar todo a Alteza.

---

# 25. Regla para IA

Antes de crear una nueva interfaz:

1. Leer PRODUCT.md
2. Leer DESIGN.md
3. Revisar componentes existentes
4. Revisar assets existentes
5. Reutilizar tokens
6. Reutilizar componentes
7. Implementar
8. Revisar responsive
9. Ejecutar QA visual
10. No introducir patrones que contradigan este documento