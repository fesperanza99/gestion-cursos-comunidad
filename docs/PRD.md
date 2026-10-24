# PRD — Product Requirements Document — CommunityCoursesIT

> **Qué es:** el QUÉ y el POR QUÉ. Para quién construimos, qué problema resuelve, qué hace
> y — con el mismo peso — qué **no** hace. No habla de tecnología ni de carpetas (eso es el TRD).
> **Cuándo está bien:** alguien del equipo puede construir la feature correcta sin preguntarte
> nada de producto; el "no" (out of scope) está tan claro como el "sí"; cada historia tiene
> criterios de aceptación verificables.

## 1. Resumen ejecutivo

**CommunityCoursesIT** es una plataforma web colaborativa diseñada para centralizar, descubrir y gestionar cursos gratuitos de tecnologia. Permite a los usuarios explorar un catálogo comunitarios validado mediante filtros avanzados, aportar nuevos recursos educativos y organizar sus propios trayectos de aprendizaje mediante roadmaps personalizados. Su objetibo es democraticar el acceso a la foración IT de calidad, resolviendo la framentación y desactualización de los contenidos existentes.

## 2. Objetivos y métricas de éxito

| Objetivo | Cómo sabemos que lo logramos |
|----------|------------------------------|
| Garantizar que el catálogo comunitario contenga cursos validados de múltiples plataformas y fuentes | Al menos un 85% de los cursos aportados deben ser validados |
| Fomentar la adopción de los roadmap para planificar | Al menos un 70% de los usuarios registrados deben crear al menos un roadmap |

## 3. Personas

### Persona 1 — [Florencia / Estudiante autodidacta]

- **Contexto:** Estudiante junior de desarrollo web que busca capacitarse de forma autónoma sin incurrir en costos elevados. Utiliza la plataforma en sus baches horarios y fines de semana.
- **Motivaciones:** Encontrar cursos gratuitos estructurados, saber qué aprender a continuación y organizar su tiempo de estudio de manera eficiente.
- **Frustraciones hoy:** Pierde horas buscando cursos dispersos en YouTube o blogs, y no sabe si un recurso está desactualizado o es de baja calidad.
- **Historias tipo:** «Necesito filtrar rápidamente cursos de React que incluyan certificados o ejercicios prácticos para no perder el tiempo.»

### Persona 2 — [Marcos / Colaborador]
- **Contexto:** Desarrollador semi-senior que recopila constantemente recursos útiles y desea compartirlos con la comunidad.
- **Motivaciones:** Aportar valor al ecosistema educativo, estructurar su propio conocimiento y someter sus hallazgos a una revisión colaborativa.
- **Frustraciones hoy:** Las plataformas tradicionales no permiten sugerir cursos propios fácilmente ni asociarlos a rutas lógicas de aprendizaje.
- **Historias tipo:** «Quiero aportar un curso gratuito excelente que completé y asegurarme de que la comunidad pueda aprovecharlo tras una validación.»

## 4. User stories

> Mínimo 6 historias, al menos 4 con prioridad **P0** (P0 = el producto no funciona sin esto
> el día del MVP). Formato: **Como** [rol], **quiero** [acción], **para** [beneficio].
> Criterios de aceptación en formato Dado/Cuando/Entonces o checklist verificable.

| ID | Prioridad | Historia | Criterios de aceptación |
|----|-----------|----------|-------------------------|
| US-001 | P0 | Como visitante, quiero ver el catálogo comunitario paginado, para descubrir cursos sin registrarme | - [ ] Dado que visito `/catalogo`, veo la primera página (20 items)<br>- [ ] Dado que hay más de 20 cursos, aparece el paginador<br>- [ ] Dado que no hay cursos, veo un empty state con CTA |
| US-002 | P0 | Como usuario registrado, quiero aportar un curso con sus metadatos (título, URL, categoría, disertantes y si incluye certificación), para enriquecer el catálogo comunitario. | - [ ] Dado que accedo al formulario de aporte, puedo completar todos los campos obligatorios requeridos<br>- [ ] Dado que indico si completé o no el curso, el sistema lo registra correctamente<br>- [ ] Dado que envío el formulario, el curso se almacena con estado "en revisión" |
| US-003 | P0 | Como usuario autenticado, quiero crear un roadmap personal de aprendizaje combinando cursos del catálogo, para estructurar mi propia ruta de formación. | - [ ] Dado que estoy en mi panel, puedo hacer clic en "Nuevo Roadmap" e ingresar un título y descripción<br>- [ ] Dado que edito mi roadmap, puedo agregar o quitar cursos pertenecientes al catálogo comunitario<br>- [ ] Dado que guardo los cambios, el roadmap se asocia a mi perfil de usuario |
| US-004 | P0 | Como usuario, quiero aplicar filtros cruzados en el catálogo (por categoría, nivel, año de edición y si incluye exámenes), para encontrar exactamente lo que busco. | - [ ] Dado que selecciono múltiples filtros en la interfaz, el listado se actualiza en tiempo real mostrando únicamente los cursos coincidentes<br>- [ ] Dado que limpio los filtros, el catálogo muestra nuevamente todos los elementos paginados |
| US-005 | P1 | Como administrador, quiero revisar los cursos aportados por la comunidad para aprobarlos o rechazarlos antes de su publicación general. | - [ ] Dado que ingreso al panel de administración, veo la lista de cursos pendientes con estado "en revisión"<br>- [ ] Dado que apruebo un curso, este cambia su estado a "publicado" y pasa a ser visible en el catálogo comunitario |
| US-006 | P1 | Como usuario, quiero configurar la visibilidad de mi roadmap personal (público o privado), para decidir si comparto mi progreso con otros miembros. | - [ ] Dado que edito la configuración de mi roadmap, puedo alternar el interruptor entre privado y público<br>- [ ] Dado que un roadmap es público, otros usuarios pueden visualizarlo mediante un enlace directo |

## 5. Requisitos funcionales

| ID | Requisito | Historia relacionada |
|----|-----------|----------------------|
| RF-001 | El sistema debe permitir el registro e inicio de sesión de usuarios mediante correo electrónico y contraseña segura. | US-003, US-006 |
| RF-002 | El backend debe proveer endpoints paginados para la consulta y filtrado del catálogo comunitario de cursos. | US-001, US-004 |
| RF-003 | El sistema debe ofrecer una interfaz para el envío y almacenamiento temporal de propuestas de cursos de la comunidad. | US-002 |
| RF-004 | El sistema debe permitir a los usuarios autenticados la creación, lectura, actualización y eliminación (CRUD) de sus propios roadmaps. | US-003 |

## 6. Requisitos no funcionales

| ID | Requisito | Notas |
|----|-----------|-------|
| RNF-001 | Todos los listados de cursos y roadmaps deben implementar paginación obligatoria | Heredado de SPEC clase |
| RNF-002 | Diseño Responsive bajo el enfoque Mobile-first con mejora progresiva | Heredado de SPEC clase |
| RNF-003 | Las consultas al catálogo general deben responder en un tiempo menor a 500 ms bajo condiciones normales de red. | Decisión de rendimiento propia |

## 7. Reglas de negocio

| ID | Regla | Fuente |
|----|-------|--------|
| BR-001 | Todo curso aportado por un usuario ingresa con estado "en revisión" y no aparece en el catálogo comunitario hasta ser validado por un administrador | SPEC clase |
| BR-002 | Al aportar un curso, el usuario debe declarar de forma obligatoria si completó o no dicho curso | SPEC clase |
| BR-003 | Los roadmaps personales son privados por defecto y editables exclusivamente por su creador, pudiendo configurarse como públicos a voluntad | Decisión propia |
| BR-004 | Un usuario no puede aportar dos veces exactamente la misma URL de un curso activo o en revisión | Decisión propia |

## 8. Fuera de alcance (out of scope)

- Pasarelas de pago, procesamiento de transacciones o comercialización de cursos de pago.
- Alojamiento nativo de archivos de video pesados en servidores propios (se enlazan recursos externos verificados).
- Sistema de mensajería instantánea o chat en tiempo real entre usuarios.
- Emisión de certificaciones oficiales con validez académica o legal por parte de la plataforma.

## 9. Supuestos y decisiones sobre la SPEC de clase

- Se asume que la validación inicial de cursos estará centralizada en el rol de administrador para asegurar la calidad técnica en la primera versión del MVP, delegando futuros sistemas de reputación comunitaria a iteraciones posteriores (ver detalle en `docs/SPEC.md` §8)

## 10. Preguntas abiertas

| Pregunta | Impacto | Estado |
|----------|---------|--------|
| ¿Los aportes de cursos que permanezcan en revisión más de 30 días deben expirar automáticamente? | Medio | Abierta |
