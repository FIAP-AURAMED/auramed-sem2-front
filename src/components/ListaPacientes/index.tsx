import { useState, useEffect } from 'react';
import { Loader2, Eye, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { type TipoPacienteCompleto } from '../../types/tipos.ts';
import PacienteModal from '../ModalPaciente/index.tsx';


const API_URL = import.meta.env.VITE_API_URL ?? 'https://auramed-backend-6yw9.onrender.com';

interface Props {
  authToken: string | null;
}

export default function ListaPacientes({ authToken }: Props) {
  const [patientList, setPatientList] = useState<TipoPacienteCompleto[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  // --- NOVO ESTADO PARA O MODAL ---
  const [modalMode, setModalMode] = useState<'view' | 'edit' | null>(null);
  const [selectedPacienteId, setSelectedPacienteId] = useState<number | null>(null);
  // ---------------------------------

  const fetchPatients = async (token: string) => {
    setIsLoadingList(true);
    setListError(null);
    try {
      const response = await fetch(`${API_URL}/pacientes-completo`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setPatientList(await response.json());
      } else {
        throw new Error(`Erro ${response.status}: Não foi possível buscar pacientes.`);
      }
    } catch (error: any) {
      setListError(error.message || "Erro de rede.");
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchPatients(authToken);
    } else {
      setListError("Autenticação não encontrada.");
      setIsLoadingList(false);
    }
  }, [authToken]);

  const handleViewPatient = (idPessoa: number) => {
    setSelectedPacienteId(idPessoa);
    setModalMode('view');
  };

  const handleEditPatient = (idPessoa: number) => {
    setSelectedPacienteId(idPessoa);
    setModalMode('edit');
  };
  
  const handleDeletePatient = async (idPessoa: number) => {
    if (!authToken || !window.confirm("Tem certeza?")) return;
    try {
      const response = await fetch(`${API_URL}/pacientes/${idPessoa}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (response.status === 204) {
        alert("Paciente excluído.");
        setPatientList(prev => prev.filter(p => p.pessoa.id !== idPessoa));
      } else {
        throw new Error("Falha ao excluir.");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  // --- NOVOS HANDLERS PARA O MODAL ---
  const handleCloseModal = () => {
    setModalMode(null);
    setSelectedPacienteId(null);
  };

  const handleSaveModal = () => {
    handleCloseModal();
    if (authToken) {
      fetchPatients(authToken);
    }
  };
  // -----------------------------------

  const renderStatusBadge = (ativo: string) => {
    const isAtivo = ativo === 'S';
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${
        isAtivo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {isAtivo ? 'Ativo' : 'Inativo'}
      </span>
    );
  };

  return (
    <> {/* Adiciona Fragment para o modal */}
      <div className="border bg-white rounded-lg shadow-sm border-gray-300">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900">Gerenciar Pacientes</h2>
        </div>
        {/* ... (Busca e Filtro) ... */}
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
                  onClick={() => authToken && fetchPatients(authToken)}
                  className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
                >
                  Tentar Novamente
                </button>
            </div>
          )}

          {!isLoadingList && !listError && (
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-400">
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
                  <tr key={paciente.pessoa.id} className="border-b  border-gray-400 hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{paciente.pessoa.nome}</td>
                    <td className="px-6 py-4 text-gray-700">{paciente.pessoa.cpf || '(Não inf.)'}</td>
                    <td className="px-6 py-4 text-gray-700">{paciente.pessoa.telefone}</td>
                    <td className="px-6 py-4">{renderStatusBadge(paciente.pessoa.ativo)}</td>
                    <td className="px-6 py-4 text-gray-700">(N/A)</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-3">
                        <button onClick={() => handleViewPatient(paciente.pessoa.id)} className="text-gray-500 hover:text-primary-600" title="Visualizar">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleEditPatient(paciente.pessoa.id)} className="text-gray-500 hover:text-blue-600" title="Editar">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDeletePatient(paciente.pessoa.id)} className="text-gray-500 hover:text-red-600" title="Excluir">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* --- RENDERIZA O MODAL --- */}
      {modalMode && selectedPacienteId && (
        <PacienteModal
          mode={modalMode}
          pacienteId={selectedPacienteId}
          authToken={authToken}
          onClose={handleCloseModal}
          onSave={handleSaveModal}
        />
      )}
    </>
  );
};
