import { useState, useEffect } from 'react';
import { BarChart3, MessageSquare, HelpCircle, Download, Users, Eye, Ear, Brain } from 'lucide-react';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

interface HabilidadeDigital {
  skill: string;
  count: number;
}

interface CanalLembrete {
  name: string;
  value: number;
  fill: string;
}

interface DificuldadeAcessibilidade {
  type: string;
  count: number;
  total: number;
}

interface FaqPopular {
  question: string;
  views: number;
}

interface UsoChatbot {
  month: string;
  usage: number;
}

interface EstatisticaSentimento {
  sentimento: string;
  quantidade: number;
}

interface FonteResposta {
  fonte: string;
  quantidade: number;
}

interface ProntidaoAcessibilidadeData {
  habilidadesDigitais: HabilidadeDigital[];
  canaisLembrete: CanalLembrete[];
  dificuldadesAcessibilidade: DificuldadeAcessibilidade[];
}

interface SuporteEngajamentoData {
  faqsPopulares: FaqPopular[];
  usoChatbot: UsoChatbot[];
  perguntasNaoRespondidas: string[];
}

interface MetricasChatbotData {
  estatisticasSentimentos: EstatisticaSentimento[];
  totalConversas: number;
  usuariosUnicos: number;
  mediaConversasPorUsuario: number;
  fontesResposta: FonteResposta[];
}

interface DashboardData {
  prontidaoAcessibilidade: ProntidaoAcessibilidadeData;
  suporteEngajamento: SuporteEngajamentoData;
  metricasChatbot: MetricasChatbotData;
}

export default function Relatorios() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/relatorios/completo`);
      
      if (!response.ok) {
        throw new Error('Erro ao carregar dados do dashboard');
      }
      
      const data: DashboardData = await response.json();
      setDashboardData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Erro ao buscar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  const getIconForAcessibilidade = (type: string) => {
    switch (type.toLowerCase()) {
      case 'visual': return <Eye className="h-4 w-4" />;
      case 'auditiva': return <Ear className="h-4 w-4" />;
      case 'cognitiva': return <Brain className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getColorForSentimento = (sentimento: string) => {
    switch (sentimento.toLowerCase()) {
      case 'positivo': return '#10B981';
      case 'negativo': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const exportToCSV = () => {
    if (!dashboardData) return;

    const csvContent = [
      'Relatório AuraMed - Dashboard Analytics',
      '',
      'PRONTIDÃO E ACESSIBILIDADE',
      'Habilidade Digital,Quantidade',
      ...dashboardData.prontidaoAcessibilidade.habilidadesDigitais.map(h => `${h.skill},${h.count}`),
      '',
      'Canal de Lembrete,Quantidade',
      ...dashboardData.prontidaoAcessibilidade.canaisLembrete.map(c => `${c.name},${c.value}`),
      '',
      'Dificuldade de Acessibilidade,Quantidade,Total',
      ...dashboardData.prontidaoAcessibilidade.dificuldadesAcessibilidade.map(d => `${d.type},${d.count},${d.total}`),
      '',
      'SUPORTE E ENGAJAMENTO',
      'Pergunta FAQ,Visualizações',
      ...dashboardData.suporteEngajamento.faqsPopulares.map(f => `${f.question},${f.views}`),
      '',
      'Uso do Chatbot,Mês,Quantidade',
      ...dashboardData.suporteEngajamento.usoChatbot.map(u => `${u.month},${u.usage}`),
      '',
      'Perguntas Não Respondidas',
      ...dashboardData.suporteEngajamento.perguntasNaoRespondidas,
      '',
      'MÉTRICAS DO CHATBOT',
      'Sentimento,Quantidade',
      ...dashboardData.metricasChatbot.estatisticasSentimentos.map(e => `${e.sentimento},${e.quantidade}`),
      '',
      `Total de Conversas,${dashboardData.metricasChatbot.totalConversas}`,
      `Usuários Únicos,${dashboardData.metricasChatbot.usuariosUnicos}`,
      `Média de Conversas por Usuário,${dashboardData.metricasChatbot.mediaConversasPorUsuario.toFixed(2)}`,
      '',
      'Fonte de Resposta,Quantidade',
      ...dashboardData.metricasChatbot.fontesResposta.map(f => `${f.fonte},${f.quantidade}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-auramed-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-2">Erro ao carregar relatórios</div>
          <div className="text-gray-600 mb-4">{error}</div>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-gray-600">
          Nenhum dado disponível para exibição
        </div>
      </div>
    );
  }

  const { prontidaoAcessibilidade, suporteEngajamento, metricasChatbot } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Cabeçalho com Exportação */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Analytics</h1>
        <button
          onClick={exportToCSV}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Download className="h-4 w-4" />
          Exportar Relatório
        </button>
      </div>

      {/* Prontidão e Acessibilidade */}
      <div className="border bg-white rounded-lg shadow-sm border-gray-300">
        <div className="p-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
            <BarChart3 className="h-6 w-6" />
            Prontidão e Acessibilidade do Paciente
          </h2>
        </div>
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Habilidades Digitais */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center text-gray-800">Habilidades Digitais</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={prontidaoAcessibilidade.habilidadesDigitais}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="skill" fontSize={12} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#C81051" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Canais de Lembrete */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center text-gray-800">Canal de Lembrete Preferido</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={prontidaoAcessibilidade.canaisLembrete}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {prontidaoAcessibilidade.canaisLembrete.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dificuldades de Acessibilidade */}
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Dificuldades de Acessibilidade</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {prontidaoAcessibilidade.dificuldadesAcessibilidade.map((item, index) => {
                const percentage = Math.round((item.count / item.total) * 100);
                return (
                  <div key={index} className="p-4 border rounded-lg text-center space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      {getIconForAcessibilidade(item.type)}
                      <h4 className="font-medium text-gray-700">{item.type}</h4>
                    </div>
                    <div className="text-2xl font-bold text-primary-600">{percentage}%</div>
                    <div className="text-sm text-gray-500">{item.count} de {item.total}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-primary-600 h-2.5 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Suporte e Engajamento */}
      <div className="border bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
            <MessageSquare className="h-6 w-6" />
            Suporte e Engajamento
          </h2>
        </div>
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* FAQ Mais Acessados */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center text-gray-800">FAQ Mais Acessados</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={suporteEngajamento.faqsPopulares} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="question" type="category" width={100} fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="views" fill="#C81051" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Tendências de Uso do Chatbot */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center text-gray-800">Tendências de Uso do Chatbot</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={suporteEngajamento.usoChatbot}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="usage" stroke="#ffc658" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Perguntas Não Respondidas */}
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
              <HelpCircle className="h-5 w-5" />
              Principais Perguntas Não Respondidas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suporteEngajamento.perguntasNaoRespondidas.map((question, index) => (
                <div key={index} className="p-3 bg-gray-100 rounded-lg text-sm text-gray-700">
                  {question}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Métricas do Chatbot */}
      <div className="border bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
            <Users className="h-6 w-6" />
            Métricas do Chatbot
          </h2>
        </div>
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Estatísticas de Sentimentos */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center text-gray-800">Análise de Sentimentos</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={metricasChatbot.estatisticasSentimentos}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sentimento" fontSize={12} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="quantidade" radius={[4, 4, 0, 0]}>
                    {metricasChatbot.estatisticasSentimentos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getColorForSentimento(entry.sentimento)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Fontes de Resposta */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center text-gray-800">Fontes de Resposta</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={metricasChatbot.fontesResposta}
                    dataKey="quantidade"
                    nameKey="fonte"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {metricasChatbot.fontesResposta.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index % 3 === 0 ? '#C81051' : index % 3 === 1 ? '#FFC107' : '#007BFF'} 
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Métricas de Engajamento */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-600">
                {metricasChatbot.totalConversas.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total de Conversas</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-600">
                {metricasChatbot.usuariosUnicos.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Usuários Únicos</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-600">
                {metricasChatbot.mediaConversasPorUsuario.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Média por Usuário</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}