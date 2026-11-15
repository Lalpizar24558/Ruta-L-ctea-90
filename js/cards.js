// Banco de 45 tarjetas. z: zona (1-5; 0 = dilema), t: mc (selección) o reto, l: litros, a: índice de la respuesta correcta
const CARDS = [
 {
  "id": "I-1",
  "z": 1,
  "t": "mc",
  "l": 1,
  "q": "¿Cuál es la misión de CoopeMontaña Verde?",
  "o": [
   "Ser la cooperativa más grande del país.",
   "Transformar la leche de las familias asociadas en alimentos nutritivos, inocuos y sostenibles, generando bienestar.",
   "Vender leche al menor precio posible."
  ],
  "a": 1,
  "e": "La misión une calidad, inocuidad, sostenibilidad y bienestar para productores, colaboradores y comunidades."
 },
 {
  "id": "I-2",
  "z": 1,
  "t": "mc",
  "l": 2,
  "q": "¿Cuál grupo contiene SOLO valores de CoopeMontaña Verde?",
  "o": [
   "Competencia, rapidez y ahorro.",
   "Cooperación, integridad y respeto a la diversidad.",
   "Obediencia, silencio y puntualidad."
  ],
  "a": 1,
  "e": "Los cinco valores son: Cooperación, Calidad e inocuidad, Sostenibilidad, Respeto a la diversidad e Integridad."
 },
 {
  "id": "I-3",
  "z": 1,
  "t": "mc",
  "l": 1,
  "q": "Antes de entrar a la sala de quesos usted debe:",
  "o": [
   "Solo lavarse las manos.",
   "Usar cofia, bata y botas, lavarse y desinfectarse las manos y pasar por el pediluvio.",
   "Nada, si es una visita rápida."
  ],
  "a": 1,
  "e": "Son Buenas Prácticas de Manufactura (BPM) que protegen la inocuidad del producto."
 },
 {
  "id": "I-4",
  "z": 1,
  "t": "mc",
  "l": 1,
  "q": "¿Quiénes son sus primeros puntos de contacto para dudas durante los primeros 90 días?",
  "o": [
   "Cualquier persona del pasillo.",
   "Su mentor(a) asignado(a) y su jefatura directa.",
   "Nadie: debe resolver solo para demostrar capacidad."
  ],
  "a": 1,
  "e": "El mentor y la jefatura acompañan el período de prueba; Talento Humano atiende temas administrativos."
 },
 {
  "id": "I-5",
  "z": 1,
  "t": "mc",
  "l": 1,
  "q": "La inducción que explica las tareas, equipos y procedimientos de SU puesto se llama:",
  "o": [
   "Inducción general.",
   "Inducción específica.",
   "Inducción corporativa."
  ],
  "a": 1,
  "e": "La general presenta la organización en su conjunto; la específica, el puesto."
 },
 {
  "id": "I-6",
  "z": 1,
  "t": "mc",
  "l": 2,
  "q": "Se corta la mano en la planta en su primera semana. ¿Qué es correcto?",
  "o": [
   "No está cubierto porque está en período de prueba.",
   "Está cubierto por la póliza de Riesgos del Trabajo desde el primer día; debe reportarlo de inmediato a la jefatura y a Salud Ocupacional.",
   "Debe esperar a terminar el turno para no atrasar la producción."
  ],
  "a": 1,
  "e": "La persona en período de prueba tiene los mismos derechos, incluida la póliza de Riesgos del Trabajo."
 },
 {
  "id": "I-7",
  "z": 1,
  "t": "mc",
  "l": 1,
  "q": "Según el Código de Trabajo de Costa Rica, ¿cuánto puede durar como máximo el período de prueba?",
  "o": [
   "Un mes.",
   "Hasta tres meses.",
   "Seis meses."
  ],
  "a": 1,
  "e": "El período de prueba puede pactarse hasta por tres meses en contratos por tiempo indefinido."
 },
 {
  "id": "I-8",
  "z": 1,
  "t": "mc",
  "l": 1,
  "q": "Verdadero o falso: «La inducción termina cuando se firma el contrato».",
  "o": [
   "Verdadero",
   "Falso"
  ],
  "a": 1,
  "e": "Falso: la inducción es un proceso que continúa durante el período de prueba."
 },
 {
  "id": "N-1",
  "z": 2,
  "t": "reto",
  "l": 2,
  "q": "RETO: en 30 segundos presente a la persona de su derecha como su nuevo compañero de planta: nombre, área imaginaria y un dato curioso.",
  "c": "Logrado si menciona los 3 elementos en el tiempo. El grupo vota si hay duda."
 },
 {
  "id": "N-2",
  "z": 2,
  "t": "mc",
  "l": 2,
  "q": "¿Cuál de estas NO es un área de CoopeMontaña Verde?",
  "o": [
   "Laboratorio de calidad",
   "Planta de proceso",
   "Departamento de minería",
   "Extensión agropecuaria"
  ],
  "a": 2,
  "e": "Las áreas son: Acopio y logística, Laboratorio de calidad, Planta de proceso, Mantenimiento, Ventas y distribución, Extensión agropecuaria, Administración y Talento Humano, Salud Ocupacional."
 },
 {
  "id": "N-3",
  "z": 2,
  "t": "mc",
  "l": 2,
  "q": "RETO EN PAREJA (comente con otro jugador): ¿cuál es el orden correcto de la cadena de valor?",
  "o": [
   "Pasteurización → recolección → empaque → análisis → distribución",
   "Recolección en finca → recibo y análisis → pasteurización → empaque → distribución",
   "Distribución → empaque → recolección → análisis → pasteurización"
  ],
  "a": 1,
  "e": "La leche se recolecta, se analiza al recibirla, se pasteuriza, se empaca y se distribuye."
 },
 {
  "id": "N-4",
  "z": 2,
  "t": "mc",
  "l": 1,
  "q": "Su equipo le invita a almorzar juntos y a usted le da timidez. ¿Qué es lo más recomendable?",
  "o": [
   "Rechazar siempre.",
   "Aceptar al menos algunas veces para conocer al equipo.",
   "Pedir cambio de área."
  ],
  "a": 1,
  "e": "La integración social facilita el aprendizaje del puesto y el sentido de pertenencia."
 },
 {
  "id": "N-5",
  "z": 2,
  "t": "reto",
  "l": 1,
  "q": "MÍMICA: represente sin hablar una norma de inocuidad o seguridad. El grupo tiene 60 segundos para adivinar.",
  "c": "Logrado si alguien adivina. Quien adivina también puede recibir 1 litro (anótelo manualmente)."
 },
 {
  "id": "N-6",
  "z": 2,
  "t": "mc",
  "l": 1,
  "q": "Un compañero habla de la «prueba de antibióticos» en la leche y usted no entiende. ¿Qué hace?",
  "o": [
   "Finge que entiende.",
   "Pregunta al compañero o al mentor y anota el término en su glosario.",
   "Lo busca después, cuando tenga tiempo libre."
  ],
  "a": 1,
  "e": "Preguntar a tiempo es parte de una buena integración y evita errores."
 },
 {
  "id": "N-7",
  "z": 2,
  "t": "mc",
  "l": 2,
  "q": "¿Qué es un plan de 30-60-90 días?",
  "o": [
   "Un calendario de vacaciones.",
   "Un plan con metas de aprendizaje y desempeño para cada mes del período de prueba, acordado con la jefatura.",
   "El horario de turnos rotativos."
  ],
  "a": 1,
  "e": "Ordena las expectativas del período de prueba y sirve de base para el seguimiento."
 },
 {
  "id": "N-8",
  "z": 2,
  "t": "reto",
  "l": 1,
  "q": "RETO DE DIVERSIDAD: comparta una costumbre, comida o tradición de su región o país que podría enriquecer al equipo.",
  "c": "Logrado con cualquier aporte respetuoso."
 },
 {
  "id": "S-1",
  "z": 3,
  "t": "mc",
  "l": 2,
  "q": "En la reunión del día 30, su jefatura señala atrasos en los registros de temperatura. Lo más adecuado es:",
  "o": [
   "Justificarse y culpar al equipo.",
   "Acordar un plan de mejora con metas concretas y fecha de revisión.",
   "Ignorar el comentario."
  ],
  "a": 1,
  "e": "El seguimiento sirve para corregir a tiempo con acuerdos medibles."
 },
 {
  "id": "S-2",
  "z": 3,
  "t": "mc",
  "l": 1,
  "q": "¿En qué momentos mínimos conviene hacer reuniones formales de seguimiento en una prueba de 90 días?",
  "o": [
   "Solo el día 90.",
   "Alrededor de los días 30 y 60 y antes del día 90.",
   "Nunca: basta con la evaluación final."
  ],
  "a": 1,
  "e": "Además de conversaciones informales frecuentes."
 },
 {
  "id": "S-3",
  "z": 3,
  "t": "mc",
  "l": 2,
  "q": "¿Cuál NO es una característica de la retroalimentación efectiva?",
  "o": [
   "Específica",
   "Oportuna",
   "Basada en rumores",
   "Bidireccional"
  ],
  "a": 2,
  "e": "La retroalimentación se basa en conductas observables, no en rumores."
 },
 {
  "id": "S-4",
  "z": 3,
  "t": "mc",
  "l": 1,
  "q": "¿Dónde deben quedar registrados los acuerdos de seguimiento?",
  "o": [
   "En la memoria de la jefatura.",
   "En una bitácora o expediente de seguimiento firmado por ambas partes.",
   "En un chat informal."
  ],
  "a": 1,
  "e": "La documentación da objetividad y respaldo a la decisión final."
 },
 {
  "id": "S-5",
  "z": 3,
  "t": "mc",
  "l": 2,
  "q": "Un colaborador nuevo tiene dificultad para leer los procedimientos escritos. ¿Qué hace la jefatura?",
  "o": [
   "Lo califica bajo de inmediato.",
   "Ajusta el método: demostración práctica, apoyos visuales y acompañamiento del mentor.",
   "Le pide que estudie en su casa sin apoyo."
  ],
  "a": 1,
  "e": "Primero se adapta la formación; luego se evalúa."
 },
 {
  "id": "S-6",
  "z": 3,
  "t": "mc",
  "l": 1,
  "q": "Verdadero o falso: «El seguimiento solo sirve para detectar errores».",
  "o": [
   "Verdadero",
   "Falso"
  ],
  "a": 1,
  "e": "Falso: también reconoce logros, aclara expectativas y apoya el aprendizaje."
 },
 {
  "id": "S-7",
  "z": 3,
  "t": "mc",
  "l": 1,
  "q": "¿Para qué sirve una encuesta de experiencia a las personas de nuevo ingreso?",
  "o": [
   "Para sancionarlas.",
   "Para conocer su percepción y mejorar el programa de inducción e integración.",
   "No sirve para nada."
  ],
  "a": 1,
  "e": "Permite mejorar continuamente el proceso."
 },
 {
  "id": "S-8",
  "z": 3,
  "t": "mc",
  "l": 2,
  "q": "Usted es mentor y su compañero nuevo comete el mismo error tres veces. ¿Qué hace?",
  "o": [
   "Lo regaña frente al equipo.",
   "Explica de nuevo, verifica comprensión, lo documenta y avisa a la jefatura si persiste.",
   "Hace el trabajo por él."
  ],
  "a": 1,
  "e": "El mentor apoya y deja evidencia para el seguimiento."
 },
 {
  "id": "E-1",
  "z": 4,
  "t": "mc",
  "l": 2,
  "q": "¿Cuál grupo contiene criterios adecuados para evaluar el desempeño inicial de un operario de planta?",
  "o": [
   "Apariencia física, edad y religión.",
   "Calidad del trabajo, cumplimiento de BPM y seguridad, puntualidad y trabajo en equipo.",
   "Simpatía con la jefatura y redes sociales."
  ],
  "a": 1,
  "e": "Se evalúan conductas y resultados relacionados con el puesto."
 },
 {
  "id": "E-2",
  "z": 4,
  "t": "mc",
  "l": 2,
  "q": "¿Qué es el «efecto halo» al evaluar?",
  "o": [
   "Evaluar a todos con la nota máxima.",
   "Dejar que una sola característica influya en la calificación de todas las demás.",
   "Evaluar solo el último mes."
  ],
  "a": 1,
  "e": "Es un sesgo frecuente que se evita con criterios claros y evidencias."
 },
 {
  "id": "E-3",
  "z": 4,
  "t": "mc",
  "l": 1,
  "q": "¿Quiénes deberían aportar información a la evaluación inicial?",
  "o": [
   "Solo el gerente general.",
   "Jefatura directa, mentor(a) y la propia persona (autoevaluación), con coordinación de Talento Humano.",
   "Los clientes."
  ],
  "a": 1,
  "e": "Varias fuentes dan una visión más justa."
 },
 {
  "id": "E-4",
  "z": 4,
  "t": "mc",
  "l": 1,
  "q": "Para que una evaluación sea justa, los criterios deben:",
  "o": [
   "Definirse al final.",
   "Darse a conocer desde el inicio.",
   "Mantenerse en secreto."
  ],
  "a": 1,
  "e": "La persona debe saber desde el inicio qué se espera de ella."
 },
 {
  "id": "E-5",
  "z": 4,
  "t": "mc",
  "l": 2,
  "q": "Andrea obtuvo (escala 1 a 5): calidad 4, puntualidad 2, trabajo en equipo 5, BPM 4, aprendizaje 5. ¿Cuál es su promedio?",
  "o": [
   "3,5",
   "4,0",
   "4,5"
  ],
  "a": 1,
  "e": "(4+2+5+4+5) ÷ 5 = 20 ÷ 5 = 4,0. Su punto de mejora es la puntualidad."
 },
 {
  "id": "E-6",
  "z": 4,
  "t": "reto",
  "l": 1,
  "q": "AUTOEVALUACIÓN: califíquese de 1 a 5 en su participación en este juego y justifíquelo con un ejemplo concreto.",
  "c": "Logrado si da una calificación y un ejemplo concreto."
 },
 {
  "id": "E-7",
  "z": 4,
  "t": "mc",
  "l": 2,
  "q": "Una jefatura califica más bajo a una colaboradora por su acento extranjero. ¿Es correcto?",
  "o": [
   "Sí, si el acento le molesta.",
   "No: es discriminación por origen, prohibida por el Código de Trabajo; solo se evalúa el desempeño.",
   "Sí, si los demás están de acuerdo."
  ],
  "a": 1,
  "e": "La evaluación debe basarse en criterios objetivos del puesto."
 },
 {
  "id": "E-8",
  "z": 4,
  "t": "mc",
  "l": 1,
  "q": "¿Cómo y cuándo se comunican los resultados de la evaluación inicial?",
  "o": [
   "Por correo masivo, después del día 90.",
   "En una entrevista privada de retroalimentación, antes de que venza el período de prueba.",
   "No se comunican."
  ],
  "a": 1,
  "e": "La persona tiene derecho a conocer sus resultados a tiempo."
 },
 {
  "id": "C-1",
  "z": 5,
  "t": "mc",
  "l": 2,
  "q": "Luis obtuvo promedio 4,3, cumplió su plan de 30-60-90 días y su mentor lo recomienda. ¿Qué decide el Comité?",
  "o": [
   "Confirmarlo en el puesto.",
   "Terminar el contrato.",
   "Extender la prueba otros tres meses."
  ],
  "a": 0,
  "e": "La evidencia respalda la confirmación."
 },
 {
  "id": "C-2",
  "z": 5,
  "t": "mc",
  "l": 3,
  "q": "Marta tiene promedio 2,1 e incumplimientos de inocuidad repetidos y documentados, pese a un plan de mejora. ¿Qué corresponde?",
  "o": [
   "Confirmarla para no generar conflicto.",
   "No continuidad, comunicada antes de cumplir los tres meses, con respeto y pagando sus derechos.",
   "Despedirla sin explicación el día 100."
  ],
  "a": 1,
  "e": "La decisión debe ser oportuna, fundamentada y respetuosa."
 },
 {
  "id": "C-3",
  "z": 5,
  "t": "mc",
  "l": 2,
  "q": "Si se termina el contrato durante el período de prueba, ¿qué se le paga a la persona trabajadora?",
  "o": [
   "Nada.",
   "Salario pendiente, aguinaldo y vacaciones proporcionales (sin preaviso ni cesantía).",
   "Preaviso y cesantía completos."
  ],
  "a": 1,
  "e": "El período de prueba elimina la responsabilidad patronal, no los derechos ya generados."
 },
 {
  "id": "C-4",
  "z": 5,
  "t": "mc",
  "l": 2,
  "q": "¿Puede la empresa extender el período de prueba a cuatro meses porque «aún no se decide»?",
  "o": [
   "Sí, si lo firma la persona.",
   "No, el máximo es de tres meses.",
   "Sí, en empresas medianas."
  ],
  "a": 1,
  "e": "El plazo máximo es de tres meses."
 },
 {
  "id": "C-5",
  "z": 5,
  "t": "mc",
  "l": 2,
  "q": "Nadie comunicó la decisión y la persona cumple el día 91 trabajando. ¿Qué pasa?",
  "o": [
   "Sigue en prueba indefinidamente.",
   "Supera el período de prueba y conserva todos los derechos de un contrato por tiempo indefinido.",
   "Debe volver a firmar contrato."
  ],
  "a": 1,
  "e": "Vencido el plazo, la relación se consolida."
 },
 {
  "id": "C-6",
  "z": 5,
  "t": "mc",
  "l": 3,
  "q": "Karla informa el día 70 que está embarazada. ¿Puede la empresa despedirla sin más porque está en período de prueba?",
  "o": [
   "Sí, porque está en período de prueba.",
   "No: está protegida también en el período de prueba; solo por falta grave y con gestión previa ante la Inspección de Trabajo del MTSS.",
   "Sí, si se le paga una indemnización."
  ],
  "a": 1,
  "e": "La protección a la trabajadora embarazada o en lactancia aplica aunque esté en prueba."
 },
 {
  "id": "C-7",
  "z": 5,
  "t": "mc",
  "l": 2,
  "q": "¿Cómo se comunica éticamente una decisión de no continuidad?",
  "o": [
   "Por mensaje de texto, sin explicaciones.",
   "En privado, con respeto, con fundamentos objetivos y documentados, y por escrito.",
   "Frente al equipo, para que sirva de ejemplo."
  ],
  "a": 1,
  "e": "Se protege la dignidad de la persona."
 },
 {
  "id": "C-8",
  "z": 5,
  "t": "mc",
  "l": 1,
  "q": "¿Qué documentos debe revisar el Comité de Continuidad antes de decidir?",
  "o": [
   "Solo la opinión del gerente.",
   "Evaluación inicial, bitácora de seguimiento, autoevaluación y criterio del mentor y la jefatura.",
   "Las redes sociales de la persona."
  ],
  "a": 1,
  "e": "Una decisión justa se basa en evidencias."
 },
 {
  "id": "D-1",
  "z": 0,
  "t": "mc",
  "l": 3,
  "q": "DILEMA: una jefatura propone no confirmar a un colaborador de 52 años porque «no se va a adaptar a la tecnología», aunque su desempeño es bueno. ¿Qué hace usted?",
  "o": [
   "Apoyar la propuesta.",
   "Oponerse: es discriminación por edad; la decisión se basa en el desempeño demostrado.",
   "No opinar."
  ],
  "a": 1,
  "e": "El Código de Trabajo prohíbe la discriminación por edad."
 },
 {
  "id": "D-2",
  "z": 0,
  "t": "mc",
  "l": 3,
  "q": "DILEMA: un colaborador nuevo pide no trabajar los sábados por motivos religiosos. ¿Qué es lo adecuado?",
  "o": [
   "Negarlo y anotarlo en su evaluación.",
   "Analizar un ajuste razonable de turnos si la operación lo permite, sin perjudicarlo en la evaluación.",
   "Despedirlo en el período de prueba."
  ],
  "a": 1,
  "e": "Se respeta la libertad religiosa y se buscan soluciones viables."
 },
 {
  "id": "D-3",
  "z": 0,
  "t": "mc",
  "l": 3,
  "q": "DILEMA: varios compañeros hacen bromas sobre el acento de una colaboradora nicaragüense recién contratada. ¿Qué hace usted?",
  "o": [
   "Reírse para integrarse.",
   "Intervenir con respeto, reportarlo a la jefatura o a Talento Humano y recordar la política de respeto a la diversidad.",
   "Ignorarlo: son solo bromas."
  ],
  "a": 1,
  "e": "El respeto a la diversidad es un valor de la cooperativa."
 },
 {
  "id": "D-4",
  "z": 0,
  "t": "mc",
  "l": 3,
  "q": "DILEMA: ingresa una persona con discapacidad auditiva. ¿Cómo se adapta la inducción?",
  "o": [
   "Se le da la misma charla oral y se espera que entienda.",
   "Material escrito y visual, videos con subtítulos, intérprete de LESCO si es posible y un mentor de apoyo.",
   "Se omite su inducción."
  ],
  "a": 1,
  "e": "La Ley 7600 promueve la igualdad de oportunidades para personas con discapacidad."
 },
 {
  "id": "D-5",
  "z": 0,
  "t": "mc",
  "l": 3,
  "q": "DILEMA: usted es mentor y amigo personal de la persona evaluada; le pide «subirle» las notas. ¿Qué hace?",
  "o": [
   "Subirle las notas: es su amigo.",
   "Declarar el conflicto de interés y evaluar con objetividad o pedir que otra persona participe.",
   "Bajarle las notas para que no parezca favoritismo."
  ],
  "a": 1,
  "e": "La integridad exige evaluar con objetividad."
 }
];
