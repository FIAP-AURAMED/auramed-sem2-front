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