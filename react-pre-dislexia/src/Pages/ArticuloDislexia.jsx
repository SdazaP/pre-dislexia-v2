import { useState } from "react";
import Layout from "../Layouts/Layout";

export default function ArticuloDislexia() {
  const [activeSection, setActiveSection] = useState("que-es");

  const sections = [
    { id: "que-es", title: "¿Qué es la dislexia?" },
    { id: "recomendaciones", title: "Recomendaciones" },
    { id: "referencias", title: "Referencias" },
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout>
      <div className="min-h-screen py-12 text-justify">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Navegación lateral*/}
          <div className="fixed left-4 top-40 transform -translate-y-1/2 hidden lg:block">
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeSection === section.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Sección: ¿Qué es la dislexia? */}
          <section
            id="que-es"
            className="bg-white p-8 mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center">
              ¿Qué es la dislexia?
            </h1>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                La dislexia es una dificultad específica de aprendizaje que
                forma parte de las dificultades específicas de aprendizaje
                (DEA), caracterizadas por problemas en procesos básicos como la
                comprensión oral y escrita del lenguaje. Afecta áreas como
                pensamiento, habla, lectura, escritura, deletreo y el manejo de
                signos matemáticos. Aunque no está relacionada con un déficit
                cognitivo ni sensorial evidente, puede ser causa de bajo
                rendimiento escolar y dificultades sociales.
              </p>

              <p>
                Es el trastorno más común en la lectura y aprendizaje, afectando
                aproximadamente al 2-8% de los niños escolarizados, siendo más
                prevalente en niños que en niñas y con antecedentes familiares
                frecuentes. Suele manifestarse junto con trastornos como la
                discalculia y la disgrafía. Los niños con dislexia pueden
                también presentar problemas de atención e impulsividad.
              </p>

              <p>
                El diagnóstico de la dislexia se basa en la observación de un
                retraso notable en la adquisición de habilidades de lectura en
                comparación con sus compañeros. Se relaciona con dificultades en
                el procesamiento fonológico, auditivo y visual, así como con
                déficits en la memoria de trabajo y en el conocimiento
                sintáctico.
              </p>

              <p>
                Además, existen variantes como la disgrafía, que afecta la
                habilidad para escribir correctamente, y la discalculia, que se
                refiere a dificultades en el cálculo y el manejo de números.
                Estos trastornos pueden tener un impacto significativo en el
                rendimiento académico y emocional de los niños afectados,
                afectando no solo su desempeño escolar sino también su
                adaptación social y emocional.
              </p>
            </div>
          </section>

          {/* Sección: Recomendaciones */}
          <section
            id="recomendaciones"
            className="bg-white p-8 mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center">
              Recomendaciones
            </h1>

            {/* Papel de la familia */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                Papel de la familia
              </h3>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  En nuestro sistema educativo se da por supuesto que la
                  responsabilidad de la enseñanza recae sobre el profesor más
                  que sobre los padres; y en el caso de los niños disléxicos, se
                  suele derivar hacia el especialista (psicólogo, pedagogo,
                  logopeda o profesor especializado). Esto no es así, puesto que
                  en todos los casos, y mucho más en el de los niños disléxicos,
                  sin el apoyo directo de la familia, va a resultar muy difícil
                  que el alumno salga adelante.
                </p>

                <p>
                  El papel más importante que tienen que cumplir los padres de
                  los niños disléxicos quizás sea el de apoyo emocional y
                  social. También es importante comunicarle que se le seguirá
                  queriendo, aunque no pueda ir especialmente bien en el
                  colegio. Aunque es muy difícil, hay que evitar que la ansiedad
                  de los padres aumente los problemas del niño, incrementando su
                  angustia y preocupación y generando dificultades emocionales
                  secundarias.
                </p>

                <p>
                  Los padres (y todos los que se relacionan con él o ella) deben
                  dejar muy claro al niño que puede tener éxito, ya que si el
                  niño "sabe" que no lo puede tener (porque así se lo hacen
                  sentir las personas importantes de su entorno) tendrá miedo a
                  intentarlo; y como en la profecía que se auto-cumple, hace por
                  fracasar, sin apenas darse cuenta. Eso complica la tarea del
                  especialista.
                </p>

                <p>
                  Es importante desarrollar la autoestima a todos los niveles.
                  Puede hacerse dispensando al niño consideración positiva
                  incondicional, en especial cuando se siente decaído o
                  fracasado. Es fundamental evaluarlo con su propio nivel,
                  esfuerzo y rendimiento. La dificultad radica en no pasar a la
                  sobreprotección, al "todo vale". Pero la guía es tener clara
                  la escala de valores en la que se desenvuelve el niño, la
                  situación de partida, el esfuerzo realizado.
                </p>

                <p>
                  Otro aspecto a tener en cuenta son las dificultades prácticas
                  asociadas con la dislexia: confusiones con las horas del día,
                  equivocaciones respecto del lugar donde se colocan las cosas,
                  tendencia al desorden, facilidad para distraerse, torpeza en
                  ocasiones, dificultad en el cumplimiento de las instrucciones,
                  etc. Todas ellas son conductas de por sí enervantes, que
                  pueden acabar con los nervios más templados; sólo la
                  información precisa de lo que significa e implica la dislexia
                  los podrá ayudar a sobrellevar su vida diaria. Cuando
                  comprendan qué puede y qué no puede hacer el niño en cada
                  momento podrán relajarse y atenderlo en lo que más le
                  convenga. Con un disléxico hay que aprender a convivir.
                </p>
              </div>

              {/* Lista de recomendaciones familiares */}
              <div className="bg-blue-50  p-6 mt-6">
                <ul className="space-y-3">
                  {[
                    "Ayudarle a organizar el orden del trabajo a desarrollar (empezar con las asignaturas de dificultad superior, después las más sencillas para él y, finalmente, las más mecánicas)",
                    "Dejarle solo en lo que pueda hacer de manera autónoma, pero estar a su lado en lo que no",
                    "Cuando el niño está agotado, tomarle el lápiz y continuar escribiendo (él nos dicta y nosotros transcribimos)",
                    "Cuando ni así dé resultado, poner una nota al profesor que, previamente informado del problema, tendrá que aceptar nuestra decisión",
                    "Leer con él los libros y otras tareas que le han dado, o leérselos directamente",
                    "Explorar y enseñarle a utilizar instrumentos electrónicos como agendas electrónicas y correctores de ortografía",
                    "La actitud de los padres debe basarse en el sentido común",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Papel en la escuela */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                Su papel en la escuela
              </h3>
              <p className="text-gray-700 mb-4">
                En este aspecto, habría muchas cosas a decir, pero quizá lo más
                importante sería:
              </p>

              <div className="bg-green-50 rounded-xl p-6">
                <ul className="space-y-3">
                  {[
                    "Prepare una lista de las recomendaciones del psicopedagogo y entregue una copia a cada profesor",
                    "Mantenga un contacto regular con los profesores",
                    "Utilice códigos de color para marcar todos los libros y bolsas",
                    "Procure que todo su material escolar esté siempre preparado y ordenado",
                    "Enséñele a su hijo a preparar y vaciar su cartera y a organizar su estuche de lápices",
                    "Mantenga un registro del tiempo que dedica su hijo a hacer sus deberes",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Entorno seguro y estable */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                Su necesidad de un entorno seguro y estable
              </h3>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Los niños con dificultades de aprendizaje prosperan mejor en
                  entornos estables y seguros, donde la estructura y la rutina
                  son fundamentales. Adaptarse a cambios, como trasladarse a
                  otro lugar, puede ser especialmente desafiante para ellos, ya
                  que dependen de la familiaridad y la repetición para sentirse
                  seguros.
                </p>

                <p>
                  Una vez que estos niños aprenden algo en un entorno estable,
                  lo retienen de manera duradera. Sin embargo, es esencial que
                  quienes los rodean, incluidos educadores y cuidadores,
                  reconozcan y acepten sus dificultades específicas de
                  aprendizaje.
                </p>

                <p>
                  Es crucial no asumir que estos niños no pueden cumplir con las
                  expectativas escolares, sino más bien reconocer que el sistema
                  educativo debe adaptarse para satisfacer sus necesidades
                  individuales y proporcionarles una enseñanza que sea accesible
                  y efectiva para ellos.
                </p>
              </div>
            </div>

            {/* Aceptar la realidad */}
            <div>
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                Aceptar la realidad
              </h3>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Cuando se comunica a los padres que su hijo tiene un trastorno
                  del aprendizaje, suelen experimentar una mezcla de emociones
                  negativas como negación, rencor, temor, entre otras. Es
                  crucial que acepten la situación para poder elaborar
                  estrategias positivas que ayuden al niño a desarrollar sus
                  capacidades plenamente.
                </p>

                <p>
                  Es fundamental que los padres reconozcan y acepten la dislexia
                  de su hijo, ya que esto facilita la elección de asignaturas
                  adecuadas y permite solicitar adaptaciones curriculares
                  necesarias.
                </p>

                <p>
                  Es recomendable diagnosticar las dificultades de aprendizaje
                  lo antes posible para acceder a la ayuda adecuada y aumentar
                  las posibilidades de superar las dificultades. Los padres
                  deben confiar en su intuición y buscar evaluaciones
                  profesionales si sospechan problemas educativos.
                </p>

                <p>
                  Crear un ambiente seguro y positivo en casa es crucial,
                  especialmente porque la escuela puede resultar desalentadora
                  para el niño. Fomentar cualquier talento especial del niño y
                  elogiar sus logros son estrategias importantes para construir
                  su autoestima.
                </p>

                <p>
                  Los padres de niños disléxicos, harían bien en averiguar qué
                  grupos de apoyo y otras organizaciones relevantes se
                  encuentran en su zona. A veces es un alivio ver que su familia
                  no es la única que sobrelleva la vida con un hijo con
                  dificultades de aprendizaje; no sólo les ofrecerán su apoyo,
                  sino que también podrán obtener informaciones muy útiles.
                </p>
              </div>
            </div>
          </section>

          {/* Referencias */}
          <section
            id="referencias"
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Referencias
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="border-l-4 border-blue-500 pl-4 py-2">
                Artiz, L. (2020). Ni escriben al revés ni son niños "tontos" o
                vagos. Diez falsos mitos sobre la dislexia. Uoc.edu; Universitat
                Oberta de Catalunya.
                https://www.uoc.edu/es/news/2020/410-10-falsos-mitos-sobre-dislexia
              </li>
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
}
