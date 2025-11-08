import { useState, useEffect } from 'react';
import { BarChart3, MessageSquare, HelpCircle, Download, Users, Eye, Ear, Brain } from 'lucide-react';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import type { 
  DashboardData, 
  CategoriaFAQ, 
  CategoriaPerguntas, 
  ChartData,
  FaqPopular 
} from '../../types/tipos';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

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
      const response = await fetch(`${API_URL}/api/dashboard/completo`);

      if (!response.ok) {
        throw new Error('Erro ao carregar dados do dashboard');
      }

      const data: DashboardData = await response.json();
      setDashboardData(data);
    } catch (err) {
      console.warn('Erro ao buscar dados do dashboard, usando dados mock:', err);
      setDashboardData(getDadosMock());
      setError('Usando dados de demonstração - Banco de dados offline');
    } finally {
      setLoading(false);
    }
  };

  const getDadosMock = (): DashboardData => ({
    prontidaoAcessibilidade: {
      habilidadesDigitais: [
        { skill: 'Básico', count: 45 },
        { skill: 'Intermediário', count: 82 },
        { skill: 'Avançado', count: 35 }
      ],
      canaisLembrete: [
        { name: 'WhatsApp', value: 110, fill: '#C81051' },
        { name: 'SMS', value: 30, fill: '#FFC107' },
        { name: 'E-mail', value: 15, fill: '#007BFF' },
        { name: 'Ligação', value: 7, fill: '#000000' }
      ],
      dificuldadesAcessibilidade: [
        { type: 'Visual', count: 18, total: 162 },
        { type: 'Auditiva', count: 9, total: 162 },
        { type: 'Cognitiva', count: 25, total: 162 }
      ]
    },
    suporteEngajamento: {
      faqsPopulares: [
        { question: 'Como agendar consulta?', views: 150, categoria: 'AGENDAMENTO' },
        { question: 'Documentos necessários', views: 120, categoria: 'DOCUMENTACAO' },
        { question: 'Teleconsulta como funciona', views: 95, categoria: 'TELECONSULTA' },
        { question: 'Horário de funcionamento', views: 80, categoria: 'HORARIO' },
        { question: 'Contato por email', views: 60, categoria: 'CONTATO' }
      ],
      usoChatbot: [
        { month: 'Jan', usage: 200 },
        { month: 'Fev', usage: 250 },
        { month: 'Mar', usage: 230 },
        { month: 'Abr', usage: 300 }
      ],
      perguntasNaoRespondidas: [
        'Documentos necessários para agendamento',
        'Teleconsulta funciona aos finais de semana?',
        'Horário de atendimento extendido',
        'Documentos para primeira consulta',
        'Teleconsulta para idosos',
        'Horário de funcionamento aos sábados'
      ]
    },
    metricasChatbot: {
      estatisticasSentimentos: [
        { sentimento: 'POSITIVO', quantidade: 120 },
        { sentimento: 'NEUTRO', quantidade: 85 },
        { sentimento: 'NEGATIVO', quantidade: 15 }
      ],
      totalConversas: 220,
      usuariosUnicos: 150,
      mediaConversasPorUsuario: 1.47,
      fontesResposta: [
        { fonte: 'BASE_CONHECIMENTO', quantidade: 180 },
        { fonte: 'GEMINI', quantidade: 35 },
        { fonte: 'HIBRIDO', quantidade: 5 }
      ]
    }
  });

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

  const processarDadosFAQ = (faqs: FaqPopular[]): CategoriaFAQ[] => {
    const categoriasAgrupadas = faqs.reduce((acc: Record<string, { views: number; count: number }>, faq) => {
      const categoria = faq.categoria || 'GERAL';
      if (!acc[categoria]) {
        acc[categoria] = { views: 0, count: 0 };
      }
      acc[categoria].views += faq.views;
      acc[categoria].count += 1;
      return acc;
    }, {});

    return Object.entries(categoriasAgrupadas)
      .map(([categoria, dados], index) => ({
        id: index,
        displayText: formatarCategoria(categoria),
        views: dados.views,
        count: dados.count
      }))
      .sort((a, b) => b.views - a.views);
  };

  const processarPerguntasNaoRespondidas = (perguntas: string[]): CategoriaPerguntas[] => {
    const categoriasAgrupadas = perguntas.reduce((acc: Record<string, number>, pergunta) => {
      const categoria = extrairCategoriaDaPergunta(pergunta);
      acc[categoria] = (acc[categoria] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(categoriasAgrupadas)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 6)
      .map(([categoria, quantidade]) => ({
        categoria: formatarCategoria(categoria),
        quantidade: quantidade as number
      }));
  };

  const formatarCategoria = (categoria: string) => {
    const formatos: Record<string, string> = {
      'AGENDAMENTO': 'Agendamento',
      'DOCUMENTACAO': 'Documentação',
      'TELECONSULTA': 'Teleconsulta',
      'HORARIO': 'Horário',
      'CONTATO': 'Contato',
      'CUSTOS': 'Custos',
      'SERVICOS': 'Serviços',
      'PROCEDIMENTOS': 'Procedimentos',
      'OUTRAS_DUVIDAS': 'Outras Dúvidas',
      'GERAL': 'Geral'
    };
    return formatos[categoria] || categoria;
  };

  const extrairCategoriaDaPergunta = (pergunta: string) => {
    const perguntaLower = pergunta.toLowerCase();
    
    if (perguntaLower.includes('agendar') || perguntaLower.includes('marcar') || perguntaLower.includes('consulta')) {
      return 'AGENDAMENTO';
    }
    if (perguntaLower.includes('documento') || perguntaLower.includes('cpf') || perguntaLower.includes('rg') || perguntaLower.includes('cartão')) {
      return 'DOCUMENTACAO';
    }
    if (perguntaLower.includes('teleconsulta') || perguntaLower.includes('online') || perguntaLower.includes('virtual')) {
      return 'TELECONSULTA';
    }
    if (perguntaLower.includes('horário') || perguntaLower.includes('funciona') || perguntaLower.includes('abre')) {
      return 'HORARIO';
    }
    if (perguntaLower.includes('telefone') || perguntaLower.includes('email') || perguntaLower.includes('contato')) {
      return 'CONTATO';
    }
    if (perguntaLower.includes('gratuito') || perguntaLower.includes('pago') || perguntaLower.includes('custo')) {
      return 'CUSTOS';
    }
    
    return 'OUTRAS_DUVIDAS';
  };

  const faqData: CategoriaFAQ[] = dashboardData ? processarDadosFAQ(dashboardData.suporteEngajamento.faqsPopulares) : [];
  const perguntasNaoRespondidasData: CategoriaPerguntas[] = dashboardData ? processarPerguntasNaoRespondidas(dashboardData.suporteEngajamento.perguntasNaoRespondidas) : [];
  const canaisLembreteData: ChartData[] = dashboardData?.prontidaoAcessibilidade.canaisLembrete.map(item => ({
    name: item.name,
    value: item.value,
    fill: item.fill
  })) || [];
  const fontesRespostaData: ChartData[] = dashboardData?.metricasChatbot.fontesResposta.map(item => ({
    fonte: item.fonte,
    quantidade: item.quantidade
  })) || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
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

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-yellow-800 text-sm">
              <strong>Atenção:</strong> {error}
            </div>
          </div>
        </div>
      )}

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
                <BarChart data={prontidaoAcessibilidade.habilidadesDigitais}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="skill" fontSize={12} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#C81051" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center text-gray-800">Canal de Lembrete Preferido</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={canaisLembreteData}
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
              <h3 className="text-lg font-semibold text-center text-gray-800">Perguntas por Categoria</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={faqData} layout="vertical" margin={{ top: 5, right: 30, left: 140, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="displayText" 
                    type="category" 
                    width={130}
                    fontSize={11}
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value} visualizações`, 'Quantidade']}
                    labelFormatter={(label) => `Categoria: ${label}`}
                  />
                  <Bar dataKey="views" fill="#C81051" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

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

          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
              <HelpCircle className="h-5 w-5" />
              Categorias com Mais Dúvidas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {perguntasNaoRespondidasData.map((item, index) => (
                <div key={index} className="p-3 bg-gray-100 rounded-lg text-sm">
                  <div className="font-medium text-gray-800">{item.categoria}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.quantidade} {item.quantidade === 1 ? 'pergunta' : 'perguntas'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
            <Users className="h-6 w-6" />
            Métricas do Chatbot
          </h2>
        </div>
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center text-gray-800">Fontes de Resposta</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={fontesRespostaData}
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