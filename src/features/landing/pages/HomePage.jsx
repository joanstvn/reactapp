import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SmokeCanvas } from '../components/SmokeCanvas';
import { ScrollSection } from '../components/ScrollSection';
import '../components/Main.css';

gsap.registerPlugin(ScrollTrigger);

const pharmaStandards = [
    {
        title: 'Arquitectura Offline-First',
        description: 'Service Workers y CacheStorage para que tu aplicación cargue en 0ms y funcione sin internet.',
        iconName: 'cloud_off',
    },
    {
        title: 'React 19 & 60 FPS',
        description: 'Concurrent Mode y transiciones optimizadas para un Interaction to Next Paint menor a 50ms.',
        iconName: 'bolt',
    },
    {
        title: 'Instalación Nativa Standalone',
        description: 'Instalable en Android, iOS, Windows y macOS sin pasar por tiendas de aplicaciones ni comisiones.',
        iconName: 'install_desktop',
    },
];

const treatmentSteps = [
    {
        step: '01',
        title: 'Auditoría & Manifiesto PWA',
        description: 'Configuramos el Web App Manifest con íconos maskable y la política de precaché para tu stack.',
        iconName: 'terminal',
    },
    {
        step: '02',
        title: 'Inyección de Service Worker & Cache',
        description: 'Integramos Workbox y estrategias stale-while-revalidate con ciclo de vida reactivo sin fricción.',
        iconName: 'memory',
    },
    {
        step: '03',
        title: 'Despliegue & Instalabilidad 100%',
        description: 'Publicación de tu PWA lista para instalar en escritorios y móviles con auditoría Lighthouse 100/100.',
        iconName: 'rocket_launch',
    },
];

export const HomePage = () => {
    const navigate = useNavigate();
    const pageRef = useRef(null);
    const titleRef = useRef(null);
    const eyebrowRef = useRef(null);
    const statsRef = useRef(null);

    // Seleccionamos módulos para destacar
    const topStandards = pharmaStandards.slice(0, 3);

    useEffect(() => {
        const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReduced) return;

        const ctx = gsap.context(() => {
            const chars = titleRef.current?.querySelectorAll('.hero__char');
            if (chars && chars.length) {
                gsap.from(chars, {
                    yPercent: 70,
                    opacity: 0,
                    duration: 1.05,
                    ease: 'back.out(2.4)',
                    stagger: 0.035,
                    delay: 0.15,
                    clearProps: 'all',
                });
            }

            const secondary = [eyebrowRef.current, statsRef.current].filter(Boolean);
            gsap.fromTo(
                secondary,
                { opacity: 0, y: 20, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'expo.out', stagger: 0.12, delay: 0.4, clearProps: 'all' }
            );

            gsap.to('.hero__panel', {
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.5,
                },
                scale: 0.97,
                opacity: 0.9,
                yPercent: 6,
            });

            // Animaciones de las secciones de resumen
            gsap.from('.home-preview__header > *', {
                scrollTrigger: {
                    trigger: '.home-preview',
                    start: 'top 82%',
                },
                y: 35,
                opacity: 0,
                filter: 'blur(8px)',
                stagger: 0.1,
                duration: 0.85,
                ease: 'power3.out',
            });

            gsap.from('.home-preview .minimal-card', {
                scrollTrigger: {
                    trigger: '.features__grid-bento',
                    start: 'top 85%',
                },
                y: 40,
                opacity: 0,
                scale: 0.94,
                filter: 'blur(8px)',
                stagger: 0.1,
                duration: 0.85,
                ease: 'power3.out',
            });

            gsap.from('.features .features__header > *', {
                scrollTrigger: {
                    trigger: '.features',
                    start: 'top 82%',
                },
                y: 35,
                opacity: 0,
                filter: 'blur(8px)',
                stagger: 0.1,
                duration: 0.85,
                ease: 'power3.out',
            });

            gsap.from('.home-standards-grid .feature-card', {
                scrollTrigger: {
                    trigger: '.home-standards-grid',
                    start: 'top 85%',
                },
                y: 30,
                opacity: 0,
                scale: 0.96,
                duration: 0.75,
                ease: 'power3.out',
                stagger: 0.08,
                clearProps: 'transform',
            });

            // Animaciones de la sección de Proceso en 3 Pasos
            gsap.from('.steps .features__header > *', {
                scrollTrigger: {
                    trigger: '.steps',
                    start: 'top 82%',
                },
                y: 35,
                opacity: 0,
                filter: 'blur(8px)',
                stagger: 0.1,
                duration: 0.85,
                ease: 'power3.out',
            });

            gsap.from('.steps .step-card', {
                scrollTrigger: {
                    trigger: '.steps__grid',
                    start: 'top 85%',
                },
                y: 30,
                opacity: 0,
                scale: 0.96,
                stagger: 0.1,
                duration: 0.75,
                ease: 'power3.out',
                clearProps: 'transform',
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <main id="top" ref={pageRef}>
            {/* ── Hero Panel ── */}
            <section className="hero">
                <div className="hero__panel">
                    <SmokeCanvas />

                    <div className="hero__content">
                        <dl className="hero__stats" ref={statsRef}>
                            <div className="hero__stat">
                                <dt className="hero__stat-value">100%</dt>
                                <dd className="hero__stat-label">Lighthouse PWA</dd>
                            </div>
                            <div className="hero__stat">
                                <dt className="hero__stat-value">0ms</dt>
                                <dd className="hero__stat-label">latencia offline</dd>
                            </div>
                            <div className="hero__stat">
                                <dt className="hero__stat-value">&lt;1.2s</dt>
                                <dd className="hero__stat-label">LCP garantizado</dd>
                            </div>
                        </dl>

                        <div className="hero__bottom">
                            <p className="hero__eyebrow" ref={eyebrowRef}>
                                Ecosistema React 19 &amp; Progressive Web Apps
                            </p>

                            <h1 className="hero__name" ref={titleRef}>
                                {'softapp'.split('').map((char, index) => (
                                    <span key={index} className="hero__char">
                                        <span className="hero__char-inner">{char}</span>
                                    </span>
                                ))}
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Scroll Section: Sección interactiva con ritmo ── */}
            <ScrollSection />

            {/* ── Sección Bento: Qué hacemos (Inspirada exactamente en la imagen de referencia) ── */}
            <section className="catalog home-preview">
                <div className="catalog__container">
                    <header className="features__header home-preview__header">
                        <h2 className="features__title">Qué hacemos</h2>
                        <p className="features__subtitle">
                            No solo construimos interfaces React. Diseñamos arquitectura web nativa pensada para el rendimiento extremo y la retención de tus usuarios.
                        </p>
                    </header>

                    <div className="features__card-wrapper">
                        <div className="features__grid-bento">
                            <article className="minimal-card">
                                <div className="minimal-card__icon">
                                    <span className="material-symbols-outlined">cloud_off</span>
                                </div>
                                <h3 className="minimal-card__title">Arquitectura offline-first</h3>
                                <p className="minimal-card__desc">
                                    Service Workers y CacheStorage para que tu aplicación cargue en 0ms y funcione sin internet.
                                </p>
                            </article>

                            <article className="minimal-card">
                                <div className="minimal-card__icon">
                                    <span className="material-symbols-outlined">bolt</span>
                                </div>
                                <h3 className="minimal-card__title">React 19 &amp; 60 FPS</h3>
                                <p className="minimal-card__desc">
                                    Concurrent Mode y transiciones optimizadas para un Interaction to Next Paint menor a 50ms.
                                </p>
                            </article>

                            <article className="minimal-card">
                                <div className="minimal-card__icon">
                                    <span className="material-symbols-outlined">install_mobile</span>
                                </div>
                                <h3 className="minimal-card__title">Instalación nativa</h3>
                                <p className="minimal-card__desc">
                                    Instalable en Android, iOS, Windows y macOS sin pasar por tiendas de aplicaciones ni comisiones.
                                </p>
                            </article>

                            <article className="minimal-card">
                                <div className="minimal-card__icon">
                                    <span className="material-symbols-outlined">storage</span>
                                </div>
                                <h3 className="minimal-card__title">Persistencia con IndexedDB</h3>
                                <p className="minimal-card__desc">
                                    Almacenamiento transaccional de alta capacidad que sincroniza en segundo plano al reconectar.
                                </p>
                            </article>

                            <article className="minimal-card">
                                <div className="minimal-card__icon">
                                    <span className="material-symbols-outlined">verified</span>
                                </div>
                                <h3 className="minimal-card__title">Estándares Google Lighthouse 100/100</h3>
                                <p className="minimal-card__desc">
                                    Cumplimiento estricto de Core Web Vitals, Web App Manifest y seguridad HTTPS. Creamos experiencias web que se sienten indistinguibles de una aplicación nativa.
                                </p>
                            </article>
                        </div>

                        {/* Pie de tecnologías estilo imagen de referencia */}
                        <div className="features__footer-note" style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '14px', textAlign: 'center' }}>
                            <span style={{ fontSize: '0.92rem', color: '#6b7280' }}>
                                Trabajamos con <strong style={{ color: '#111827', fontWeight: 600 }}>React 19 · Service Workers · Workbox · Web App Manifest · IndexedDB</strong>
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Resumen de Pilares de Calidad ── */}
            <section className="features">
                <div className="features__container">
                    <header className="features__header">
                        <h2 className="features__title">Estándares PWA &amp; React</h2>
                        <p className="features__subtitle">
                            Arquitectura offline-first, cumplimiento estricto de Web App Manifest y optimizaciones avanzadas para Core Web Vitals.
                        </p>
                    </header>

                    <div className="features__card-wrapper">
                        <div className="features__grid home-standards-grid">
                            {topStandards.map(({ title, description, iconName }) => (
                                <article className="feature-card" key={title}>
                                    <div className="feature-card__icon">
                                        <span className="material-symbols-outlined">{iconName}</span>
                                    </div>
                                    <h3 className="feature-card__title">{title}</h3>
                                    <p className="feature-card__desc">{description}</p>
                                </article>
                            ))}
                        </div>

                        <div className="features__footer-note" style={{ marginTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                            <span style={{ fontSize: '0.92rem', color: '#6b7280' }}>
                                <strong style={{ color: '#374151', fontWeight: 600 }}>Estándares:</strong> Service Worker L3 · Web App Manifest · React 19 · Lighthouse 100/100
                            </span>
                            <button
                                type="button"
                                className="btn"
                                onClick={() => navigate('/beneficios')}
                            >
                                Conocer Todos los Estándares
                                <span className="material-symbols-outlined" aria-hidden="true">
                                    verified
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Resumen del Proceso en 3 Pasos ── */}
            <section className="steps">
                <div className="steps__container">
                    <header className="features__header">
                        <h2 className="features__title">Tu PWA React en 3 Pasos</h2>
                        <p className="features__subtitle">
                            Desde la auditoría y configuración del manifiesto hasta el registro del Service Worker y la instalación nativa.
                        </p>
                    </header>

                    <div className="features__card-wrapper">
                        <div className="steps__grid">
                            {treatmentSteps.map((step) => (
                                <article className="step-card" key={step.step}>
                                    <div className="step-card__top">
                                        <span className="step-card__num">{step.step}</span>
                                        <div className="step-card__icon">
                                            <span className="material-symbols-outlined">{step.iconName}</span>
                                        </div>
                                    </div>
                                    <h3 className="step-card__title">{step.title}</h3>
                                    <p className="step-card__desc">{step.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
