import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Props from '../components/Props';
import '../components/Props.css';

gsap.registerPlugin(ScrollTrigger);

export const PropsPage = () => {
    const pageRef = useRef(null);

    useEffect(() => {
        const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReduced) return;

        const ctx = gsap.context(() => {
            gsap.from('.features__header > *', {
                y: 35,
                opacity: 0,
                filter: 'blur(8px)',
                stagger: 0.1,
                duration: 0.85,
                ease: 'power3.out',
                clearProps: 'filter',
            });

            gsap.from('.props-bento-card', {
                scrollTrigger: {
                    trigger: '.props-bento-grid',
                    start: 'top 85%',
                },
                y: 40,
                opacity: 0,
                scale: 0.94,
                filter: 'blur(8px)',
                stagger: 0.1,
                duration: 0.85,
                ease: 'power3.out',
                clearProps: 'filter,transform',
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="props-page" ref={pageRef}>
            <div className="props-page__container">
                <header className="features__header">
                    <h1 className="features__title">Props en React</h1>
                    <p className="features__subtitle">
                        Demostración del paso de propiedades en componentes para renderizar diferentes imágenes con una arquitectura modular y reutilizable.
                    </p>
                </header>

                <div className="features__card-wrapper props-minimal-wrapper">
                    <Props />
                </div>
            </div>
        </section>
    );
};
