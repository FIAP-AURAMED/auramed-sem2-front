import { useState, useEffect } from 'react';
import { Loader2, Search, Filter, Eye, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { type TipoMedico, type TipoPacienteLista } from '../../types/tipos.ts';

// URL da API
const API_URL = import.meta.env.VITE_API_URL ?? 'https://auramed-backend-6yw9.onrender.com';

interface Props {
  medico: TipoMedico | null;
  authToken: string | null;
}

export default function ListaPacientes({ medico, authToken }: Props) {
  const [patientList, setPatientList] = useState<TipoPacienteLista[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  useEffect(() => {
    if (medico && authToken) {
      fetchPatients(medico.id, authToken);
    } else {
      setListError("Dados de autenticação não encontrados.");
      setIsLoadingList(false);
    }
  }, [medico, authToken]);

  const fetchPatients = async (medicoId: number, token: string) => {
    setIsLoadingList(true);
    setListError(null);
    try {
      const response = await fetch(`${API_URL}/pacientes/medico/${medicoId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setPatientList(data);
      } else {
        throw new Error(`Erro ${response.status}: Não foi possível buscar pacientes.`);
      }
    } catch (error: any) {
      console.error("Erro ao buscar pacientes:", error);
      setListError(error.message || "Erro de rede ao buscar pacientes.");
    } finally {
      setIsLoadingList(false);
    }
  };

  // Handlers de Ação (Placeholder)
  const handleViewPatient = (id: number) => alert(`Ação: Ver paciente ${id} (Não implementado)`);
  const handleEditPatient = (id: number) => alert(`Ação: Editar paciente ${id} (Não implementado)`);
  const handleDeletePatient = (id: number) => alert(`Ação: Excluir paciente ${id} (Não implementado)`);


  return (
    <div className="border bg-white rounded-lg border-gray-300 shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900">Gerenciar Pacientes</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 px-6 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="search" placeholder="Buscar por nome ou CPF..."
            className="h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm" />
        </div>
        <div className="relative w-full md:w-48">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select className="h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm appearance-none">
            <option value="todos">Todos os Status</option>
            <option value="preparado">Preparado</option>
            <option value="pendente">Pendente</option>
            <option value="nao-preparado">Não Preparado</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        {isLoadingList && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
          </div>
        )}
        
        {listError && (
           <div className="flex flex-col items-center justify-center h-64 text-center px-4">
              <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-tx-primary">Erro ao carregar</h3>
              <p className="text-tx-secondary mt-2">{listError}</p>
              <button 
                onClick={() => medico && authToken && fetchPatients(medico.id, authToken)}
                className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
              >
                Tentar Novamente
              </button>
           </div>
        )}

        {!isLoadingList && !listError && (
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-600">Nome</th>
                <th className="px-6 py-3 font-medium text-gray-600">CPF</th>
                <th className="px-6 py-3 font-medium text-gray-600">Telefone</th>
                <th className="px-6 py-3 font-medium text-gray-600">Status</th>
                <th className="px-6 py-3 font-medium text-gray-600">Próxima Consulta</th>
                <th className="px-6 py-3 font-medium text-gray-600 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
                {patientList.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-gray-500">
                      Nenhum paciente encontrado.
                    </td>
                  </tr>
                )}
                
                {patientList.map((paciente) => (
                  <tr key={paciente.idPessoa} className="border-b hover:bg-gray-50">
                    
                    <td className="px-6 py-4 font-medium text-gray-900">
                      (Nome não enviado pela API) <br/> 
                      <span className="text-xs text-gray-500">ID Pessoa: {paciente.idPessoa}</span>
                    </td>
                    
                    <td className="px-6 py-4 text-gray-700">
                      (CPF não enviado pela API) <br/>
                      <span className="text-xs text-gray-500">SUS: {paciente.nrCartaoSUS}</span>
                    </td>
                    
                    <td className="px-6 py-4 text-gray-700">
                      (Telefone não enviado pela API)
                    </td>

                    <td className="px-6 py-4">
                      {paciente.ativo === 'S' ? 
                        <span className="px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">Ativo</span> :
                        <span className="px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">Inativo</span>
                      }
                    </td>
                    
                    <td className="px-6 py-4 text-gray-700">
                      (Consulta não enviada pela API)
                    </td>
                    
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-3">
                        <button onClick={() => handleViewPatient(paciente.idPessoa)} className="text-gray-500 hover:text-primary-600" title="Visualizar"><Eye className="w-5 h-5" /></button>
                        <button onClick={() => handleEditPatient(paciente.idPessoa)} className="text-gray-500 hover:text-blue-600" title="Editar"><Edit className="w-5 h-5" /></button>
                        <button onClick={() => handleDeletePatient(paciente.idPessoa)} className="text-gray-500 hover:text-red-600" title="Excluir"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>
        )}
      </div>
    </div>
  );
};