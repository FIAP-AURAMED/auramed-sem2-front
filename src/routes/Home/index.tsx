import { Link } from "react-router-dom";
import { AccessibilityIcon, BookOpen, Camera, CheckCircle, Heart, MessageCircle, Users, Volume2, ZoomIn } from "lucide-react";
import CardBeneficios from "../../components/CardBeneficios";
import CardFunciona from "../../components/CardFunciona";
import { useEffect } from "react";


export default function Home() {

    useEffect(() => {
            document.title = 'AuraMed | Home';
            return () => {
                document.title = 'AuraMed';
            };
        }, []);

    const card1beneficios = [
        'Menos ansiedade com a tecnologia',
        'Ajuda para se sentir mais preparado',
        'Garantia de que seu atendimento acontecerá',
    ];

    const card2beneficios = [
        'Redução no número de faltas',
        'Pacientes mais preparados para a consulta',
        'Fácil acesso para cadastrar e gerenciar',
    ];

    return (
        <div>
            <section className="my-12 mx-4 flex flex-col items-center justify-center gap-8 text-center">
                <h1 className="text-4xl font-bold text-tx-primary ">Sua teleconsulta, mais fácil e sem faltas.</h1>
                <p className="text-xl text-tx-secondary max-w-3xl mx-auto">Preparamos você para sua consulta online de forma simples. Garanta que tudo funcione bem e não perca seu atendimento.</p>
                <Link to="/simulador" className="bg-primary-600 border-none hover:bg-primary-700 text-white text-lg p-6 h-auto rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">Quero testar minha consulta agora</Link>
            </section>

            <section className="bg-gradient-to-r from-primary-300/10 to-secondary-300/10 p-4 rounded-xl w-[80%] md:w-[40%] m-auto border-primary-600/10 border-2">
                <div className="flex flex-col justify-center items-center gap-4 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 p-8 rounded-xl i">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto bg-green-600">
                    <CheckCircle className="w-8 h-8 text-white" />
                </div>
                    <p className="text-center text-tx-primary">Aqui é a garantia de que sua Teleconsulta está funcionando perfeitamente</p>
                </div>
            </section>

            <section className="flex flex-col items-center justify-center bg-gray-400/10 pb-10 my-12">
                <div className="my-12 mx-4 flex flex-col items-center justify-center gap-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-tx-primary ">Como Funciona: Um passo de cada vez</h2>
                    <p className="text-lg text-tx-secondary max-w-3xl mx-auto">Nossa solução ajuda você a se preparar completamente para sua teleconsulta</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 m-5 md:mx-30">
                    <CardFunciona
                        icon={Camera}
                        title="Teste sua Câmera"
                        description="Antes da consulta, nosso simulador avisa se sua imagem está boa para o médico ver você bem."
                        buttonText="Ir para o simulador"
                        buttonLink="/simulador"
                        colorTheme="pink"
                    />

                    <CardFunciona
                        icon={BookOpen}
                        title="Aprenda a Usar"
                        description="Temos um guia completo em texto e áudio para você seguir, sem complicações."
                        buttonText="Ver o passo a passo"
                        buttonLink="/tutorial"
                        colorTheme="yellow"
                    />

                    <CardFunciona
                        icon={MessageCircle}
                        title="Tire suas Dúvidas"
                        description="Nosso assistente virtual responde suas perguntas a qualquer hora do dia."
                        buttonText="Conversar agora..."
                        buttonLink="/central-ajuda"
                        colorTheme="pink"
                    />
                </div>
            </section>

            <section className="x-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:mx-35">
                    <CardBeneficios
                        icon={Heart}
                        title="Mais confiança no atendimento"
                        beneficios={card1beneficios}
                    />

                    <CardBeneficios
                        icon={Users}
                        title="Otimize seu tempo e organize seus atendimentos"
                        beneficios={card2beneficios}
                        colorTheme="pink"
                    />
                </div>
            </section>

            <section className="bg-gradient-to-r from-primary-300/10 to-secondary-300/10 py-8 mb-20">
                <div className="mt-12 mx-4 flex flex-col items-center justify-center gap-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-tx-primary ">Um site feito para ser usado por todos</h2>
                    <p className="text-lg text-tx-secondary max-w-3xl mx-auto">Acreditamos que a tecnologia deve ser fácil para todos. Por isso, nosso site conta com recursos especiais:</p>
                </div>

                <div className="flex flex-col md:flex-row justify-center align-center">
                    <article className="flex flex-col items-center justify-center gap-4 text-center p-6 md:w-80">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto bg-secondary-600/20">
                            <ZoomIn className="h-8 w-8 text-tx-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-tx-primary">Lupa de Aumento</h3>
                        <p className="text-md text-tx-secondary max-w-3xl mx-auto">Aumente qualquer parte da tela para ler melhor</p>
                    </article>

                    <article className="flex flex-col items-center justify-center gap-4 text-center p-6 md:w-80">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto bg-primary-600/20">
                            <Volume2 className="h-8 w-8 text-primary-600" />
                        </div>
                        <h3 className="text-xl font-bold text-tx-primary">Leitura em Áudio</h3>
                        <p className="text-md text-tx-secondary max-w-3xl mx-auto">Ouça os textos da página com apenas um clique</p>
                    </article>

                    <article className="flex flex-col items-center justify-center gap-4 text-center p-6 md:w-80">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto bg-secondary-600/20">
                            <AccessibilityIcon className="h-8 w-8 text-secondary-600" />
                        </div>
                        <h3 className="text-xl font-bold text-tx-primary">Alto Contraste</h3>
                        <p className="text-md text-tx-secondary max-w-3xl mx-auto">Modo especial para melhor visualização</p>
                    </article>
                </div>
            </section>
        </div>
    )
}