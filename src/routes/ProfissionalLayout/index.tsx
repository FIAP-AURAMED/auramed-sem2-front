import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, ClipboardList, AlertTriangle, LogOut } from 'lucide-react';
import logo from '../../assets/logo.png';

import { listaProfissionais } from '../../data/listaProfissionais';
import type { TipoProfissional } from '../../types/TipoProfissional';

export default function DashboardProfissional() {

    const { id } = useParams<{ id: string }>();
    const [professional, setProfessional] = useState<TipoProfissional | null>(null);

    useEffect(() => {
        if (id) {
            const found = listaProfissionais.find(p => p.id === parseInt(id, 10));
            if (found) {
                setProfessional(found);
                document.title = `AuraMed | ${found.nome}`;
            } else {
                setProfessional(null);
                document.title = 'AuraMed | Erro';
            }
        }
        return () => {
            document.title = 'AuraMed';
        };
    }, [id]);

    if (!professional) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-100">
                <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
                <h1 className="text-3xl font-bold text-tx-primary">Profissional Não Encontrado</h1>
                <p className="text-lg text-tx-secondary mt-2">O ID fornecido não corresponde a nenhum profissional cadastrado.</p>
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
                        Bem-vindo(a), {professional.nome}
                    </h1>
                    <p className="text-lg text-tx-secondary">ID: {professional.id}</p>
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