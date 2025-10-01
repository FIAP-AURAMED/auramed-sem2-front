import { useForm, type SubmitHandler } from 'react-hook-form'; 
import { User, Mail, MessageSquare } from 'lucide-react';


interface IFormInput {
    nome: string;
    email: string;
    mensagem: string;
}

export default function FormContato() {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();


    const onSubmit: SubmitHandler<IFormInput> = data => {
        console.log("Dados do Contato:", data);
        alert(`Obrigado pelo contato, ${data.nome}! Sua mensagem foi enviada.`);

    };

    return (
        <section className="w-full lg:w-150 m-auto mt-16 p-8 border-gray-300 border-2 rounded-xl bg-gray-400/10">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-tx-primary">Ainda com dúvidas?</h2>
                <p className="text-lg text-tx-secondary">Envie-nos uma mensagem e nossa equipe responderá em breve.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6 max-w-lg mx-auto">

                <div className="flex flex-col gap-2">
                    <label htmlFor="nome" className="text-md font-medium text-tx-primary">Seu Nome</label>
                    <div className="relative border-gray-300 border-2 rounded-md p-2">
                        <User className="absolute left-3 top-3 h-4 w-4 text-tx-secondary" />
                        <input
                            id="nome"
                            type="text"
                            placeholder="Digite seu nome completo"
                            className="pl-10 text-sm w-full bg-transparent focus-visible:outline-none"
                            {...register("nome", {
                                required: "O nome é obrigatório",
                                minLength: { value: 3, message: "O nome deve ter no mínimo 3 caracteres" }
                            })}
                        />
                    </div>
                    {errors.nome && <small className="text-red-600">{errors.nome.message}</small>}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-md font-medium text-tx-primary">Seu E-mail</label>
                    <div className="relative border-gray-300 border-2 rounded-md p-2">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-tx-secondary" />
                        <input
                            id="email"
                            type="email"
                            placeholder="seu.email@exemplo.com"
                            className="pl-10 text-sm w-full bg-transparent focus-visible:outline-none"
                            {...register("email", {
                                required: "O e-mail é obrigatório",
                                pattern: { value: /^\S+@\S+\.\S+$/, message: "Formato de e-mail inválido" }
                            })}
                        />
                    </div>
                    {errors.email && <small className="text-red-600">{errors.email.message}</small>}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="mensagem" className="text-md font-medium text-tx-primary">Sua Mensagem</label>
                    <div className="relative border-gray-300 border-2 rounded-md p-2">
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-tx-secondary" />
                        <textarea
                            id="mensagem"
                            placeholder="Escreva sua dúvida ou sugestão aqui..."
                            className="pl-10 text-sm w-full bg-transparent focus-visible:outline-none h-24 resize-none"
                            {...register("mensagem", {
                                required: "A mensagem não pode estar vazia",
                                maxLength: { value: 500, message: "A mensagem deve ter no máximo 500 caracteres" }
                            })}
                        />
                    </div>
                    {errors.mensagem && <small className="text-red-600">{errors.mensagem.message}</small>}
                </div>

                <button type="submit" className="bg-primary-600 text-white p-3 w-full rounded-lg hover:bg-primary-700 font-semibold">Enviar Mensagem</button>
            </form>
        </section>
    );
}