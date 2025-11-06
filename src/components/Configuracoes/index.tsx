import { type TipoMedico } from '../../types/tipos.ts';

interface Props {
  medico: TipoMedico | null;
}

export default function Configuracoes({ medico }: Props) {
  return (
    <div className="space-y-6">
      <div className="border bg-white rounded-lg shadow-sm border-gray-300">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900">Informações do Profissional</h2>
        </div>
        <div className="p-6 pt-0">
          {!medico ? (
            <p className="text-gray-500">Carregando informações do médico...</p>
          ) : (
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nome</label>
                  <input value={medico.pessoa.nome || ''} readOnly className="h-10 w-full focus-visible:outline-none rounded-md border text-gray-500 border-gray-300 bg-gray-100 px-3 py-2 text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">CRM</label>
                  <input value={medico.crm || ''} readOnly className="h-10 w-full focus-visible:outline-none rounded-md border text-gray-500 border-gray-300 bg-gray-100 px-3 py-2 text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input value={medico.pessoa.email || ''} readOnly className="h-10 w-full focus-visible:outline-none rounded-md border text-gray-500 border-gray-300 bg-gray-100 px-3 py-2 text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">CPF (parcial)</label>
                  <input value={medico.pessoa.cpf ? `***.${medico.pessoa.cpf.substring(3, 6)}.${medico.pessoa.cpf.substring(6, 9)}-**` : 'Não informado'} readOnly className="h-10 w-full focus-visible:outline-none rounded-md border text-gray-500 border-gray-300 bg-gray-100 px-3 py-2 text-sm" />
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Para alterar essas informações, entre em contato com o administrador do sistema.
              </p>
            </form>
          )}
        </div>
      </div>
      <div className="border bg-white rounded-lg shadow-sm border-gray-300">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900">Preferências do Sistema</h2>
        </div>
        <div className="p-6 pt-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Notificações por Email</p>
                <p className="text-sm text-gray-500">Receber emails sobre novos pacientes e consultas</p>
              </div>
              <button className="px-3 py-1 text-sm font-medium border rounded-md">Ativado</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Relatórios Automáticos</p>
                <p className="text-sm text-gray-500">Enviar relatórios mensais automaticamente</p>
              </div>
              <button className="px-3 py-1 text-sm font-medium border rounded-md">Desativado</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
