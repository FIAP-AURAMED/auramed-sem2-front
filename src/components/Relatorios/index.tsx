import { BarChart3, MessageSquare, HelpCircle, Download } from 'lucide-react';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';


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


export default function Relatorios() {
  return (
    <div className="space-y-6">
      <div className="border bg-white rounded-lg shadow-sm border-gray-300">
        <div className="p-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
            <BarChart3 className="h-6 w-6" />
            Prontidão e Acessibilidade do Paciente
          </h2>
        </div>
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center text-gray-800">Habilidades Digitais</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={digitalSkillsData}>
                  <CartesianGrid strokeDasharray="3 3" /> <XAxis dataKey="skill" fontSize={12} /> <YAxis /> <Tooltip />
                  <Bar dataKey="count" fill="#C81051" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center text-gray-800">Canal de Lembrete Preferido</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={reminderChannelData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {reminderChannelData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.fill} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Dificuldades de Acessibilidade</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {accessibilityData.map((item, index) => {
                const percentage = Math.round((item.count / item.total) * 100);
                return (
                  <div key={index} className="p-4 border rounded-lg text-center space-y-2">
                    <h4 className="font-medium text-gray-700">{item.type}</h4>
                    <div className="text-2xl font-bold text-primary-600">{percentage}%</div>
                    <div className="text-sm text-gray-500">{item.count} de {item.total}</div>
                    <div className="w-full bg-secondary-600/20 rounded-full h-2.5">
                      <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="border bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
            <MessageSquare className="h-6 w-6" />
            Suporte e Engajamento
          </h2>
        </div>
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center text-gray-800">FAQ Mais Acessados</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={faqData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" /> <XAxis type="number" />
                  <YAxis dataKey="question" type="category" width={100} fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="views" fill="#C81051" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center text-gray-800">Tendências de Uso do Chatbot</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chatbotUsageData}>
                  <CartesianGrid strokeDasharray="3 3" /> <XAxis dataKey="month" /> <YAxis /> <Tooltip />
                  <Line type="monotone" dataKey="usage" stroke="#ffc658" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
              <HelpCircle className="h-5 w-5" />
              Principais Perguntas Não Respondidas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {unansweredQuestions.map((question, index) => (
                <div key={index} className="p-3 bg-gray-100 rounded-lg text-sm text-gray-700">
                  {question}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100">
                <Download className="h-4 w-4 mr-2" /> Exportar Relatório de Acessibilidade
              </button>
              <button className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100">
                <Download className="h-4 w-4 mr-2" /> Exportar Dados de Engajamento
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
