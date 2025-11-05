import { useEffect, useState } from 'react';
import FaqItem from '../../components/FaqItem';
import FormContato from '../../components/FormContato';
import { RefreshCw, TrendingUp, HelpCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

export default function CentralAjuda() {
    const [faqData, setFaqData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = 'AuraMed | Central de Ajuda';
        carregarPerguntasFrequentes();

        return () => {
            document.title = 'AuraMed';
        };
    }, []);

    const carregarPerguntasFrequentes = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(`${API_URL}/api/faq/perguntas-frequentes?limite=8`);

            if (!response.ok) {
                throw new Error('Erro ao carregar perguntas frequentes');
            }

            const data = await response.json();
            setFaqData(data);

        } catch (err) {
            console.error('Erro:', err);
            setError('Não foi possível carregar as perguntas frequentes. Usando perguntas padrão.');
            setFaqData(getPerguntasPadrao());
        } finally {
            setLoading(false);
        }
    };

    const getPerguntasPadrao = () => [
        {
            pergunta: 'Como agendar uma consulta?',
            resposta: 'Entre em contato pelo telefone (11) 5180-7800 ou através do nosso WhatsApp. Nossa equipe terá prazer em ajudar você!',
            frequencia: 1,
            categoria: 'AGENDAMENTO'
        },
        {
            pergunta: 'Quais são os horários de funcionamento?',
            resposta: 'O IMREA funciona de segunda a sábado, das 7h às 19h. Aos domingos e feriados estamos fechados.',
            frequencia: 1,
            categoria: 'INFORMACAO'
        },
        {
            pergunta: 'Vocês fazem teleconsultas?',
            resposta: 'Sim! Oferecemos atendimento por telemedicina. Você precisa de um dispositivo com câmera, microfone e conexão com internet.',
            frequencia: 1,
            categoria: 'TELECONSULTA'
        },
        {
            pergunta: 'Quais documentos preciso levar?',
            resposta: 'Para a consulta, tenha em mãos: RG, CPF, Cartão do SUS e exames recentes se tiver.',
            frequencia: 1,
            categoria: 'DOCUMENTACAO'
        }
    ];

    const getCategoriaColor = (categoria) => {
        const cores = {
            'AGENDAMENTO': 'bg-blue-100 text-blue-800',
            'TELECONSULTA': 'bg-green-100 text-green-800',
            'INFORMACAO': 'bg-purple-100 text-purple-800',
            'DOCUMENTACAO': 'bg-orange-100 text-orange-800',
            'GERAL': 'bg-gray-100 text-gray-800'
        };
        return cores[categoria] || cores['GERAL'];
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <section className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <HelpCircle className="w-8 h-8 text-primary-600" />
                    <h1 className="text-4xl md:text-5xl font-bold text-tx-primary">Central de Ajuda</h1>
                </div>
                <p className="text-xl text-tx-secondary max-w-2xl mx-auto mt-4">
                    Perguntas mais frequentes dos nossos pacientes
                </p>

                <div className="flex items-center justify-center gap-4 mt-6">
                    <button
                        onClick={carregarPerguntasFrequentes}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        {loading ? 'Atualizando...' : 'Atualizar FAQ'}
                    </button>

                    <div className="flex items-center gap-2 text-sm text-tx-secondary">
                        <TrendingUp className="w-4 h-4" />
                        <span>Baseado nas perguntas reais dos pacientes</span>
                    </div>
                </div>
            </section>

            {error && (
                <div className="max-w-3xl mx-auto mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 text-sm">{error}</p>
                </div>
            )}

            <section className="max-w-3xl mx-auto">
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-tx-secondary text-center">
                                📊 Mostrando as {faqData.length} perguntas mais frequentes
                            </p>
                        </div>

                        {faqData.map((faq, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-xs font-bold">
                                        #{index + 1}
                                    </span>
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                                        {faq.categoria}
                                    </span>
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                        {faq.frequencia} {faq.frequencia === 1 ? 'pergunta' : 'perguntas'}
                                    </span>
                                </div>
                                <FaqItem
                                    question={faq.pergunta}
                                    answer={faq.resposta}
                                />
                            </div>
                        ))}
                    </>
                )}
            </section>

            <section className="mt-16">
                <FormContato />
            </section>
        </div>
    );
}