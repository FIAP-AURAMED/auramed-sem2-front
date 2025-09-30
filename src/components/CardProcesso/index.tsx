
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import type { LucideProps } from 'lucide-react';


interface Step {
    icon: React.ComponentType<LucideProps>;
    title: string;
    description: string;
    details: string[];
    buttonText: string;
    buttonLink: string;
}


interface ProcessoSectionProps {
    title: string;
    steps: Step[];
}

export const ProcessoSection: React.FC<ProcessoSectionProps> = ({ title, steps }) => {

    return (
        <section className="container mx-auto px-4 space-y-12" aria-labelledby="processo-title">
            <div className="text-center">
                <h2
                    id="processo-title"
                    className="text-3xl font-bold text-tx-primary mb-4"
                >
                    {title}
                </h2>
            </div>

            <div className="space-y-12">
                {steps.map((step, index) => {

                    return (
                        <div
                            key={index}
                            className={`bg-white border-gray-300 border-2 rounded-lg transition-colors hover:border-primary-600 overflow-hidden `}
                        >
                            <div className="p-8">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-primary-600/10`}>
                                                <step.icon className={`h-8 w-8 text-primary-600`} aria-hidden="true" />
                                            </div>
                                            <div>
                                                <span className={`text-sm font-medium text-primary-600`}>Passo {index + 1}</span>
                                                <h3 className="text-2xl font-bold text-tx-primary">
                                                    {step.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <p className="text-lg text-tx-secondary leading-relaxed">
                                            {step.description}
                                        </p>

                                        <div className="space-y-3">
                                            {step.details.map((detail, detailIndex) => (
                                                <div key={detailIndex} className="flex items-center gap-3">
                                                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                    <span className="text-tx-secondary">{detail}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <Link to={step.buttonLink}>
                                            <button className="mt-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none bg-primary-600 text-white hover:bg-primary-600/90 h-11 px-8">
                                                {step.buttonText}
                                                <ArrowRight className="h-4 w-4 ml-2" />
                                            </button>
                                        </Link>
                                    </div>

                                    <div className={`hidden lg:block bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-2xl p-2 text-center`}>
                                        <div className="flex items-center justify-center w-50 h-80 m-auto">
                                            <step.icon className={`h-20 w-20 text-primary-600`} aria-hidden="true" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};