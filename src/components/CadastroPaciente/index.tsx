import { useState, type FormEvent, type ChangeEvent } from 'react';
import { UserPlus, Loader2, User, Mail, FileText, Phone, Calendar, Users, HeartPulse } from 'lucide-react';
import { type TipoMedico } from '../../types/tipos.ts'; // Ajuste o caminho se necessário

const API_URL = import.meta.env.VITE_API_URL ?? 'https://auramed-backend-6yw9.onrender.com';

// Tipo formulário
type PatientFormData = {
  nome?: string; email?: string; cpf?: string; dataNascimento?: string; genero?: string; telefone?: string;
  nrCartaoSUS?: string;
  visionDifficulty?: string; usesGlasses?: string; hearingDifficulty?: string; usesHearingAid?: string; cognitiveDifficulty?: string;
  digitalSkills?: string; reminderChannel?: string; needsCaregiver?: string; previousTelehealth?: string;
};

interface Props {
  medico: TipoMedico | null;
  authToken: string | null;
  onPacienteCadastrado: () => void;
}

export default function CadastrarPaciente({ medico, authToken, onPacienteCadastrado }: Props) {
  const [newPatient, setNewPatient] = useState<PatientFormData>({});
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPatient(prev => ({ ...prev, [name]: value }));
  };
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPatient(prev => ({ ...prev, [name]: value }));
  };

  const handleFormClear = () => {
    setNewPatient({});
    setFormError(null);
    setFormSuccess(null);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoadingForm(true);
    setFormError(null);
    setFormSuccess(null);

    // --- Lógica de Limpeza ---
    const cleanNumeric = (value?: string) => value?.replace(/\D/g, '') || "";
    
    const cleanTelefone = cleanNumeric(newPatient.telefone);
    const cleanCpf = cleanNumeric(newPatient.cpf);
    const cleanSus = cleanNumeric(newPatient.nrCartaoSUS);
    
    // --- Validação Frontend ---
    if (!authToken || !medico) {
      setFormError("Sessão expirada. Faça login novamente.");
      setIsLoadingForm(false);
      return;
    }
    // Validação de campos obrigatórios
    if (
      !newPatient.nome || !cleanTelefone || !cleanSus || 
      !newPatient.digitalSkills || !newPatient.reminderChannel ||
      !newPatient.needsCaregiver || !newPatient.previousTelehealth
    ) {
      setFormError("Todos os campos marcados com (*) são obrigatórios.");
      setIsLoadingForm(false);
      return;
    }
    // Validação de regras da API
    if (cleanTelefone.length < 10 || cleanTelefone.length > 15) {
      setFormError(`Telefone inválido. Deve ter entre 10 e 15 dígitos (você enviou ${cleanTelefone.length}).`);
      setIsLoadingForm(false);
      return;
    }
    if (cleanSus.length !== 15) {
      setFormError(`Cartão SUS inválido. Deve ter exatamente 15 dígitos (você enviou ${cleanSus.length}).`);
      setIsLoadingForm(false);
      return;
    }
    if (cleanCpf && cleanCpf.length !== 11) {
      setFormError(`CPF inválido. Se preenchido, deve ter exatamente 11 dígitos (você enviou ${cleanCpf.length}).`);
      setIsLoadingForm(false);
      return;
    }
    
    // 1. Pessoa
    const pessoaPayload: any = {
      nome: newPatient.nome,
      telefone: cleanTelefone,
      tipoPessoa: "PACIENTE"
    };
    if (newPatient.email) pessoaPayload.email = newPatient.email;
    if (cleanCpf) pessoaPayload.cpf = cleanCpf;
    if (newPatient.dataNascimento) pessoaPayload.dataNascimento = newPatient.dataNascimento;
    if (newPatient.genero) pessoaPayload.genero = newPatient.genero;

    // 2. Info Teleconsulta (Obrigatório)
    const infoTeleconsultaPayload = {
      cdHabilidadeDigital: newPatient.digitalSkills,   
      cdCanalLembrete: newPatient.reminderChannel, 
      inPrecisaCuidador: newPatient.needsCaregiver,     
      inJaFezTele: newPatient.previousTelehealth
    };

    // 3. Perfil Cognitivo (Opcional)
    const perfilCognitivoPayload: any = {};
    if (newPatient.visionDifficulty) perfilCognitivoPayload.inDificuldadeVisao = newPatient.visionDifficulty;
    if (newPatient.usesGlasses) perfilCognitivoPayload.inUsaOculos = newPatient.usesGlasses;
    if (newPatient.hearingDifficulty) perfilCognitivoPayload.inDificuldadeAudicao = newPatient.hearingDifficulty;
    if (newPatient.usesHearingAid) perfilCognitivoPayload.inUsaAparelhoAud = newPatient.usesHearingAid;
    if (newPatient.cognitiveDifficulty) perfilCognitivoPayload.inDificuldadeCogn = newPatient.cognitiveDifficulty;

    // 4. corpo final da requisição
    const requestBody: any = {
      pessoa: pessoaPayload,
      paciente: {
        idMedicoResponsavel: medico.id,
        nrCartaoSUS: cleanSus
      },
      infoTeleconsulta: infoTeleconsultaPayload
    };

    // 5. Adiciona o perfilCognitivo SÓ se o usuário tiver selecionado alguma opção
    if (Object.keys(perfilCognitivoPayload).length > 0) {
      requestBody.perfilCognitivo = perfilCognitivoPayload;
    }

    // --- Lógica FETCH ---
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
          errorMessage += errorData.message || errorData.error || 'Não foi possível cadastrar.';
        } catch (jsonError) {
          errorMessage += errorResponseText || 'Resposta de erro inesperada do servidor.';
        }
        
        setFormError(errorMessage);
      }

    } catch (error) {
      console.error("Erro na requisição:", error);
      setFormError("Erro de rede. Não foi possível conectar ao servidor.");
    } finally {
      setIsLoadingForm(false);
    }
  };
  
  return (
    <div className="border bg-white rounded-lg shadow-sm border-gray-300">
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
        <form onSubmit={handleFormSubmit} className="space-y-8">
          
          {/* SEÇÃO 1: INFORMAÇÕES PESSOAIS */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Informações Pessoais e Contato</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4" /> Nome Completo <span className="text-red-500">*</span>
                </label>
                <input type="text" name="nome" placeholder="João da Silva" required
                  value={newPatient.nome || ""} onChange={handleFormChange}
                  className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Telefone <span className="text-red-500">*</span>
                </label>
                <input type="tel" name="telefone" placeholder="11999998888" required
                  value={newPatient.telefone || ""} onChange={handleFormChange}
                  className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> E-mail (Opcional)
                </label>
                <input type="email" name="email" placeholder="joao.silva@email.com"
                  value={newPatient.email || ""} onChange={handleFormChange}
                  className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <HeartPulse className="w-4 h-4" /> Nr. Cartão SUS <span className="text-red-500">*</span>
                </label>
                <input type="text" name="nrCartaoSUS" placeholder="15 dígitos numéricos" required maxLength={15}
                  value={newPatient.nrCartaoSUS || ""} onChange={handleFormChange}
                  className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> CPF (Opcional)
                </label>
                <input type="text" name="cpf" placeholder="11 dígitos" maxLength={11}
                  value={newPatient.cpf || ""} onChange={handleFormChange}
                  className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Data de Nascimento (Opcional)
                </label>
                <input type="date" name="dataNascimento"
                  value={newPatient.dataNascimento || ""} onChange={handleFormChange}
                  className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Gênero (Opcional)
                </label>
                <select name="genero" value={newPatient.genero || ""} onChange={handleFormChange}
                  className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
                  <option value="" disabled>Selecione</option>
                  <option value="M">Masculino</option><option value="F">Feminino</option><option value="O">Outro</option>
                </select>
              </div>
            </div>
          </div>

          {/* SEÇÃO 2: PERFIL COGNITIVO E ACESSIBILIDADE */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Perfil Cognitivo e Acessibilidade (Opcional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Dificuldades de visão?</label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2"><input type="radio" name="visionDifficulty" value="S" checked={newPatient.visionDifficulty === 'S'} onChange={handleRadioChange} className="form-radio" /><span>Sim</span></label>
                  <label className="flex items-center space-x-2"><input type="radio" name="visionDifficulty" value="N" checked={newPatient.visionDifficulty === 'N'} onChange={handleRadioChange} className="form-radio" /><span>Não</span></label>
                </div>
                {newPatient.visionDifficulty === "S" && (
                  <div className="ml-6 space-y-2">
                    <label className="text-sm font-medium text-gray-700">Usa óculos/lentes?</label>
                    <div className="flex gap-4">
                      <label className="flex items-center space-x-2"><input type="radio" name="usesGlasses" value="S" checked={newPatient.usesGlasses === 'S'} onChange={handleRadioChange} className="form-radio" /><span>Sim</span></label>
                      <label className="flex items-center space-x-2"><input type="radio" name="usesGlasses" value="N" checked={newPatient.usesGlasses === 'N'} onChange={handleRadioChange} className="form-radio" /><span>Não</span></label>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Dificuldades auditivas?</label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2"><input type="radio" name="hearingDifficulty" value="S" checked={newPatient.hearingDifficulty === 'S'} onChange={handleRadioChange} className="form-radio" /><span>Sim</span></label>
                  <label className="flex items-center space-x-2"><input type="radio" name="hearingDifficulty" value="N" checked={newPatient.hearingDifficulty === 'N'} onChange={handleRadioChange} className="form-radio" /><span>Não</span></label>
                </div>
                {newPatient.hearingDifficulty === "S" && (
                  <div className="ml-6 space-y-2">
                    <label className="text-sm font-medium text-gray-700">Usa aparelho auditivo?</label>
                    <div className="flex gap-4">
                      <label className="flex items-center space-x-2"><input type="radio" name="usesHearingAid" value="S" checked={newPatient.usesHearingAid === 'S'} onChange={handleRadioChange} className="form-radio" /><span>Sim</span></label>
                      <label className="flex items-center space-x-2"><input type="radio" name="usesHearingAid" value="N" checked={newPatient.usesHearingAid === 'N'} onChange={handleRadioChange} className="form-radio" /><span>Não</span></label>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Dificuldades cognitivas ou de memória?</label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2"><input type="radio" name="cognitiveDifficulty" value="S" checked={newPatient.cognitiveDifficulty === 'S'} onChange={handleRadioChange} className="form-radio" /><span>Sim</span></label>
                  <label className="flex items-center space-x-2"><input type="radio" name="cognitiveDifficulty" value="N" checked={newPatient.cognitiveDifficulty === 'N'} onChange={handleRadioChange} className="form-radio" /><span>Não</span></label>
                </div>
              </div>
            </div>
          </div>

          {/* SEÇÃO 3: TELECONSULTA */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Informações de Teleconsulta</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Habilidades digitais <span className="text-red-500">*</span>
              </label>
              <select name="digitalSkills" value={newPatient.digitalSkills || ""} onChange={handleFormChange} className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" required
              >
                <option value="" disabled>Selecione o nível</option>
                <option value="ALTA">Alta (Usa celular sozinho)</option>
                <option value="MEDIA">Média (Precisa de ajuda)</option>
                <option value="BAIXA">Baixa (Usa com dificuldade)</option>
                <option value="NENHUMA">Nenhuma (Não utiliza)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Preferência de canal para lembrete <span className="text-red-500">*</span>
              </label>
              <select name="reminderChannel" value={newPatient.reminderChannel || ""} onChange={handleFormChange} className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" required
              >
                <option value="" disabled>Selecione o canal</option>
                <option value="WHATSAPP">WhatsApp</option>
                <option value="SMS">SMS</option>
                <option value="TELEFONE">Ligação (Telefone)</option>
                <option value="EMAIL">E-mail</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Necessita de cuidador na consulta? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2"><input type="radio" name="needsCaregiver" value="S" checked={newPatient.needsCaregiver === 'S'} onChange={handleRadioChange} className="form-radio" required /><span>Sim</span></label>
                <label className="flex items-center space-x-2"><input type="radio" name="needsCaregiver" value="N" checked={newPatient.needsCaregiver === 'N'} onChange={handleRadioChange} className="form-radio" required /><span>Não</span></label>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Já realizou teleconsultas antes? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2"><input type="radio" name="previousTelehealth" value="S" checked={newPatient.previousTelehealth === 'S'} onChange={handleRadioChange} className="form-radio" required /><span>Sim</span></label>
                <label className="flex items-center space-x-2"><input type="radio" name="previousTelehealth" value="N" checked={newPatient.previousTelehealth === 'N'} onChange={handleRadioChange} className="form-radio" required /><span>Não</span></label>
              </div>
            </div>
            </div>
          </div>

          {/* BOTÕES DE AÇÃO */}
          <div className="flex gap-4 pt-6 border-t">
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