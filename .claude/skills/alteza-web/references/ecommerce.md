# ALTEZA — E-COMMERCE REFERENCE

## Principio

La experiencia de compra debe ser:

- clara
- rápida
- confiable
- elegante
- accesible
- consistente

El diseño nunca debe dificultar la compra.

---

# 1. Product Data

Cada producto puede incluir:

- id
- sku
- name
- category
- subcategory
- description
- shortDescription
- images
- price
- compareAtPrice
- discount
- rating
- reviewCount
- badge
- stock
- variants
- tags

---

# 2. Categories

Categorías principales:

- maquillaje
- skincare
- cabello
- accesorios

Las categorías deben tener URLs y nombres consistentes.

Ejemplo:

/shop

/shop/maquillaje

/shop/skincare

/shop/cabello

/shop/accesorios

---

# 3. Product URL

Formato recomendado:

/producto/nombre-del-producto

Usar URLs:

- simples
- legibles
- estables
- amigables para SEO

---

# 4. Pricing

Mostrar claramente:

Precio actual

Precio anterior cuando exista

Descuento cuando exista

Ejemplo:

$88.000

$110.000

-20%

No ocultar información importante de precio.

---

# 5. Currency

Mercado objetivo actual:

Colombia

Moneda:

COP

Formato visual:

$89.000

Evitar:

$89,000

o

89.000 COP

salvo que el contexto requiera indicar explícitamente la moneda.

---

# 6. Product States

Un producto puede estar:

- en stock
- pocas unidades
- agotado
- próximamente
- descontinuado

El estado debe ser visible.

---

# 7. Add to Cart

El CTA principal debe ser evidente.

Ejemplo:

AGREGAR AL CARRITO

Estados:

default

hover

loading

added

disabled

---

# 8. Cart

El carrito debe conservar:

- producto
- imagen
- variante
- cantidad
- precio
- subtotal

Permitir:

- cambiar cantidad
- eliminar
- continuar comprando

---

# 9. Cart Summary

Mostrar:

subtotal

descuentos

envío

total

CTA checkout

No esconder costes importantes.

---

# 10. Wishlist

Permitir guardar productos.

Estados:

inactive

active

loading

Debe utilizar iconografía clara.

---

# 11. Discounts

Tipos posibles:

percentage

fixed amount

coupon

campaign

sale price

Las promociones deben ser fáciles de entender.

Ejemplo:

ANTES

$110.000

AHORA

$88.000

DESCUENTO

20%

---

# 12. Product Variants

Cuando corresponda:

color

tono

talla

presentación

fragancia

volumen

Cada variante debe tener:

- nombre
- estado
- disponibilidad

Las opciones agotadas deben seguir siendo comprensibles.

---

# 13. Ratings

Mostrar:

- estrellas
- rating numérico
- número de reseñas

Ejemplo:

★★★★★ 4.9

(135 reseñas)

No utilizar ratings falsos.

Los valores deben provenir de datos reales
cuando exista backend.

---

# 14. Product Images

Un producto puede tener:

- imagen principal
- vista secundaria
- detalle
- textura
- lifestyle

Mantener consistencia de ratios y calidad.

---

# 15. Search

La búsqueda debe poder encontrar:

- producto
- categoría
- palabra clave

Estados:

loading

results

no results

error

---

# 16. Filters

Filtros posibles:

- categoría
- precio
- marca
- color
- disponibilidad
- rating
- tags

Desktop:

sidebar o panel lateral.

Mobile:

drawer.

---

# 17. Sorting

Opciones posibles:

- destacados
- más recientes
- precio menor
- precio mayor
- mejor valorados

---

# 18. Checkout

El checkout debe reducir fricción.

Pasos posibles:

1. información
2. envío
3. pago
4. confirmación

Mantener visible:

- resumen
- productos
- subtotal
- envío
- total

---

# 19. Trust

La experiencia puede reforzar confianza mediante:

- envío
- métodos de pago
- cambios y devoluciones
- soporte
- seguridad
- información clara

No inventar certificaciones,
garantías o políticas que no existan.

---

# 20. Empty States

Carrito:

Tu carrito está vacío.

CTA:

SEGUIR COMPRANDO

Wishlist:

No tienes favoritos todavía.

CTA:

EXPLORAR PRODUCTOS

---

# 21. Error States

Debe existir feedback claro para:

- producto no encontrado
- error de red
- pago fallido
- checkout incompleto
- búsqueda sin resultados

Evitar mensajes técnicos para el cliente final.

---

# 22. Loading

Utilizar estados de carga discretos.

Preferir:

- skeleton
- spinner pequeño
- transición de opacity

No bloquear toda la pantalla
innecesariamente.

---

# 23. Mobile Commerce

En mobile:

- CTA principal fácilmente accesible
- filtros simples
- imágenes grandes
- botones táctiles
- cantidades fáciles de cambiar
- checkout compacto

---

# 24. Conversion

La interfaz debe ayudar al usuario
a tomar decisiones sin presión artificial.

Priorizar:

- claridad
- comparación
- confianza
- información útil
- navegación simple

---

# 25. Regla

Nunca inventar:

- precios
- descuentos
- reviews
- stock
- políticas
- métodos de pago
- beneficios de productos

Cuando falten datos reales,
utilizar placeholders claramente identificables.