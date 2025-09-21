import { Link } from "react-router-dom";


export default function Home() {

    return(
        <div>
            <section className="my-8 mx-4 flex flex-col items-center justify-center gap-8 text-center">
                <h1 className="text-4xl font-bold text-tx-primary ">Sua teleconsulta, mais fácil e sem faltas.</h1>
                <p className="text-xl text-tx-secondary max-w-3xl mx-auto">Preparamos você para sua consulta online de forma simples. Garanta que tudo funcione bem e não perca seu atendimento.</p>
                <Link to="/simulador" className="bg-primary-600 border-none hover:bg-primary-700 text-white text-lg p-6 h-auto rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">Quero testar minha consulta agora</Link>
            </section>

            <section>
                <div>
                    <h1>Como Funciona: Um passo de cada vez</h1>
                    <p>Nossa solução ajuda você a se preparar completamente para sua teleconsulta</p>
                </div>
            </section>
        </div>
    )
}