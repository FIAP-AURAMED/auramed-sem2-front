import { Heart, Target } from "lucide-react";
import CardParticipante from "../../components/CardParticipantes";
import imgDiego from "../../assets/image-diego.png";
import linkedin from "../../assets/linkedin.svg";
import github from "../../assets/github.svg"


export default function Sobre() {

    return (
        <div>
            <section className="my-12 mx-4 flex flex-col items-center justify-center gap-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-tx-primary ">Sobre o Projeto Auramed</h1>
                <p className="text-xl text-tx-secondary max-w-3xl mx-auto">Uma solução inovadora para reduzir o absenteísmo em teleconsultas, tornando a medicina digital mais acessível e eficiente para todos.</p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 m-5 md:mx-30">
                <div className="flex flex-col gap-5 p-8 border-gray-300 border-2 rounded-2xl">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary-600/10">
                        <Target className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-tx-primary">Nossa Missão</h3>
                    <p className="text-lg text-tx-secondary max-w-[100%] md:max-w-lg mx-auto">Reduzir significativamente o absenteísmo em teleconsultas através de uma plataforma acessível que prepara e capacita pacientes para o atendimento digital, garantindo que todos tenham acesso igualitário aos cuidados de saúde.</p>
                </div>

                <div className="flex flex-col gap-5 p-8 border-gray-300 border-2 rounded-2xl">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-secondary-600/10">
                        <Heart className="w-8 h-8 text-secondary-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-tx-primary">Nossa Visão</h3>
                    <p className="text-lg text-tx-secondary max-w-[100%] md:max-w-lg mx-auto">Ser referência em soluções de acessibilidade para telemedicina, criando um futuro onde a tecnologia em saúde seja verdadeiramente inclusiva e onde nenhum paciente seja deixado para trás na transformação digital da medicina..</p>
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold text-tx-primary text-center">Nossa Equipe</h3>
                <p className="text-lg text-tx-secondary max-w-[80%] md:max-w-lg mx-auto">Profissionais dedicados à inovação em saúde digital e acessibilidade</p>

                <div>
                    <CardParticipante 
                        img={imgDiego}
                        title="Diego Andrade"
                        description="1TDSPO - RM566385"
                        linkUrl="https://www.linkedin.com/in/andradedossantosdiego/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                        icon={linkedin}
                        linkUrl="https://github.com/diandrade"
                        icon={github}
    
                    />
                </div>
            </section>
        </div>
    )
}