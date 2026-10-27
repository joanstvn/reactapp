import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../components/Main.css';

gsap.registerPlugin(ScrollTrigger);

const faqItems = [
    {
        question: '¿Qué ventajas ofrece una PWA desarrollada con React frente a una SPA tradicional?',
        answer: 'Una PWA impulsada por React combina la experiencia de usuario reactiva con capacidades nativas: funcionamiento offline, instalación directa en la pantalla de inicio sin pasar por App Stores, notificaciones push y tiempos de carga instantáneos gracias a la precaché de Service Workers.',
    },
    {
        question: '¿Cómo funciona la persistencia de datos cuando el usuario pierde la conexión a internet?',
        answer: 'Utilizamos Service Workers sincronizados con IndexedDB y CacheStorage API. Cuando el usuario navega sin conexión, las lecturas se sirven desde la caché local y las mutaciones (envíos o cambios) se encolan para sincronizarse automáticamente al restablecerse la red.',
    },
    {
        question: '¿Una PWA con React es compatible con iOS y dispositivos Apple?',
        answer: 'Sí. Safari en iOS y iPadOS admite la instalación de PWAs en la pantalla de inicio, almacenamiento offline mediante Cache Storage y, desde iOS 16.4+, notificaciones Web Push completas con permisos de usuario.',
    },
    {
        question: '¿Es necesario reescribir toda mi aplicación React existente para convertirla en PWA?',
        answer: 'No. Gracias a herramientas modernas como vite-plugin-pwa y Workbox, es posible transformar una aplicación React existente de forma progresiva agregando el manifiesto, registrando el service worker y configurando las estrategias de caché sin alterar tus componentes UI.',
    },
    {
        question: '¿Cómo impacta una PWA en el SEO y las métricas Core Web Vitals?',
        answer: 'El impacto es sumamente positivo. Al cachear recursos estáticos y servir HTML optimizado, el First Contentful Paint (FCP) y el Largest Contentful Paint (LCP) se reducen drásticamente, obteniendo calificaciones perfectas en Google Lighthouse y mejorando el ranking en buscadores.',
    },
    {
        question: '¿Cómo se gestionan las actualizaciones cuando se publica una nueva versión de la app?',
        answer: 'Implementamos el evento controllerchange y estrategias de auto-actualización con skipWaiting controlado. El usuario puede recibir una notificación sutil invitándolo a actualizar o la app se refresca transparentemente cuando el usuario cierra todas las pestañas.',
    },
];

export const FaqPage = () => {
    const navigate = useNavigate();
    const pageRef = useRef(null);
    const [openIndex, setOpenIndex] = useState(0);

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

            gsap.from('.faq__item', {
                scrollTrigger: {
                    trigger: '.faq__list',
                    start: 'top 85%',
                },
                y: 35,
                opacity: 0,
                scale: 0.96,
                filter: 'blur(8px)',
                stagger: 0.07,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'filter,transform',
            });

            gsap.from('.faq-contact-card', {
                scrollTrigger: {
                    trigger: '.faq-contact-card',
                    start: 'top 85%',
                },
                y: 40,
                opacity: 0,
                scale: 0.95,
                filter: 'blur(8px)',
                duration: 0.85,
                ease: 'power3.out',
                clearProps: 'filter,transform',
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="faq faq-page" ref={pageRef}>
            <div className="faq__container">
                <header className="features__header">
                    <h1 className="features__title">Preguntas Frecuentes</h1>
                    <p className="features__subtitle">
                        Resolvemos las dudas más habituales sobre Service Workers, soporte offline, compatibilidad móvil, SEO y ciclo de vida en React 19.
                    </p>
                </header>

                {/* Acordeón de preguntas */}
                <div className="features__card-wrapper">
                    <div className="faq__list">
                        {faqItems.map((item, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div key={index} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                                    <button
                                        type="button"
                                        className="faq__trigger"
                                        onClick={() => setOpenIndex(isOpen ? null : index)}
                                        aria-expanded={isOpen}
                                    >
                                        <span className="faq__question">{item.question}</span>
                                        <span className="material-symbols-outlined faq__arrow" aria-hidden="true">
                                            {isOpen ? 'expand_less' : 'expand_more'}
                                        </span>
                                    </button>
                                    {isOpen && (
                                        <div className="faq__content">
                                            <p className="faq__answer">{item.answer}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Tarjeta de Contacto / Consulta con Especialista */}
                <div className="features__card-wrapper faq-contact-card" style={{ marginTop: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7e22ce', marginBottom: '6px' }}>
                                <span className="material-symbols-outlined">terminal</span>
                                <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                    Soporte de Arquitectura &amp; Comunidad
                                </strong>
                            </div>
                            <h2 style={{ fontFamily: 'DM Sans', fontSize: '1.35rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                                ¿Necesitas ayuda configurando tu Service Worker o PWA?
                            </h2>
                            <p style={{ color: '#6b7280', fontSize: '0.92rem', marginTop: '6px', marginBottom: 0 }}>
                                Nuestros ingenieros y especialistas en React están listos para revisar tu configuración de Workbox y Vite.
                            </p>
                        </div>
                        <button
                            type="button"
                            className="btn"
                            onClick={() => navigate('/login')}
                        >
                            Consultar con un Especialista
                            <span className="material-symbols-outlined" aria-hidden="true">
                                forum
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
