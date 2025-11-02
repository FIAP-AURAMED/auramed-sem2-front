import { useForm, type SubmitHandler } from 'react-hook-form';
import { Lock, Shield, Stethoscope, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

interface IFormInput {
    email: string;
    senha_login: string;
}

interface LoginResponse {
    token: string;
    tipoToken: string;
    dataExpiracao: string;
    medico: {
        id: number;
        pessoa: {
            id: number;
            nome: string | null;
            email: string | null;
            cpf: string | null;
            dataNascimento: string | null;
            genero: string | null;
            telefone: string | null;
            tipoPessoa: string | null;
            dataCadastro: string;
            ativo: string;
        };
        crm: string;
        aceitaTeleconsulta: string;
        dataCadastro: string;
    };
}
const API_URL = import.meta.env.VITE_API_URL || 'https://auramed-backend-6yw9.onrender.com';

export default function LoginProfissional() {
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [loginSuccess, setLoginSuccess] = useState<string | null>(null);

    useEffect(() => {
        document.title = 'AuraMed | Login Profissional';
        return () => {
            document.title = 'AuraMed';
        };
    }, []);

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setIsLoading(true);
        setLoginError(null);
        setLoginSuccess(null);

        try {
            const response = await fetch(`${API_URL}/auth/medicos/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    senha: data.senha_login
                }),
            });

            if (response.ok) {
                const responseData: LoginResponse = await response.json();
                
                localStorage.setItem('token', responseData.token);
                localStorage.setItem('medico', JSON.stringify(responseData.medico));
                
                const nomeMedico = responseData.medico.pessoa.nome || `CRM ${responseData.medico.crm}`;
                
                setLoginSuccess(`Bem-vindo(a), ${nomeMedico}! Redirecionando...`);
                setIsLoading(false);

                setTimeout(() => {
                    navigate(`/profissional/${responseData.medico.id}`);
                }, 2000);
                
            } else {
                if (response.status === 401) {
                    setLoginError('E-mail ou senha inválidos.');
                } else {
                    try {
                        const errorText = await response.text();
                        let errorData;
                        try {
                            errorData = JSON.parse(errorText);
                        } catch {
                            errorData = { message: errorText };
                        }
                        setLoginError(errorData?.message || `Erro ${response.status}`);
                    } catch (parseError) {
                        setLoginError(`Erro ${response.status}: Não foi possível fazer login.`);
                    }
                }
                setIsLoading(false);
            }
        } catch (error) {
            setLoginError('Não foi possível conectar ao servidor. Verifique sua conexão.');
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 pb-12">
            <section className="my-12 mx-4 flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto bg-primary-600/10">
                    <Stethoscope className="w-10 h-10 text-primary-600" />
                </div>
                <h1 className="text-3xl font-bold text-tx-primary">Área do Profissional</h1>
                <p className="text-lg text-tx-secondary max-w-sm mx-auto">Acesse o sistema para gerenciar seus pacientes e consultas</p>
            </section>

            <section className="flex flex-col w-[90%] max-w-md m-auto border-gray-300 border-2 p-6 gap-6 rounded-xl">
                <div className="flex items-center justify-center gap-2">
                    <Shield className="w-6 h-6 text-primary-600" />
                    <h2 className="text-xl font-semibold text-tx-primary">Login</h2>
                </div>

                {loginError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Erro!</strong>
                        <span className="block sm:inline"> {loginError}</span>
                    </div>
                )}
                
                {loginSuccess && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Sucesso!</strong>
                        <span className="block sm:inline"> {loginSuccess}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-md font-medium text-tx-primary">E-mail Institucional</label>
                        <div className="relative border-gray-300 border-2 rounded-md p-2">
                            <User className="absolute left-3 top-3 h-4 w-4 text-tx-secondary" />
                            <input
                                id="email"
                                type="email"
                                placeholder="Insira seu e-mail institucional"
                                className="pl-10 text-sm w-full bg-transparent focus-visible:outline-none"
                                {...register("email", {
                                    required: "O e-mail é obrigatório",
                                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Formato de e-mail inválido" }
                                })}
                                disabled={isLoading || !!loginSuccess}
                            />
                        </div>
                        {errors.email && <small className="text-red-600 mt-1">{errors.email.message}</small>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-md font-medium text-tx-primary">Senha</label>
                        <div className="relative border-gray-300 border-2 rounded-md p-2">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-tx-secondary" />
                            <input
                                id="password"
                                type="password"
                                placeholder="Insira sua senha"
                                className="pl-10 w-full text-sm bg-transparent focus-visible:outline-none"
                                {...register("senha_login", {
                                    required: "A senha é obrigatória"
                                })}
                                disabled={isLoading || !!loginSuccess}
                            />
                        </div>
                        {errors.senha_login && <small className="text-red-600 mt-1">{errors.senha_login.message}</small>}
                    </div>

                    <button 
                        type="submit" 
                        className={`bg-primary-600 text-white p-2 w-full rounded-lg hover:bg-primary-700 flex items-center justify-center ${ (isLoading || !!loginSuccess) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading || !!loginSuccess}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Entrando...
                            </>
                        ) : (
                            'Entrar no sistema'
                        )}
                    </button>
                </form>
            </section>
        </div>
    );
}

