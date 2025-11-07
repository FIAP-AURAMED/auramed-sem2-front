import { useState, type FormEvent } from 'react';
import { UserPlus, Loader2 } from 'lucide-react';
import { type TipoMedico } from '../../types/tipos.ts'; 
import FormularioPaciente from '../FormReutilizavel/index.tsx';


const API_URL = import.meta.env.VITE_API_URL ?? 'https://auramed-backend-6yw9.onrender.com';

// Tipo para o formulário
type PatientFormData = {
  pessoa?: any;
  paciente?: any;
  infoTeleconsulta?: any | null;
  perfilCognitivo?: any | null;
};

const initialState: PatientFormData = {
  pessoa: {
    tipoPessoa: "PACIENTE"
  },
  paciente: {},
  infoTeleconsulta: {},
  perfilCognitivo: {}
};

interface Props {
  medico: TipoMedico | null;
  authToken: string | null;
  onPacienteCadastrado: () => void;
}

export default function CadastrarPaciente({ medico, authToken, onPacienteCadastrado }: Props) {
  const [newPatient, setNewPatient] = useState<PatientFormData>(initialState);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  
  // Handler para atualizar o estado aninhado
  const handleFormChange = (
    section: 'pessoa' | 'paciente' | 'infoTeleconsulta' | 'perfilCognitivo', 
    name: string, 
    value: string
  ) => {
    setNewPatient(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}), 
        [name]: value
      }
    }));
  };

  const handleFormClear = () => {
    setNewPatient(initialState);
    setFormError(null);
    setFormSuccess(null);
  };

  // Handler para enviar o formulário
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoadingForm(true);
    setFormError(null);
    setFormSuccess(null);

    const cleanNumeric = (value?: string) => value?.replace(/\D/g, '') || "";
    
    // Validações
    if (!authToken || !medico) {
      setFormError("Sessão expirada. Faça login novamente."); 
      setIsLoadingForm(false); 
      return;
    }
    if (!newPatient.pessoa?.nome || !newPatient.pessoa?.telefone || !newPatient.paciente?.nrCartaoSUS) {
      setFormError("Campos obrigatórios (*) não preenchidos: Nome, Telefone ou Cartão SUS."); 
      setIsLoadingForm(false); 
      return;
    }
    
    const cleanTelefone = cleanNumeric(newPatient.pessoa.telefone);
    const cleanSus = cleanNumeric(newPatient.paciente.nrCartaoSUS);
    const cleanCpf = cleanNumeric(newPatient.pessoa.cpf);

    if (cleanTelefone.length < 10 || cleanTelefone.length > 15) {
      setFormError(`Telefone inválido. Deve ter entre 10 e 15 dígitos.`);
      setIsLoadingForm(false);
      return;
    }
    if (cleanSus.length !== 15) {
      setFormError(`Cartão SUS inválido. Deve ter exatamente 15 dígitos.`);
      setIsLoadingForm(false);
      return;
    }
    if (cleanCpf && cleanCpf.length !== 11) {
      setFormError(`CPF inválido. Se preenchido, deve ter exatamente 11 dígitos.`);
      setIsLoadingForm(false);
      return;
    }
    
    const requestBody = {
      pessoa: {
        ...newPatient.pessoa,
        telefone: cleanTelefone,
        cpf: cleanCpf || null,
      },
      paciente: {
        ...newPatient.paciente,
        idMedicoResponsavel: medico.id,
        nrCartaoSUS: cleanSus,
      },
      ...(Object.keys(newPatient.infoTeleconsulta || {}).length > 0 && { infoTeleconsulta: newPatient.infoTeleconsulta }),
      ...(Object.keys(newPatient.perfilCognitivo || {}).length > 0 && { perfilCognitivo: newPatient.perfilCognitivo }),
    };

    // --- Lógica de FETCH (POST) ---
    try {
      const response = await fetch(`${API_URL}/pacientes-completo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(requestBody)
      });

      if (response.status === 201) {
        setFormSuccess("Paciente cadastrado com sucesso!");
        handleFormClear();
        onPacienteCadastrado();
      } else {
        const errorResponseText = await response.text();
        let errorMessage = `Erro ${response.status}: `;
        try {
          const errorData = JSON.parse(errorResponseText);
          errorMessage += errorData.message || 'Não foi possível cadastrar.';
        } catch (jsonError) {
          errorMessage += errorResponseText || 'Resposta inesperada.';
        }
        setFormError(errorMessage);
      }
    } catch (error: any) {
      setFormError("Erro de rede: " + error.message);
    } finally {
      setIsLoadingForm(false);
    }
  };
  
  return (
    <div className="border bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900">Cadastrar Novo Paciente</h2>
      </div>
      
      {formError && (
        <div className="mx-6 mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erro! </strong>
          <span className="block sm:inline">{formError}</span>
        </div>
      )}
      {formSuccess && (
        <div className="mx-6 mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Sucesso! </strong>
          <span className="block sm:inline">{formSuccess}</span>
        </div>
      )}
      
      <div className="p-6 pt-0">
        <form onSubmit={handleFormSubmit}>
          
          <FormularioPaciente
            formData={newPatient}
            onFormChange={handleFormChange}
            mode="create"
            isDisabled={isLoadingForm}
          />

          <div className="flex gap-4 pt-6 border-t mt-8">
            <button type="submit" disabled={isLoadingForm} className="inline-flex items-center justify-center flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoadingForm ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <UserPlus className="h-4 w-4 mr-2" />}
              {isLoadingForm ? 'Cadastrando...' : 'Cadastrar Paciente'}
            </button>
            <button type="button" onClick={handleFormClear} disabled={isLoadingForm} className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50">
              Limpar Formulário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
