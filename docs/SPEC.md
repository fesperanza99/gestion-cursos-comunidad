# SPEC — CommunityCoursesIT

> **Qué es este documento:** tu versión refinada de la SPEC de clase.
> El repo empieza con la SPEC de clase **tal cual** (primer commit). Este archivo es su evolución:
> mismos requisitos, ambigüedades resueltas, decisiones incorporadas.
> **Regla:** si la SPEC de clase no lo decía y vos lo definiste, queda acá (con el porqué)
> o se referencia al documento donde quedó decidido (PRD para producto, TRD para técnica).
> **Cuándo está bien:** un lector que no estuvo en el aula del 20/10 entiende el producto
> completo leyendo solo este archivo, y puede rastrear cada decisión hasta su origen.

## 1. Identidad del producto

- **Nombre propio:** CommunityCoursesIT
- **Una línea:** Plataforma colaborativa para la gestión de cursos y hojas de ruta personales.

## 2. Problema

En un mundo donde la tecnología es parte de nuestras vidas, muchos estudiantes se encuentran perdidos al momento de elegir cursos y no saben por dónde empezar, ya que existe una gran cantidad de cursos disponibles y no hay una forma centralizada de gestionar y organizar estos cursos. 

## 3. Visión

Convertirse en la mejor plataforma de cursos gratuitos de habla hispana, que permita a los estudiantes gestionar sus cursos y hojas de ruta personales.

## 4. Alcance

### Dentro

- **Catálogo comunitario:** Búsqueda y filtrado de cursos gratuitos aportados por usuarios (por categoría, tema, título, versión, año de edición, disertantes, y si incluye cuestionarios, exámenes o certificados).
- **Aporte y validación:** Flujo donde los usuarios cargan cursos y estos pasan por un estado de validación para ingresar al catálogo oficial.
- **Roadmaps personales:** Creación de recorridos de aprendizaje propios combinando cursos del catálogo comunitario o recursos propios.
- **Interfaz web SPA:** Desarrollada con React 19, componentes reutilizables y enrutamiento con React Router.
- **Backend API REST:** Desarrollado con FastAPI y persistencia en PostgreSQL.
- **Entorno de desarrollo unificado:** Orquestación mediante Docker y Docker Compose.

### Fuera (out of scope explícito)

- Pasarelas de pago o monetización de cursos (la plataforma es estrictamente para cursos gratuitos).
- Reproducción de video nativa alojada en servidores propios (se enlazan recursos externos verificados como YouTube, plataformas educativas abiertas, etc.).
- Sistema de mensajería interna en tiempo real o chat entre usuarios.
- Certificaciones formales emitidas por la propia plataforma.

## 5. Reglas de producto clave

| # | Regla | Origen |
|---|-------|--------|
| BR-001 | Todo curso aportado por un usuario ingresa con estado "en revisión" y solo se publica en el catálogo comunitario tras superar la validación. | SPEC clase ("cursos cargados y **validados** pasan al catálogo") |
| BR-002 | Cada usuario autenticado gestiona exclusivamente sus propios roadmaps personales de aprendizaje. | decisión propia |
| BR-003 | Al aportar un curso, el usuario debe declarar de forma obligatoria si él/ella completó dicho curso. | SPEC de clase |
| BR-004 | La búsqueda en el catálogo debe admitir filtros cruzados por categoría, nivel de dificultad y requerimiento de exámenes o certificados. | Decisión de producto |

## 6. Stack registrado (versiones exactas con las que se va a desarrollar)

| Capa | Tecnología | Versión exacta instalada |
|------|------------|--------------------------|
| Frontend | React + Vite + pnpm | React 19.x, Vite, pnpm |
| Backend | FastAPI + uv | FastAPI, Python (uv) |
| Base de datos | PostgreSQL | PostgreSQL 18.6 |
| Infra (dev) | Docker + Docker Compose | Versión estándar compatible con Docker Compose v2 |

## 7. Restricciones técnicas heredadas de la SPEC de clase

| # | Restricción | Cómo la vamos a cumplir (1-2 líneas) |
|---|-------------|--------------------------------------|
| 1 | Mobile-first con mejora progresiva | Estilos CSS base sin media queries; `@media (min-width: ...)` exclusivo para adaptar componentes a tablets/desktop. |
| 2 | Paginación de consultas de listado | Implementación de paginación basada en parámetros de offset/límite en la API y componentes de paginación en UI. |
| 3 | Menú sándwich en mobile | Componente de navegación colapsable adaptado mediante CSS/Flexbox para pantallas pequeñas. |
| 4 | Screaming Architecture | Organización de carpetas backend y frontend orientada al dominio de negocio (`courses/`, `roadmaps/`, `users/`) y no a la herramienta. |

## 8. Vacíos de la SPEC de clase y decisiones tomadas

| # | Vacío detectado en la SPEC | Opciones consideradas | Decisión | Dónde se desarrolla |
|---|----------------------------|-----------------------|----------|---------------------|
| 1 | ¿Quién valida los cursos aportados por la comunidad? | Auto-moderación / Validación por docente / Puntuación comunitaria | Solo los administradores pueden validar los cursos aportados por la comunidad. | PRD BR-001 |
| 2 | ¿Los roadmap son públicos o privados? | Públicos por defecto / Privados por defecto / Configurables | Configurables por el usuario | PRD BR-002 / BackendSchema |
| 3 | ¿Cómo se buscan los cursos? | Por categoría / Por tema / Por título / Por versión / Por año de edición / Por disertantes / Por si incluye cuestionarios, exámenes o certificados | El usuario puede buscar y aplicar filtros | PRD Historias de Usuario P0 / TRD |
| 4 | ¿Cómo se evalua que el usuario realmente complete el curso? | Evaluación por modulos / Evaluación final / Ambas evaluaciones | El usuario deberá aprobar una evalución al final de cada módulo y una evaluación final del curso. | PRD / BackendSchema |

## 9. Historia de la SPEC (autoregistro de cambios)

| Fecha | Cambio | Por qué |
|-------|--------|---------|
| 20/10/2026 | SPEC de clase recibida en el aula | — |
| 21/10/2026 | Primer commit: SPEC de clase tal cual | Regla de la consigna |
| 23/10/2026 | Se agregó §8 con las decisiones sobre validación | Completar la SPEC con las decisiones tomadas |
