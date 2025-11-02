import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { User, ClipboardList, AlertTriangle, LogOut, Loader2 } from 'lucide-react';
import logo from '../../assets/logo.png';

interface TipoProfissional {
    id: number;
    pessoa: {
        id: number;
        nome: string | null;
        email: string | null;
        cpf: string | null;
    };
    crm: string;
}

//const API_URL = import.meta.env.VITE_API_URL;

export default function DashboardProfissional() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [professional, setProfessional] = useState<TipoProfissional | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const medicoSalvo = localStorage.getItem('medico');

        if (!token || !medicoSalvo) {
            setError('Acesso negado. Faça login novamente.');
            setIsLoading(false);
            setTimeout(() => navigate('/login-profissional'), 2000); 
            return;
        }

        const fetchProfessionalData = async () => {
            try {
                const medico: TipoProfissional = JSON.parse(medicoSalvo);
                
                if (medico.id.toString() !== id) {
                    throw new Error('Você não tem permissão para ver esta página.');
                }
                
                setProfessional(medico);
                document.title = `AuraMed | ${medico.pessoa.nome || 'Profissional'}`;

            } catch (err: any) {
                setError(err.message || 'Ocorreu um erro.');
                document.title = 'AuraMed | Erro';
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchProfessionalData();
        }

        return () => {
            document.title = 'AuraMed';
        };
    }, [id, navigate]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-100">
                <Loader2 className="w-16 h-16 text-primary-600 animate-spin mb-4" />
                <h1 className="text-2xl font-bold text-tx-primary">Carregando...</h1>
            </div>
        );
    }

    if (error || !professional) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-100">
                <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
                <h1 className="text-3xl font-bold text-tx-primary">Erro ao Carregar</h1>
                <p className="text-lg text-tx-secondary mt-2">{error}</p>
                <Link to="/" className="mt-6 text-primary-600 hover:underline font-semibold">Voltar para a página inicial</Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <aside className="w-full h-30 bg-white text-gray-800 p-4 flex justify-between items-center shadow-lg">
                <img src={logo} alt="AuraMed Logo" className=" w-20 lg:w-35" />
                <div>
                    <Link to="/" className="flex items-center gap-3 rounded-md p-2 hover:bg-primary-700 hover:text-white">
                        <LogOut className="w-5 h-5" />
                        Sair
                    </Link>
                </div>
            </aside>

            <main className="flex-1 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-tx-primary">
                        Bem-vindo(a), {professional.pessoa.nome}
                    </h1>
                    <p className="text-lg text-tx-secondary">CRM: {professional.crm}</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md border-2 border-gray-200">
                        <User className="w-8 h-8 text-primary-600 mb-4" />
                        <h2 className="text-xl font-semibold text-tx-primary">Gerenciar Pacientes</h2>
                        <p className="text-tx-secondary mt-2">Adicione novos pacientes e visualize o histórico de consultas.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border-2 border-gray-200">
                        <ClipboardList className="w-8 h-8 text-primary-600 mb-4" />
                        <h2 className="text-xl font-semibold text-tx-primary">Relatórios</h2>
                        <p className="text-tx-secondary mt-2">Acesse relatórios de absenteísmo e preparação.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}