import { BookOpen, Camera, Lightbulb, MessageCircle, Shield, Stethoscope, Users, Volume2 } from "lucide-react";
import { ProcessoSection } from "../../components/CardProcesso";
import CardFunciona from "../../components/CardFunciona";
import { Link } from "react-router-dom";
import { useEffect } from "react";


export default function ComoFunciona() {

    useEffect(() => {
            document.title = 'AuraMed | Como Funciona';
            return () => {
                document.title = 'AuraMed';
            };
        }, []);

    const mainSteps = [
        {
            icon: Camera,
            title: "Teste sua Tecnologia",
            description: "Nosso simulador verifica se sua câmera, áudio e internet estão funcionando perfeitamente.",
            details: ["Verificação automática da câmera", "Teste de qualidade de áudio", "Análise da velocidade da internet"],
            buttonText: "Testar Agora",
            buttonLink: "/simulador",
        },
        {
            icon: BookOpen,
            title: "Aprenda o Passo a Passo",
            description: "Tutorial completo em texto e áudio que ensina como se preparar para a teleconsulta.",
            details: ["Guia narrado em português claro", "Instruções visuais detalhadas", "Dicas para melhor posicionamento"],
            buttonText: "Ver Tutorial",
            buttonLink: "/tutorial",
        },
        {
            icon: MessageCircle,
            title: "Tire suas Dúvidas",
            description: "Assistente virtual disponível 24h para responder perguntas e ajudar com a preparação.",
            details: ["Respostas instantâneas", "Perguntas frequentes atualizadas", "Suporte personalizado"],
            buttonText: "Fazer Pergunta",
            buttonLink: "/central-ajuda",
        }
    ];


    return (
        <div>
            <section className="my-12 mx-4 flex flex-col items-center justify-center gap-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-tx-primary ">Como Funciona a Solução Auramed</h1>
                <p className="text-xl text-tx-secondary max-w-3xl mx-auto">Entenda como nossa plataforma ajuda pacientes e profissionais de saúde a terem sucesso em teleconsultas.</p>
            </section>

            <section>
                <ProcessoSection
                    title="O Processo em 3 Passos Simples"
                    steps={mainSteps}
                />
            </section>

            <section className="flex flex-col items-center justify-center bg-gray-400/10 pb-10 my-12">
                <div className="my-12 mx-4 flex flex-col items-center justify-center gap-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-tx-primary ">A Tecnologia por Trás da Solução</h2>
                    <p className="text-lg text-tx-secondary max-w-3xl mx-auto">Utilizamos tecnologias avançadas para garantir a melhor experiência possível.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 m-5 md:mx-30">
                    <CardFunciona
                        icon={Lightbulb}
                        title="Detecção Facial"
                        description="Algoritmos de Facial Landmark para verificar posicionamento ideal da câmera"
                        colorTheme="pink"
                    />

                    <CardFunciona
                        icon={MessageCircle}
                        title="MessageCircle"
                        description="Machine Learning para agrupar e responder perguntas frequentes automaticamente"
                        colorTheme="yellow"
                    />

                    <CardFunciona
                        icon={Volume2}
                        title="Síntese de Voz"
                        description="Narração automática para maior acessibilidade e inclusão digital"
                        colorTheme="pink"
                    />

                    <CardFunciona
                        icon={Shield}
                        title="Segurança de Dados"
                        description="Processamento local dos dados de vídeo, sem armazenamento na nuvem"
                        colorTheme="yellow"
                    />
                </div>
            </section>

            <section className="flex flex-col items-center justify-center">
                <div className="my-8 mx-4 flex flex-col items-center justify-center gap-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-tx-primary ">Para Profissionais de Saúde</h2>
                    <p className="text-lg text-tx-secondary max-w-3xl mx-auto">Gerencie e prepare seus pacientes para teleconsultas mais eficientes.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-5 md:mx-30">
                    <div className="flex flex-col gap-2 m-2 bg-primary-600/10 p-8 rounded-2xl">
                        <Stethoscope className="w-8 h-8 text-primary-600" />
                        <h3 className="text-xl font-semibold text-tx-primary">
                            Cadastro de Pacientes
                        </h3>
                        <p className="text-tx-secondary leading-relaxed">
                            Interface simples para cadastrar e gerenciar informações dos seus pacientes,
                            incluindo histórico de teleconsultas e preparação.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 m-2 bg-primary-600/10 p-8 rounded-2xl">
                        <Users className="w-8 h-8 text-primary-600" />
                        <h3 className="text-xl font-semibold text-tx-primary">
                            Relatórios e Analytics
                        </h3>
                        <p className="text-tx-secondary leading-relaxed">
                            Acompanhe estatísticas de absenteísmo, qualidade das consultas e
                            nível de preparação dos seus pacientes.
                        </p>
                    </div>
                </div>

                <Link to='/login-profissional' className="flex gap-4 items-center justify-center bg-primary-600 hover:bg-primary-700 rounded-xl py-4 px-8 text-white text-lg md:text-xl">
                    <Stethoscope className="w-6 h-6 text-white" />
                    Acessar Área do Paciente
                </Link>
            </section>

            <section className="flex flex-col items-center gap-4 justify-center border-gray-300 border-2 rounded-xl m-6 md:mx-40 md:my-10 p-6">
                <div className="mx-4 flex flex-col items-center justify-center gap-4 text-center">
                    <h2 className="text-2xl md:text-4xl font-bold text-tx-primary ">Pronto para Experimentar?</h2>
                    <p className="text-lg text-tx-secondary max-w-3xl mx-auto">Comece agora mesmo a preparar sua próxima teleconsulta. É gratuito e leva apenas alguns minutos.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/simulador" className="flex items-center rounded-xl text-lg px-6 py-2 h-auto text-white bg-primary-600 hover:bg-primary-700">
                        <Camera className="h-5 w-5 mr-2" />
                        Testar Minha Consulta
                    </Link>
                    <Link to="/tutorial" className="flex items-center border-gray-300 border-2  hover:bg-gray-300 rounded-xl text-lg px-6 py-2 h-auto">
                        <BookOpen className="h-5 w-5 mr-2" />
                        Ver Tutorial Completo

                    </Link>
                </div>

            </section>


        </div>
    )
}