export interface TipoMedico {
  id: number;
  pessoa: {
    id: number; nome: string | null; email: string | null; cpf: string | null;
  };
  crm: string;
}

export interface TipoPacienteLista {
  idPessoa: number;
  idMedicoResponsavel: number;
  nrCartaoSUS: string;
  dataCadastro: string;
  ativo: string;
}

export interface HabilidadeDigital {
  skill: string;
  count: number;
}

export interface CanalLembrete {
  name: string;
  value: number;
  fill: string;
}

export interface DificuldadeAcessibilidade {
  type: string;
  count: number;
  total: number;
}

export interface FaqPopular {
  question: string;
  views: number;
}

export interface UsoChatbot {
  month: string;
  usage: number;
}

export interface EstatisticaSentimento {
  sentimento: string;
  quantidade: number;
}

export interface FonteResposta {
  fonte: string;
  quantidade: number;
}

export interface ProntidaoAcessibilidadeData {
  habilidadesDigitais: HabilidadeDigital[];
  canaisLembrete: CanalLembrete[];
  dificuldadesAcessibilidade: DificuldadeAcessibilidade[];
}

export interface SuporteEngajamentoData {
  faqsPopulares: FaqPopular[];
  usoChatbot: UsoChatbot[];
  perguntasNaoRespondidas: string[];
}

export interface MetricasChatbotData {
  estatisticasSentimentos: EstatisticaSentimento[];
  totalConversas: number;
  usuariosUnicos: number;
  mediaConversasPorUsuario: number;
  fontesResposta: FonteResposta[];
}

export interface DashboardData {
  prontidaoAcessibilidade: ProntidaoAcessibilidadeData;
  suporteEngajamento: SuporteEngajamentoData;
  metricasChatbot: MetricasChatbotData;
}