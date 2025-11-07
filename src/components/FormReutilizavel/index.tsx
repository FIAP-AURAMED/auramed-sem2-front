import { type ChangeEvent } from 'react';
import { User, Mail, FileText, Phone, Calendar, Users, HeartPulse } from 'lucide-react';

type PatientFormData = {
  pessoa?: any;
  paciente?: any;
  infoTeleconsulta?: any | null;
  perfilCognitivo?: any | null;
};

interface Props {
  formData: PatientFormData;
  onFormChange: (section: 'pessoa' | 'paciente' | 'infoTeleconsulta' | 'perfilCognitivo', name: string, value: string) => void;
  mode: 'create' | 'view' | 'edit';
  isDisabled: boolean;
}

const createChangeHandler = (section: 'pessoa' | 'paciente' | 'infoTeleconsulta' | 'perfilCognitivo', onFormChange: Props['onFormChange']) => 
  (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onFormChange(section, e.target.name, e.target.value);
};

export default function FormularioPaciente({ formData, onFormChange, mode, isDisabled }: Props) {
  
  const handlePessoaChange = createChangeHandler('pessoa', onFormChange);
  const handlePacienteChange = createChangeHandler('paciente', onFormChange);
  const handleTeleconsultaChange = createChangeHandler('infoTeleconsulta', onFormChange);
  const handleCognitivoChange = createChangeHandler('perfilCognitivo', onFormChange);
  
  const pessoa = formData.pessoa || {};
  const paciente = formData.paciente || {};
  const infoTeleconsulta = formData.infoTeleconsulta || {};
  const perfilCognitivo = formData.perfilCognitivo || {};

  const isViewOnly = mode === 'view';
  
  const isFieldDisabled = isViewOnly || isDisabled;
  
  const isKeyFieldDisabled = mode !== 'create' || isDisabled;

  return (
    <div className="space-y-8">
      {/* SEÇÃO 1: INFORMAÇÕES PESSOAIS */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Informações Pessoais e Contato</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User className="w-4 h-4" /> Nome Completo <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" name="nome" placeholder="João da Silva" required
              value={pessoa.nome || ""} 
              onChange={handlePessoaChange}
              readOnly={isFieldDisabled} 
              className={`h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm ${isFieldDisabled ? 'bg-gray-100' : 'bg-white'}`}
            />
          </div>
         
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Phone className="w-4 h-4" /> Telefone <span className="text-red-500">*</span>
            </label>
            <input 
              type="tel" name="telefone" placeholder="11999998888" required
              value={pessoa.telefone || ""} 
              onChange={handlePessoaChange}
              readOnly={isFieldDisabled}
              className={`h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm ${isFieldDisabled ? 'bg-gray-100' : 'bg-white'}`}
            />
          </div>
 
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Mail className="w-4 h-4" /> E-mail (Opcional)
            </label>
            <input 
              type="email" name="email" placeholder="joao.silva@email.com"
              value={pessoa.email || ""} 
              onChange={handlePessoaChange}
              readOnly={isFieldDisabled} 
              className={`h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm ${isFieldDisabled ? 'bg-gray-100' : 'bg-white'}`}
            />
          </div>
          
          {/* Cartão SUS */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <HeartPulse className="w-4 h-4" /> Nr. Cartão SUS <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" name="nrCartaoSUS" placeholder="15 dígitos numéricos" required maxLength={15}
              value={paciente.nrCartaoSUS || ""} 
              onChange={handlePacienteChange}
              readOnly={isKeyFieldDisabled} 
              className={`h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm ${isKeyFieldDisabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
            />
          </div>
          
          {/*  CAMPO-CHAVE: CPF  */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4" /> CPF (Opcional)
            </label>
            <input 
              type="text" name="cpf" placeholder="11 dígitos" maxLength={11}
              value={pessoa.cpf || ""} 
              onChange={handlePessoaChange}
              readOnly={isKeyFieldDisabled} 
              className={`h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm ${isKeyFieldDisabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
            />
          </div>
          
          {/* Data de Nascimento (Opcional) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Data de Nascimento (Opcional)
            </label>
            <input 
              type="date" name="dataNascimento"
              value={pessoa.dataNascimento || ""} 
              onChange={handlePessoaChange}
              readOnly={isFieldDisabled} 
              className={`h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm ${isFieldDisabled ? 'bg-gray-100' : 'bg-white'}`}
            />
          </div>
          {/* Gênero (Opcional) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Users className="w-4 h-4" /> Gênero (Opcional)
            </label>
            <select 
              name="genero" 
              value={pessoa.genero || ""} 
              onChange={handlePessoaChange}
              disabled={isFieldDisabled} 
              className={`h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm ${isFieldDisabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
            >
              <option value="">Não informar</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
          </div>
        </div>
      </div>

      {/* SEÇÃO 2: PERFIL COGNITIVO (Tudo Opcional) */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Perfil Cognitivo e Acessibilidade (Opcional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Dificuldades de visão?</label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2"><input type="radio" name="inDificuldadeVisao" value="S" checked={perfilCognitivo.inDificuldadeVisao === 'S'} onChange={handleCognitivoChange} disabled={isFieldDisabled} className="form-radio" /><span>Sim</span></label>
              <label className="flex items-center space-x-2"><input type="radio" name="inDificuldadeVisao" value="N" checked={perfilCognitivo.inDificuldadeVisao === 'N'} onChange={handleCognitivoChange} disabled={isFieldDisabled} className="form-radio" /><span>Não</span></label>
            </div>
            {perfilCognitivo.inDificuldadeVisao === "S" && (
              <div className="ml-6 space-y-2">
                <label className="text-sm font-medium text-gray-700">Usa óculos/lentes?</label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2"><input type="radio" name="inUsaOculos" value="S" checked={perfilCognitivo.inUsaOculos === 'S'} onChange={handleCognitivoChange} disabled={isFieldDisabled} className="form-radio" /><span>Sim</span></label>
                  <label className="flex items-center space-x-2"><input type="radio" name="inUsaOculos" value="N" checked={perfilCognitivo.inUsaOculos === 'N'} onChange={handleCognitivoChange} disabled={isFieldDisabled} className="form-radio" /><span>Não</span></label>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Dificuldades auditivas?</label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2"><input type="radio" name="inDificuldadeAudicao" value="S" checked={perfilCognitivo.inDificuldadeAudicao === 'S'} onChange={handleCognitivoChange} disabled={isFieldDisabled} className="form-radio" /><span>Sim</span></label>
              <label className="flex items-center space-x-2"><input type="radio" name="inDificuldadeAudicao" value="N" checked={perfilCognitivo.inDificuldadeAudicao === 'N'} onChange={handleCognitivoChange} disabled={isFieldDisabled} className="form-radio" /><span>Não</span></label>
            </div>
            {perfilCognitivo.inDificuldadeAudicao === "S" && (
              <div className="ml-6 space-y-2">
                <label className="text-sm font-medium text-gray-700">Usa aparelho auditivo?</label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2"><input type="radio" name="inUsaAparelhoAud" value="S" checked={perfilCognitivo.inUsaAparelhoAud === 'S'} onChange={handleCognitivoChange} disabled={isFieldDisabled} className="form-radio" /><span>Sim</span></label>
                  <label className="flex items-center space-x-2"><input type="radio" name="inUsaAparelhoAud" value="N" checked={perfilCognitivo.inUsaAparelhoAud === 'N'} onChange={handleCognitivoChange} disabled={isFieldDisabled} className="form-radio" /><span>Não</span></label>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Dificuldades cognitivas ou de memória?</label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2"><input type="radio" name="inDificuldadeCogn" value="S" checked={perfilCognitivo.inDificuldadeCogn === 'S'} onChange={handleCognitivoChange} disabled={isFieldDisabled} className="form-radio" /><span>Sim</span></label>
              <label className="flex items-center space-x-2"><input type="radio" name="inDificuldadeCogn" value="N" checked={perfilCognitivo.inDificuldadeCogn === 'N'} onChange={handleCognitivoChange} disabled={isFieldDisabled} className="form-radio" /><span>Não</span></label>
            </div>
          </div>
        </div>
      </div>

      {/* SEÇÃO 3: TELECONSULTA (Tudo Opcional) */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Informações de Teleconsulta (Opcional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Habilidades digitais</label>
            <select 
              name="cdHabilidadeDigital" 
              value={infoTeleconsulta.cdHabilidadeDigital || ""} 
              onChange={handleTeleconsultaChange}
              disabled={isFieldDisabled} 
              className={`h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm ${isFieldDisabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
            >
              <option value="">Não informar</option>
              <option value="ALTA">Alta (Usa celular sozinho)</option>
              <option value="MEDIA">Média (Precisa de ajuda)</option>
              <option value="BAIXA">Baixa (Usa com dificuldade)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Preferência de canal para lembrete</label>
            <select 
              name="cdCanalLembrete" 
              value={infoTeleconsulta.cdCanalLembrete || ""} 
              onChange={handleTeleconsultaChange}
              disabled={isFieldDisabled} 
              className={`h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm ${isFieldDisabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
            >
              <option value="">Não informar</option>
              <option value="WHATSAPP">WhatsApp</option>
              <option value="SMS">SMS</option>
              <option value="TELEFONE">Ligação (Telefone)</option>
              <option value="EMAIL">E-mail</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Necessita de cuidador na consulta?</label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2"><input type="radio" name="inPrecisaCuidador" value="S" checked={infoTeleconsulta.inPrecisaCuidador === 'S'} onChange={handleTeleconsultaChange} disabled={isFieldDisabled} className="form-radio" /><span>Sim</span></label>
              <label className="flex items-center space-x-2"><input type="radio" name="inPrecisaCuidador" value="N" checked={infoTeleconsulta.inPrecisaCuidador === 'N'} onChange={handleTeleconsultaChange} disabled={isFieldDisabled} className="form-radio" /><span>Não</span></label>
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Já realizou teleconsultas antes?</label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2"><input type="radio" name="inJaFezTele" value="S" checked={infoTeleconsulta.inJaFezTele === 'S'} onChange={handleTeleconsultaChange} disabled={isFieldDisabled} className="form-radio" /><span>Sim</span></label>
              <label className="flex items-center space-x-2"><input type="radio" name="inJaFezTele" value="N" checked={infoTeleconsulta.inJaFezTele === 'N'} onChange={handleTeleconsultaChange} disabled={isFieldDisabled} className="form-radio" /><span>Não</span></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};