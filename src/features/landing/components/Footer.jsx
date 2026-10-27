import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
    const footerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReduced) return;

        const ctx = gsap.context(() => {
            gsap.from('.footer__headline', {
                scrollTrigger: {
                    trigger: '.footer__body',
                    start: 'top 92%',
                    once: true,
                },
                y: 40,
                opacity: 0,
                filter: 'blur(10px)',
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all',
            });

            gsap.from('.footer__btn', {
                scrollTrigger: {
                    trigger: '.footer__body',
                    start: 'top 90%',
                    once: true,
                },
                scale: 0.85,
                opacity: 0,
                duration: 0.7,
                delay: 0.1,
                ease: 'back.out(1.5)',
                clearProps: 'all',
            });

            gsap.from('.footer__nav-link', {
                scrollTrigger: {
                    trigger: '.footer__nav',
                    start: 'top 95%',
                    once: true,
                },
                y: 15,
                opacity: 0,
                stagger: 0.04,
                duration: 0.5,
                ease: 'power2.out',
                clearProps: 'all',
            });

            gsap.from('.footer__disclaimer', {
                scrollTrigger: {
                    trigger: '.footer__disclaimer',
                    start: 'top 95%',
                    once: true,
                },
                y: 15,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                clearProps: 'all',
            });

            gsap.from('.footer__watermark', {
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 85%',
                    end: 'bottom bottom',
                    scrub: 0.8,
                },
                y: 40,
                opacity: 0.02,
                scale: 0.96,
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer className="footer" id="footer" ref={footerRef}>
            {/* Contenido central enfocado en softapp */}
            <div className="footer__body">
                <h2 className="footer__headline">
                    Lleva tus aplicaciones web al siguiente nivel con React &amp; PWA
                </h2>

                <button
                    type="button"
                    className="btn footer__btn"
                    onClick={() => navigate('/beneficios')}
                >
                    Conocer Beneficios
                    <span className="material-symbols-outlined" aria-hidden="true">
                        rocket_launch
                    </span>
                </button>

                {/* Links de navegación técnicos y de plataforma */}
                <nav className="footer__nav">
                    <Link to="/" className="footer__nav-link">
                        Inicio
                    </Link>
                    <Link to="/beneficios" className="footer__nav-link">
                        Estándares PWA &amp; React
                    </Link>
                    <Link to="/faq" className="footer__nav-link">
                        Preguntas Frecuentes
                    </Link>
                    <Link to="/rick-and-morty" className="footer__nav-link">
                        Rick &amp; Morty
                    </Link>
                    <Link to="/props" className="footer__nav-link">
                        Ingeniería de Props
                    </Link>
                    <Link to="/login" className="footer__nav-link">
                        Portal de Desarrolladores
                    </Link>
                </nav>

                <p className="footer__disclaimer">
                    Aviso: Plataforma especializada en la arquitectura, auditoría y desarrollo de Progressive Web Apps con React 19 y Workbox. Cumplimiento con especificaciones W3C y estándares de Google Lighthouse.
                </p>
            </div>

            {/* Watermark con softapp en DM Sans */}
            <div className="footer__watermark" aria-hidden="true">
                softapp
            </div>

            {/* Difuminado suave inferior */}
            <div className="footer__fade" aria-hidden="true" />
        </footer>
    );
};
