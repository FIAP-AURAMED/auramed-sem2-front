import { useState, useEffect } from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';
import { type TipoMedico } from '../../types/tipos';

import ListaPacientes from '../../components/ListaPacientes';
import CadastrarPaciente from '../../components/CadastroPaciente';
import Relatorios from '../../components/Relatorios';
import Configuracoes from '../../components/Configuracoes';

export default function DashboardProfissional() {
  
  type Tab = 'listPatients' | 'addPatient' | 'reports' | 'settings';
  const [activeTab, setActiveTab] = useState<Tab>('listPatients');

  const [medico, setMedico] = useState<TipoMedico | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const medicoSalvo = localStorage.getItem('medico');

    if (token && medicoSalvo) {
      setAuthToken(token);
      try {
        const medicoObj: TipoMedico = JSON.parse(medicoSalvo);
        setMedico(medicoObj);
      } catch (e) {
        console.error("Erro ao carregar dados do médico", e);
        setAuthError("Não foi possível carregar dados do médico. Faça login novamente.");
      }
    } else {
      setAuthError("Sessão não encontrada. Faça login novamente.");
    }
    setIsLoading(false);
  }, []);

  const handlePacienteCadastrado = () => {
    setActiveTab('listPatients');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
      </div>
    );
  }

  if (authError) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center px-4">
         <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
         <h3 className="text-xl font-semibold text-tx-primary">Erro de Autenticação</h3>
         <p className="text-tx-secondary mt-2">{authError}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg border border-gray-300">
        <button 
          onClick={() => setActiveTab('listPatients')} 
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'listPatients' 
              ? 'bg-white text-gray-900 shadow' 
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          Lista de Pacientes
        </button>
        <button 
          onClick={() => setActiveTab('addPatient')} 
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'addPatient' 
              ? 'bg-white text-gray-900 shadow' 
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          Cadastrar Paciente
        </button>
        <button 
          onClick={() => setActiveTab('reports')} 
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'reports' 
              ? 'bg-white text-gray-900 shadow' 
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          Relatórios
        </button>
        <button 
          onClick={() => setActiveTab('settings')} 
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'settings' 
              ? 'bg-white text-gray-900 shadow' 
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          Configurações
        </button>
      </div>

      <div className="mt-6">
        {activeTab === 'listPatients' && (
          <ListaPacientes authToken={authToken} />
        )}
        
        {activeTab === 'addPatient' && (
          <CadastrarPaciente 
            medico={medico} 
            authToken={authToken} 
            onPacienteCadastrado={handlePacienteCadastrado} 
          />
        )}
        
        {activeTab === 'reports' && (
          <Relatorios />
        )}
        
        {activeTab === 'settings' && (
          <Configuracoes medico={medico} />
        )}
      </div>
    </div>
  );
}