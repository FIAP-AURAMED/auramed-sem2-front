import { useState, useEffect } from 'react';
import { Loader2, Save, X } from 'lucide-react';
import { type TipoPacienteCompleto } from '../../types/tipos.ts';
import FormularioPaciente from '../FormReutilizavel/index.tsx';



const API_URL = import.meta.env.VITE_API_URL ?? 'https://auramed-backend-6yw9.onrender.com';

interface Props {
  mode: 'view' | 'edit';
  pacienteId: number;
  authToken: string | null;
  onClose: () => void;
  onSave: () => void;
}

// Tipo para o formulário
type PatientFormData = {
  pessoa?: any;
  paciente?: any;
  infoTeleconsulta?: any | null;
  perfilCognitivo?: any | null;
};

export default function PacienteModal({ mode, pacienteId, authToken, onClose, onSave }: Props) {
  const [pacienteData, setPacienteData] = useState<PatientFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isReadOnly = mode === 'view';
  const modalTitle = isReadOnly ? "Visualizar Paciente" : "Editar Paciente";

  // 1. Busca os dados completos do paciente ao abrir o modal
  useEffect(() => {
    if (!pacienteId || !authToken) {
      setError("ID do Paciente ou Token não fornecido.");
      setIsLoading(false);
      return;
    }

    const fetchPaciente = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/pacientes-completo/${pacienteId}`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: Não foi possível buscar o paciente.`);
        }
        const data: TipoPacienteCompleto = await response.json();
        setPacienteData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPaciente();
  }, [pacienteId, authToken]); 

  // 2. Handler para atualizar o estado aninhado
  const handleFormChange = (
    section: 'pessoa' | 'paciente' | 'infoTeleconsulta' | 'perfilCognitivo', 
    name: string, 
    value: string
  ) => {
    setPacienteData(prev => {
      if (!prev) return null;
      
      const currentSection = prev[section];
      
      
      const updatedSection = currentSection 
        ? { ...currentSection, [name]: value }
        : { [name]: value };

      return {
        ...prev,
        [section]: updatedSection
      };
    });
  };

  // 3. Handler para salvar as 4 partes do formulário
  const handleSave = async () => {
    if (!pacienteData || !authToken) {
      setError("Dados do paciente ou token estão ausentes.");
      return;
    }

    setIsSaving(true);
    setError(null);

    // Limpa dados numéricos (igual ao cadastro)
    const cleanNumeric = (value?: string) => value?.replace(/\D/g, '') || null;
    
    // Prepara os 4 payloads de atualização
    const pessoaPayload = {
      ...pacienteData.pessoa,
      telefone: cleanNumeric(pacienteData.pessoa?.telefone),
      cpf: cleanNumeric(pacienteData.pessoa?.cpf),
    };
    const pacientePayload = {
      ...pacienteData.paciente,
      nrCartaoSUS: cleanNumeric(pacienteData.paciente?.nrCartaoSUS)
    };
    const infoTelePayload = pacienteData.infoTeleconsulta;
    const perfilCognitivoPayload = pacienteData.perfilCognitivo;

    // IDs necessários para os endpoints PUT
    const pID = pacienteData.pessoa.id; 
    const infoTeleID = pacienteData.infoTeleconsulta?.idInfoTeleconsulta;
    const perfilCognID = pacienteData.perfilCognitivo?.idPerfilCognitivo;
    
    try {
    
      const requests = [
        
        fetch(`${API_URL}/pessoas/${pID}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
          body: JSON.stringify(pessoaPayload)
        }),
        
        fetch(`${API_URL}/pacientes/${pID}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
          body: JSON.stringify(pacientePayload)
        })
      ];


      if (infoTeleID && infoTelePayload) {
        requests.push(fetch(`${API_URL}/info-teleconsulta/${infoTeleID}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
          body: JSON.stringify(infoTelePayload)
        }));
      }


      if (perfilCognID && perfilCognitivoPayload) {
        requests.push(fetch(`${API_URL}/perfil-cognitivo/${perfilCognID}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
          body: JSON.stringify(perfilCognitivoPayload)
        }));
      }

      const responses = await Promise.all(requests);

      const failedResponse = responses.find(res => !res.ok);
      if (failedResponse) {
        throw new Error(`Erro ${failedResponse.status} ao salvar dados.`);
      }

      
      alert("Paciente atualizado com sucesso!");
      onSave(); 
      onClose(); 

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black  p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
       
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{modalTitle}</h2>
          <button onClick={onClose} disabled={isSaving} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        
        <div className="p-6 overflow-y-auto">
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
              <strong className="font-bold">Erro! </strong>
              <span className="block">{error}</span>
            </div>
          )}

          {!isLoading && !error && pacienteData && (
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <FormularioPaciente
                formData={pacienteData}
                onFormChange={handleFormChange}
                isReadOnly={isReadOnly}
              />
            </form>
          )}
        </div>

        <div className="flex justify-end items-center p-6 border-t gap-4">
          <button 
            type="button" 
            onClick={onClose} 
            disabled={isSaving}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Fechar
          </button>
          {!isReadOnly && (
            <button 
              type="button" 
              onClick={handleSave} 
              disabled={isSaving}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              <span className="ml-2">{isSaving ? 'Salvando...' : 'Salvar Alterações'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}