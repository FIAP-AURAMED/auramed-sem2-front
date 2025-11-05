export interface PerguntaFrequente {
  pergunta: string;
  resposta: string;
  frequencia: number;
  categoria: string;
}

export interface FaqState {
  faqData: PerguntaFrequente[];
  loading: boolean;
  error: string | null;
}