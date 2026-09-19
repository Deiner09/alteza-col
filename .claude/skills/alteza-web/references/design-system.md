# ALTEZA — DESIGN SYSTEM REFERENCE

## 1. Principios visuales

Alteza utiliza un lenguaje visual:

- editorial
- premium
- minimalista
- femenino
- sofisticado
- contemporáneo

La interfaz debe sentirse diseñada, no ensamblada.

Priorizar:

- espacio negativo
- alineación
- proporción
- ritmo vertical
- jerarquía tipográfica
- fotografía
- detalles sutiles

Evitar:

- estética de dashboard
- exceso de cards
- sombras pesadas
- gradients genéricos
- botones tipo pill sin necesidad
- exceso de elementos redondeados

---

## 2. Colores principales

### Base

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

## 3. Tipografía

### Display

Cormorant Garamond o serif editorial equivalente.

Utilizar para:

- Hero
- section headings
- headlines
- mensajes editoriales
- títulos destacados

### UI / Body

Montserrat o sans-serif equivalente.

Utilizar para:

- navegación
- botones
- labels
- metadata
- categorías
- precios
- párrafos

---

## 4. Escala

### Hero

Desktop:

72px–120px

### Section heading

50px–82px

### Product title

22px–26px

### Body

14px–16px

### Small label

9px–11px

Usar `clamp()` cuando sea apropiado.

---

## 5. Espaciado

El diseño debe respirar.

Preferir:

- grandes espacios verticales
- padding consistente
- separación clara entre secciones

No compactar contenido para "llenar" la pantalla.

---

## 6. Container

Desktop:

max-width aproximado de 1380px.

Utilizar padding lateral adaptable.

Ejemplo conceptual:

24px móvil

32px tablet

40–48px desktop

---

## 7. Grid

Desktop:

4 columnas para product grids.

Tablet:

2 columnas.

Mobile:

1 columna.

Utilizar:

- CSS Grid
- minmax()
- gap consistente

---

## 8. Botón primario

Background:

#171516

Text:

#FFFFFF

Características:

- rectangular
- elegante
- uppercase
- tracking moderado
- altura aproximada 48–54px

Hover:

background hacia #A86469

Transition:

200–350ms

---

## 9. Links secundarios

Preferir links editoriales.

Ejemplo:

EXPLORAR COLECCIÓN →

VER TODOS LOS PRODUCTOS →

Utilizar flechas discretas.

No convertir cada interacción en un botón.

---

## 10. Product Card

Debe contener:

- media
- badge opcional
- wishlist
- categoría
- título
- rating
- precio
- precio anterior opcional
- quick view opcional

La imagen debe tener gran presencia.

---

## 11. Product Media

Todas las imágenes de una colección deben mantener:

- misma proporción
- mismo tratamiento
- misma escala visual
- composición coherente

No distorsionar imágenes.

No deformar productos.

Preferir:

object-fit: cover

o

object-fit: contain

según el asset.

---

## 12. Border Radius

Utilizar radios muy discretos:

0px
2px
4px
6px

No convertir la interfaz completa en una colección de superficies redondeadas.

---

## 13. Shadows

Las sombras deben ser mínimas.

La profundidad se crea principalmente mediante:

- iluminación
- contraste
- capas
- fotografía
- espacio

---

## 14. Motion

Duraciones:

200–400ms

Preferir:

- opacity
- transform
- scale
- color
- background

Curvas suaves.

No utilizar:

- bounce
- wobble
- spin
- movimiento constante

---

## 15. Hero

Composición desktop:

texto a la izquierda

imagen a la derecha

La imagen debe concentrarse hacia el centro-derecha.

El lado izquierdo debe conservar espacio visual para el copy.

La fotografía nunca debe competir con el headline.

---

## 16. Header

Debe incluir:

- logo
- navegación
- search
- account
- wishlist
- cart

Desktop:

navegación centrada.

Mobile:

menú compacto.

---

## 17. Top Bar

Puede utilizar fondo negro:

#171516

Texto:

uppercase

Muy pequeño.

Debe ser informativo,
no competir con el header.

---

## 18. Responsive

### Desktop

>= 1100px

### Tablet

700px–1099px

### Mobile

< 700px

Mobile no debe ser simplemente
una versión reducida del desktop.

---

## 19. Accesibilidad

Utilizar:

- HTML semántico
- labels adecuados
- focus states
- aria-label donde corresponda
- alt descriptivos
- contraste suficiente

---

## 20. Regla de consistencia

Antes de introducir un nuevo color,
tipografía, radio, sombra o patrón,

comprobar si ya existe un token
o componente equivalente.

El sistema visual debe crecer,
no fragmentarse.