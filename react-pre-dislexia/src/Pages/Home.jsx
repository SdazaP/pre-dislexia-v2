import Layout from "../Layouts/Layout";
import '@fontsource-variable/rubik';

const Home = () => {
  return (
    <Layout>
      <div className="container mx-auto mt-4 px-4">
        <div className="flex justify-center">
          <img
            src="https://res.cloudinary.com/dmx716lyu/image/upload/v1755546463/Banner_t61ujd.jpg"
            alt="Header Image"
            className="sm:w-3/4 h-auto rounded-lg shadow-md mx-auto"
          />
        </div>
      </div>

      <section className="container mx-auto mt-8 px-4 text-lg">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/dmx716lyu/image/upload/v1755557028/dislexia_kzzvcz.png"
              alt="Imagen sobre dislexia"
              className="w-full max-w-xs h-auto rounded-lg"
            />
          </div>
          <div className="md:w-2/3 flex flex-col justify-center my-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              ¿Qué es la Dislexia?
            </h1>
            <p className="text-lg md:text-xl text-justify mb-4">
              Es una dificultad de aprendizaje que se manifiesta en dificultades
              de acceso al léxico, y puede estar causada por una combinación de
              déficit en el procesamiento fonológico, auditivo, y/o visual.
              <br />
              <br />
              Asimismo, se suele acompañar de problemas relacionados con un
              funcionamiento deficiente de la memoria de trabajo, deficiencias
              en el conocimiento sintáctico, y problemas de velocidad de
              procesamiento.
              <br />
              <br />
              <span className="italic">(ASANDIS, 2017)</span>
            </p>
            <a
              href="/articulo"
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg self-start transition-colors duration-300"
            >
              Aprende más
            </a>
          </div>
        </div>
      </section>

      <section className="bg-blue-500 text-white py-8 mt-8 text-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Causas */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-center mb-4">
                <img
                  src="https://res.cloudinary.com/dmx716lyu/image/upload/v1755557223/causas_wdauqy.jpg"
                  alt="Causas de la Dislexia"
                  className="h-80 rounded-lg"
                />
              </div>
              <h3 className="text-4xl font-bold text-center mb-4">
                Causas de la Dislexia
              </h3>
              <p className="text-blue-100 text-justify text-lg md:text-xl">
                Los niños nacen con dislexia, pero la sintomatología comienza a
                manifestarse cuando entra en la escuela, la mayoría de los
                especialistas establece la clasificación después de los siete u
                ocho años, cuando se supone que ha adquirido la lectura sin
                ninguna duda.
              </p>
            </div>

            {/* Consecuencias */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-center mb-4">
                <img
                  src="https://res.cloudinary.com/dmx716lyu/image/upload/v1755557231/consecuencias_j9cgqd.jpg"
                  alt="Consecuencias de la Dislexia"
                  className="h-80 rounded-lg"
                />
              </div>
              <h3 className="text-4xl font-bold text-center mb-4">
                Consecuencias de la Dislexia
              </h3>
              <ul className="list-disc pl-5 text-blue-100 space-y-2 text-lg md:text-xl">
                <li>Desinterés por el estudio</li>
                <li>Calificaciones escolares bajas</li>
                <li>Marginados del grupo</li>
                <li>Inseguridad</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-12 px-4 text-lg">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold mb-6">
              Mitos sobre la Dislexia
            </h1>
            <ul className="list-disc pl-5 space-y-3 mb-4 text-lg md:text-xl">
              <li>Es una enfermedad que se cura con el tratamiento adecuado</li>
              <li>La dislexia no se manifiesta hasta los siete años</li>
              <li>Un mal hábito de lectura puede provocar la dislexia</li>
              <li>
                Los disléxicos tienen un cociente intelectual algo más bajo
              </li>
              <li>Los niños bilingües no pueden tener dislexia</li>
            </ul>
            <p className="italic">(Artiz, 2020)</p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://res.cloudinary.com/dmx716lyu/image/upload/v1755557370/mitos_xnsa8s.jpg"
              alt="Imagen de mitos sobre la dislexia"
              className="h-96 rounded-lg"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-12 px-4 mb-12 text-lg">
        <h1 className="text-4xl font-bold mb-4 text-center">Referencias</h1>
        <ul className="list-disc pl-5 space-y-3">
          <li>
            ASANDIS. (2017).
            https://www.disfam.org/wp-content/uploads/2017/03/guia-general-sobre-dislexia-andalucia.pdf
          </li>
          <li>
            Artiz, L. (2020). Ni escriben al revés ni son niños "tontos" o
            vagos. Diez falsos mitos sobre la dislexia. Uoc.edu; Universitat
            Oberta de Catalunya.
            https://www.uoc.edu/es/news/2020/410-10-falsos-mitos-sobre-dislexia
          </li>
        </ul>
      </section>
    </Layout>
  );
};

export default Home;
