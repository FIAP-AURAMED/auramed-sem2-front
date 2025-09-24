// src/components/DashboardProfissional.tsx
import React, { useState } from 'react';
import { BarChart3, MessageSquare, HelpCircle, Download, UserPlus } from 'lucide-react';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// --- DEFINIÇÃO DE TIPOS E DADOS DE EXEMPLO ---
const digitalSkillsData = [
  { skill: 'Básico', count: 45 }, { skill: 'Intermediário', count: 82 }, { skill: 'Avançado', count: 35 },
];
const reminderChannelData = [
  { name: 'WhatsApp', value: 110, fill: '#C81051' }, { name: 'SMS', value: 30, fill: '#FFC107' },
  { name: 'E-mail', value: 15, fill: '#007BFF' }, { name: 'Ligação', value: 7, fill: '#000000' },
];
const accessibilityData = [
  { type: 'Visual', count: 18, total: 162 }, { type: 'Auditiva', count: 9, total: 162 }, { type: 'Motora', count: 25, total: 162 },
];
const faqData = [
  { question: 'Como agendar?', views: 150 }, { question: 'Esqueci a senha', views: 120 },
  { question: 'Como acessar?', views: 95 }, { question: 'Problemas c/ áudio', views: 50 },
];
const chatbotUsageData = [
  { month: 'Jan', usage: 200 }, { month: 'Fev', usage: 250 }, { month: 'Mar', usage: 230 }, { month: 'Abr', usage: 300 },
];
const unansweredQuestions = [
  "O convênio X é aceito?", "Posso remarcar para o mesmo dia?",
];
const mockProfessional = {
  name: 'Dr(a). Ana Silva', crm: '123456-SP', email: 'ana.silva@email.com', specialty: 'Cardiologia',
};

// 1. Tipo para o estado do formulário ATUALIZADO com todos os campos
type PatientFormData = {
  visionDifficulty?: string;
  usesGlasses?: string;
  hearingDifficulty?: string;
  usesHearingAid?: string;
  cognitiveDifficulty?: string;
  digitalSkills?: string;
  reminderChannel?: string;
  needsCaregiver?: string;
  previousTelehealth?: string;
  accessibilityNeeds?: string;
};

const DashboardProfissional: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reports' | 'settings' | 'addPatient'>('reports');
  const [newPatient, setNewPatient] = useState<PatientFormData>({});

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do novo paciente:", newPatient);
    alert("Paciente cadastrado! (verifique o console para ver os dados)");
  };

  const handleFormClear = () => {
    setNewPatient({});
  };

  return (
    <div className="w-full">
      {/* Botões para controlar as abas */}
      <div className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        <button onClick={() => setActiveTab('reports')} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'reports' ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
          Relatórios
        </button>
        <button onClick={() => setActiveTab('addPatient')} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'addPatient' ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
          Cadastrar Paciente
        </button>
        <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'settings' ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
          Configurações
        </button>
      </div>

      <div className="mt-6">
        {/* Conteúdo da Aba de Relatórios */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* Card 1: Prontidão e Acessibilidade */}
            <div className="border bg-white dark:bg-gray-900 dark:border-gray-800 rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
                  <BarChart3 className="h-6 w-6" />
                  Prontidão e Acessibilidade do Paciente
                </h2>
              </div>
              <div className="p-6 pt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200">Habilidades Digitais</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={digitalSkillsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="skill" fontSize={12} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#C81051" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200">Canal de Lembrete Preferido</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={reminderChannelData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                          {reminderChannelData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* SEÇÃO DE ACESSIBILIDADE ADICIONADA */}
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Dificuldades de Acessibilidade</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {accessibilityData.map((item, index) => {
                      const percentage = Math.round((item.count / item.total) * 100);
                      return (
                        <div key={index} className="p-4 border dark:border-gray-700 rounded-lg text-center space-y-2">
                          <h4 className="font-medium text-gray-700 dark:text-gray-300">{item.type}</h4>
                          <div className="text-2xl font-bold text-primary-600">{percentage}%</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{item.count} de {item.total}</div>
                          <div className="w-full bg-secondary-600/20 dark:bg-gray-700 rounded-full h-2.5">
                            <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Suporte e Engajamento */}
            <div className="border bg-white dark:bg-gray-900 dark:border-gray-800 rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
                  <MessageSquare className="h-6 w-6" />
                  Suporte e Engajamento
                </h2>
              </div>
              <div className="p-6 pt-0">
                {/* GRÁFICOS E LISTAS ADICIONADOS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200">FAQ Mais Acessados</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={faqData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="question" type="category" width={100} fontSize={12} />
                        <Tooltip />
                        <Bar dataKey="views" fill="#C81051" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200">Tendências de Uso do Chatbot</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chatbotUsageData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="usage" stroke="#ffc658" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-200">
                    <HelpCircle className="h-5 w-5" />
                    Principais Perguntas Não Respondidas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {unansweredQuestions.map((question, index) => (
                      <div key={index} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                        {question}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar Relatório de Acessibilidade
                    </button>
                    <button className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar Dados de Engajamento
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Conteúdo da Aba de Cadastro de Paciente */}
        {activeTab === 'addPatient' && (
          <div className="border bg-white dark:bg-gray-900 dark:border-gray-800 rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Cadastrar Novo Paciente</h2>
            </div>
            <div className="p-6 pt-0">
              <form onSubmit={handleFormSubmit} className="space-y-8">
                <div className="border-t dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Acessibilidade e Necessidades Especiais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">

                    {/* Dificuldades de visão */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Dificuldades de visão?</label>
                      <div className="flex gap-4"><label className="flex items-center space-x-2"><input type="radio" name="visionDifficulty" value="sim" checked={newPatient.visionDifficulty === 'sim'} onChange={(e) => setNewPatient({ ...newPatient, visionDifficulty: e.target.value })} className="form-radio" /><span>Sim</span></label><label className="flex items-center space-x-2"><input type="radio" name="visionDifficulty" value="não" checked={newPatient.visionDifficulty === 'não'} onChange={(e) => setNewPatient({ ...newPatient, visionDifficulty: e.target.value })} className="form-radio" /><span>Não</span></label></div>
                      {newPatient.visionDifficulty === "sim" && (<div className="ml-6 space-y-2"><label className="text-sm font-medium text-gray-700 dark:text-gray-300">Usa óculos/lentes?</label><div className="flex gap-4"><label className="flex items-center space-x-2"><input type="radio" name="usesGlasses" value="sim" checked={newPatient.usesGlasses === 'sim'} onChange={(e) => setNewPatient({ ...newPatient, usesGlasses: e.target.value })} className="form-radio" /><span>Sim</span></label><label className="flex items-center space-x-2"><input type="radio" name="usesGlasses" value="não" checked={newPatient.usesGlasses === 'não'} onChange={(e) => setNewPatient({ ...newPatient, usesGlasses: e.target.value })} className="form-radio" /><span>Não</span></label></div></div>)}
                    </div>

                    {/* Dificuldades auditivas */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Dificuldades auditivas?</label>
                      <div className="flex gap-4"><label className="flex items-center space-x-2"><input type="radio" name="hearingDifficulty" value="sim" checked={newPatient.hearingDifficulty === 'sim'} onChange={(e) => setNewPatient({ ...newPatient, hearingDifficulty: e.target.value })} className="form-radio" /><span>Sim</span></label><label className="flex items-center space-x-2"><input type="radio" name="hearingDifficulty" value="não" checked={newPatient.hearingDifficulty === 'não'} onChange={(e) => setNewPatient({ ...newPatient, hearingDifficulty: e.target.value })} className="form-radio" /><span>Não</span></label></div>
                      {newPatient.hearingDifficulty === "sim" && (<div className="ml-6 space-y-2"><label className="text-sm font-medium text-gray-700 dark:text-gray-300">Usa aparelho auditivo?</label><div className="flex gap-4"><label className="flex items-center space-x-2"><input type="radio" name="usesHearingAid" value="sim" checked={newPatient.usesHearingAid === 'sim'} onChange={(e) => setNewPatient({ ...newPatient, usesHearingAid: e.target.value })} className="form-radio" /><span>Sim</span></label><label className="flex items-center space-x-2"><input type="radio" name="usesHearingAid" value="não" checked={newPatient.usesHearingAid === 'não'} onChange={(e) => setNewPatient({ ...newPatient, usesHearingAid: e.target.value })} className="form-radio"/><span>Não</span></label></div></div>)}
                    </div>

                    {/* CAMPO ADICIONADO: Dificuldades cognitivas */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Dificuldades cognitivas ou de memória?</label>
                      <div className="flex gap-4"><label className="flex items-center space-x-2"><input type="radio" name="cognitiveDifficulty" value="sim" checked={newPatient.cognitiveDifficulty === 'sim'} onChange={(e) => setNewPatient({ ...newPatient, cognitiveDifficulty: e.target.value })} className="form-radio" /><span>Sim</span></label><label className="flex items-center space-x-2"><input type="radio" name="cognitiveDifficulty" value="não" checked={newPatient.cognitiveDifficulty === 'não'} onChange={(e) => setNewPatient({ ...newPatient, cognitiveDifficulty: e.target.value })} className="form-radio" /><span>Não</span></label></div>
                    </div>

                    {/* Habilidades digitais */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Habilidades digitais</label>
                      <select value={newPatient.digitalSkills || ""} onChange={(e) => setNewPatient({ ...newPatient, digitalSkills: e.target.value })} className="h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"><option value="" disabled>Selecione o nível</option><option value="sozinho">Usa celular sozinho</option><option value="ajuda">Precisa de ajuda</option><option value="nao-utiliza">Não utiliza</option></select>
                    </div>

                    {/* Preferência de canal para lembrete */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Preferência de canal para lembrete</label>
                      <select value={newPatient.reminderChannel || ""} onChange={(e) => setNewPatient({ ...newPatient, reminderChannel: e.target.value })} className="h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"><option value="" disabled>Selecione o canal</option><option value="whatsapp">WhatsApp</option><option value="sms">SMS</option><option value="ligacao">Ligação</option><option value="email">E-mail</option></select>
                    </div>

                    {/* CAMPO ADICIONADO: Necessita de cuidador */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Necessita de cuidador na consulta?</label>
                      <div className="flex gap-4"><label className="flex items-center space-x-2"><input type="radio" name="needsCaregiver" value="sim" checked={newPatient.needsCaregiver === 'sim'} onChange={(e) => setNewPatient({ ...newPatient, needsCaregiver: e.target.value })} className="form-radio" /><span>Sim</span></label><label className="flex items-center space-x-2"><input type="radio" name="needsCaregiver" value="não" checked={newPatient.needsCaregiver === 'não'} onChange={(e) => setNewPatient({ ...newPatient, needsCaregiver: e.target.value })} className="form-radio" /><span>Não</span></label></div>
                    </div>

                    {/* CAMPO ADICIONADO: Já realizou teleconsultas */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Já realizou teleconsultas antes?</label>
                      <div className="flex gap-4"><label className="flex items-center space-x-2"><input type="radio" name="previousTelehealth" value="sim" checked={newPatient.previousTelehealth === 'sim'} onChange={(e) => setNewPatient({ ...newPatient, previousTelehealth: e.target.value })} className="form-radio" /><span>Sim</span></label><label className="flex items-center space-x-2"><input type="radio" name="previousTelehealth" value="não" checked={newPatient.previousTelehealth === 'não'} onChange={(e) => setNewPatient({ ...newPatient, previousTelehealth: e.target.value })} className="form-radio" /><span>Não</span></label></div>
                    </div>
                  </div>

                  {/* CAMPO ADICIONADO: Necessidades de acessibilidade */}
                  <div className="space-y-2 mt-6">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Necessidades de acessibilidade</label>
                    <select value={newPatient.accessibilityNeeds || ""} onChange={(e) => setNewPatient({ ...newPatient, accessibilityNeeds: e.target.value })} className="h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"><option value="" disabled>Selecione as necessidades</option><option value="nenhuma">Nenhuma necessidade especial</option><option value="narracao">Narração em áudio</option><option value="fonte-ampliada">Fonte ampliada</option><option value="contraste-alto">Contraste alto</option><option value="teclado-voz">Teclado/voz</option><option value="multiplas">Múltiplas necessidades</option></select>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t dark:border-gray-700">
                  <button type="submit" className="inline-flex items-center justify-center flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Cadastrar Paciente
                  </button>
                  <button type="button" onClick={handleFormClear} className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    Limpar Formulário
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Conteúdo da Aba de Configurações */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* SEÇÃO DE CONFIGURAÇÕES COMPLETA */}
            <div className="border bg-white dark:bg-gray-900 dark:border-gray-800 rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Informações do Profissional</h2>
              </div>
              <div className="p-6 pt-0">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome</label>
                      <input value={mockProfessional.name} readOnly className="h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-3 py-2 text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">CRM</label>
                      <input value={mockProfessional.crm} readOnly className="h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-3 py-2 text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                      <input value={mockProfessional.email} readOnly className="h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-3 py-2 text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Especialidade</label>
                      <input value={mockProfessional.specialty} readOnly className="h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-3 py-2 text-sm" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Para alterar essas informações, entre em contato com o administrador do sistema.
                  </p>
                </form>
              </div>
            </div>
            <div className="border bg-white dark:bg-gray-900 dark:border-gray-800 rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Preferências do Sistema</h2>
              </div>
              <div className="p-6 pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">Notificações por Email</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receber emails sobre novos pacientes e consultas</p>
                    </div>
                    <button className="px-3 py-1 text-sm font-medium border rounded-md">Ativado</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">Relatórios Automáticos</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Enviar relatórios mensais automaticamente</p>
                    </div>
                    <button className="px-3 py-1 text-sm font-medium border rounded-md">Desativado</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardProfissional;