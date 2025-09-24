import { Lock, Shield, Stethoscope, User } from "lucide-react";


export default function LoginProfissional() {

    return (
        <div className="flex flex-col gap-6">
            <section className="my-12 mx-4 flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto bg-primary-600/10">
                    <Stethoscope className="w-10 h-10 text-primary-600" />
                </div>

                <h1 className="text-3xl font-bold text-tx-primary ">Área do Profissional</h1>
                <p className="text-lg text-tx-secondary max-w-sm mx-auto">Acesse o sistema para gerenciar seus pacientes e consultas</p>
            </section>

            <section className="flex flex-col w-[80%] max-w-100 m-auto border-gray-300 border-2 p-6 gap-6 rounded-xl ">
                <div className="flex items-center justify-center gap-2">
                    <Shield className="w-6 h-6 text-primary-600" />
                    <h2 className="text-xl font-semibold text-tx-primary ">Login</h2>
                </div>

                <form action="#" className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-md font-medium text-tx-primary">E-mail Institucional</label>

                        <div className="relative border-gray-300 border-2 rounded-md p-2 ">
                            <User className="absolute left-3 top-3 h-4 w-4 text-tx-secondary" />
                            <input id="email" type="email" placeholder="seu.email@imrea.org.br" className="pl-10 text-sm w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-8 disabled:cursor-not-allowed disabled:opacity-50 rounded-xs" />
                        </div>
                        <p className="text-xs text-tx-secondary">
                            Use seu e-mail institucional cadastrado no sistema
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-md font-medium text-tx-primary">Senha</label>

                        <div className="relative border-gray-300 border-2 rounded-md p-2 ">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-tx-secondary" />
                            <input id="password" type="password" placeholder="Sua senha" className="pl-10 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-8 disabled:cursor-not-allowed disabled:opacity-50 rounded-xs text-sm" />
                        </div>
                        <p className="text-xs text-tx-secondary">
                            Senha fornecida pelo administrador do sistema
                        </p>
                    </div>

                    <button type="submit" className="bg-primary-600 text-white p-2 w-full rounded-lg hover:bg-primary-700">Entrar no sistema</button>
                </form>

            </section>

            {/* A classe "mb-12" foi adicionada aqui para criar espaço antes do footer */}
            <section className="w-[80%] max-w-100 m-auto border-gray-300 border-2 bg-primary-400/10 p-4 rounded-lg mb-12">
                <h3 className="font-semibold text-tx-primary text-center mb-4">
                    Funcionalidades da Área do Profissional
                </h3>
                <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span className="text-gray-600">Cadastro e gestão de pacientes</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span className="text-gray-600">Relatórios de absenteísmo</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span className="text-gray-600">Análise de preparação dos pacientes</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span className="text-gray-600">Estatísticas de uso da plataforma</span>
                    </div>
                </div>
            </section>
        </div>
    )
}