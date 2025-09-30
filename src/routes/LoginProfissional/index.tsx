import { useForm, type SubmitHandler } from 'react-hook-form'; 
import { Lock, Shield, Stethoscope, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

interface IFormInput {
    email: string;
    senha_login: string;
}

export default function LoginProfissional() {

  useEffect(() => {
          document.title = 'AuraMed | Login Profissional';
          return () => {
              document.title = 'AuraMed';
          };
      }, []);

    const navigate = useNavigate();
    
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    
    const onSubmit: SubmitHandler<IFormInput> = data => {
        console.log('Dados de Login Validados:', data);
        alert('Login realizado com sucesso!');
        navigate('/profissional');
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

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-md font-medium text-tx-primary">E-mail Institucional</label>
                        <div className="relative border-gray-300 border-2 rounded-md p-2">
                            <User className="absolute left-3 top-3 h-4 w-4 text-tx-secondary" />
                            <input
                                id="email"
                                type="email"
                                placeholder="seu.email@imrea.org.br"
                                className="pl-10 text-sm w-full bg-transparent focus-visible:outline-none"
                                {...register("email", {
                                    required: "O e-mail é obrigatório",
                                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Formato de e-mail inválido" }
                                })}
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
                                placeholder="Sua senha"
                                className="pl-10 w-full text-sm bg-transparent focus-visible:outline-none"
                                {...register("senha_login", {
                                    required: "A senha é obrigatória",
                                    minLength: { value: 6, message: "A senha deve ter no mínimo 6 caracteres" }
                                })}
                            />
                        </div>
                        {errors.senha_login && <small className="text-red-600 mt-1">{errors.senha_login.message}</small>}
                    </div>

                    <button type="submit" className="bg-primary-600 text-white p-2 w-full rounded-lg hover:bg-primary-700">Entrar no sistema</button>
                </form>
            </section>
        </div>
    );
}