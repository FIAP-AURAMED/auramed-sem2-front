import FaqItem from '../../components/FaqItem'; // Importe o novo componente

export default function CentralAjuda() {

    // Lista de perguntas e respostas
    const faqData = [
        {
            question: 'Como testo minha câmera e áudio?',
            answer: 'Navegue até a nossa página "Simulador". A ferramenta irá guiar você, passo a passo, para verificar se sua câmera, microfone e conexão com a internet estão prontos para a consulta.'
        },
        {
            question: 'O que devo fazer se a minha internet estiver lenta?',
            answer: 'Nosso simulador irá informar se a velocidade da sua conexão é suficiente. Caso não seja, recomendamos que você se aproxime do seu roteador Wi-Fi, feche outros aplicativos que possam estar usando a internet e, se possível, conecte seu computador diretamente ao roteador com um cabo de rede.'
        },
        {
            question: 'A plataforma AuraMed é segura?',
            answer: 'Sim, a segurança dos seus dados é nossa prioridade. Todo o processamento de vídeo e áudio para os testes é feito diretamente no seu navegador. Não armazenamos nenhuma imagem ou som em nossos servidores, garantindo sua total privacidade.'
        },
        {
            question: 'Preciso instalar algum programa?',
            answer: 'Não! A solução AuraMed funciona inteiramente no seu navegador de internet (como Google Chrome, Firefox ou Safari). Não é necessário baixar ou instalar nenhum software adicional.'
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <section className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-tx-primary">Central de Ajuda</h1>
                <p className="text-xl text-tx-secondary max-w-2xl mx-auto mt-4">
                    Encontre respostas para as perguntas mais comuns sobre a preparação para sua teleconsulta.
                </p>
            </section>

            <section className="max-w-3xl mx-auto">
                {/* Mapeia os dados do FAQ para o componente FaqItem */}
                {faqData.map((faq, index) => (
                    <FaqItem
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                    />
                ))}
            </section>
        </div>
    );
}