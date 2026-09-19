---
name: alteza-web
description: >
  Skill principal para construir, modificar, auditar y pulir
  sitios e-commerce de Alteza. Utiliza el contexto de PRODUCT.md,
  DESIGN.md y .claude/CLAUDE.md y coordina diseño, implementación,
  responsive, QA y consistencia visual.
---

# ALTEZA WEB

## Contexto obligatorio

Antes de trabajar:

1. Leer PRODUCT.md.
2. Leer DESIGN.md.
3. Leer .claude/CLAUDE.md.
4. Inspeccionar la estructura existente.
5. Revisar componentes existentes.
6. Revisar assets e imágenes existentes.

No comenzar una implementación importante sin conocer el estado actual del proyecto.

---

## Principio principal

Alteza es una marca de belleza premium.

El resultado debe sentirse:

- editorial
- elegante
- sofisticado
- minimalista
- premium
- femenino
- moderno

Nunca crear una interfaz genérica.

---

## Reutilización

Antes de crear:

- componente
- sección
- estilo
- patrón
- layout

buscar primero si ya existe.

Preferir reutilizar y extender antes que duplicar.

---

## Diseño

La fuente de verdad visual es:

DESIGN.md

La fuente de verdad del producto es:

PRODUCT.md

Las reglas de ejecución son:

.claude/CLAUDE.md

Ninguna herramienta externa debe contradecir estos archivos.

---

## Herramientas

### UI/UX Pro Max

Usar para:

- explorar patrones
- resolver problemas de UX
- analizar estructura
- estudiar alternativas

### Taste

Usar para:

- jerarquía visual
- tipografía
- espaciado
- composición
- evitar resultados genéricos

### Frontend Design

Usar para:

- dirección visual
- composición
- tipografía
- color
- detalle visual
- motion

### Impeccable

Usar después de implementar para:

- audit
- critique
- polish
- detectar inconsistencias
- mejorar la calidad visual

### Playwright

Usar para:

- abrir la aplicación
- comprobar navegación
- revisar imágenes
- comprobar responsive
- verificar interacciones
- detectar errores visuales

---

## Workflow

Para una tarea pequeña:

ANALIZAR
→ IMPLEMENTAR
→ COMPROBAR

Para una tarea mediana:

ANALIZAR
→ PLANIFICAR
→ IMPLEMENTAR
→ PLAYWRIGHT
→ IMPECCABLE
→ PULIR

Para una tarea grande:

ANALIZAR
→ PLANIFICAR
→ DISEÑAR
→ IMPLEMENTAR
→ TESTEAR
→ AUDITAR
→ PULIR
→ QA FINAL

---

## Imágenes

Antes de utilizar una imagen:

1. comprobar si ya existe.
2. comprobar la ruta.
3. comprobar dimensiones.
4. comprobar formato.
5. mantener consistencia visual.

No utilizar imágenes genéricas cuando exista un asset específico de Alteza.

---

## Responsive

Cada implementación debe contemplar:

Desktop
Tablet
Mobile

No limitarse a reducir tamaños.

El layout móvil debe diseñarse de forma específica.

---

## QA

Antes de considerar terminada una tarea:

- comprobar rutas
- comprobar imágenes
- comprobar consola
- comprobar responsive
- comprobar interacción
- comprobar accesibilidad
- comprobar consistencia visual
- comprobar que no se rompieron componentes existentes

---

## Seguridad del proyecto

No borrar archivos existentes sin analizarlos.

No reemplazar grandes archivos de código sin necesidad.

No modificar configuraciones críticas sin comprobar dependencias.

No cambiar rutas de assets sin revisar referencias.

No ejecutar comandos destructivos.

---

## Entrega

El resultado debe ser adecuado para un proyecto comercial real.

Debe ser:

- mantenible
- reutilizable
- responsive
- accesible
- limpio
- profesional
- preparado para producción

---

## Regla final

No preguntarse solamente:

"¿Funciona?"

También comprobar:

"¿Parece una web premium de Alteza?"