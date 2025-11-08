export interface TipoPessoa {
  id: number;
  nome: string;
  email: string | null;
  cpf: string | null;
  telefone: string;
  ativo: string;
  dataNascimento?: string;
  genero?: string;
}

export interface TipoMedico {
  id: number;
  pessoa: TipoPessoa;
  crm: string;
}

export interface TipoPacienteCompleto {
  pessoa: TipoPessoa;
  paciente: {
    idPessoa: number;
    idMedicoResponsavel: number;
    nrCartaoSUS: string;
    ativo: string;
  };
  infoTeleconsulta: {
    idInfoTeleconsulta: number;
    cdHabilidadeDigital?: string;
    cdCanalLembrete?: string;
    inPrecisaCuidador?: string;
    inJaFezTele?: string;
  } | null;
  perfilCognitivo: {
    idPerfilCognitivo: number;
    inDificuldadeVisao?: string;
    inUsaOculos?: string;
    inDificuldadeAudicao?: string;
    inUsaAparelhoAud?: string;
    inDificuldadeCogn?: string;
  } | null;
}

export interface PatientFormData {
  pessoa?: {
    nome?: string;
    email?: string;
    cpf?: string;
    dataNascimento?: string;
    genero?: string;
    telefone?: string;
  };
  paciente?: {
    nrCartaoSUS?: string;
  };
  infoTeleconsulta?: {
    cdHabilidadeDigital?: string;
    cdCanalLembrete?: string;
    inPrecisaCuidador?: string;
    inJaFezTele?: string;
  } | null;
  perfilCognitivo?: {
    inDificuldadeVisao?: string;
    inUsaOculos?: string;
    inDificuldadeAudicao?: string;
    inUsaAparelhoAud?: string;
    inDificuldadeCogn?: string;
  } | null;
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
  categoria?: string;
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

export interface CategoriaFAQ {
  id: number;
  displayText: string;
  views: number;
  count: number;
}

export interface CategoriaPerguntas {
  categoria: string;
  quantidade: number;
}

export interface ChartData {
  [key: string]: string | number;
}