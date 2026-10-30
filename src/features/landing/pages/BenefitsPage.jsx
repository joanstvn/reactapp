import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
    {
        title: 'Sincronización en Segundo Plano',
        description: 'Encolado inteligente con Background Sync y notificaciones Web Push cifradas de extremo a extremo.',
        iconName: 'sync_saved_locally',
    },
    {
        title: 'Lighthouse 100 & Core Web Vitals',
        description: 'Cumplimiento estricto de Google: LCP inferior a 1.2s y CLS cercano a 0 para máxima velocidad.',
        iconName: 'verified',
    },
];

export const BenefitsPage = () => {
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

            gsap.from('.feature-card', {
                scrollTrigger: {
                    trigger: '.features__grid',
                    start: 'top 85%',
                },
                y: 40,
                opacity: 0,
                scale: 0.94,
                filter: 'blur(8px)',
                stagger: 0.08,
                duration: 0.85,
                ease: 'power3.out',
                clearProps: 'filter,transform',
            });

            gsap.from('.features__footer-note', {
                scrollTrigger: {
                    trigger: '.features__footer-note',
                    start: 'top 90%',
                },
                y: 25,
                opacity: 0,
                filter: 'blur(6px)',
                duration: 0.75,
                ease: 'power3.out',
                clearProps: 'filter,transform',
            });

            gsap.from('.comparison-card', {
                scrollTrigger: {
                    trigger: '.comparison-card',
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
        <section className="features benefits-page" ref={pageRef}>
            <div className="features__container">
                <header className="features__header">
                    <h1 className="features__title">Estándares PWA &amp; React</h1>
                    <p className="features__subtitle">
                        Cada módulo y arquitectura se evalúa bajo rigurosos controles de rendimiento, compatibilidad offline con Service Workers y estándares de Google Lighthouse.
                    </p>
                </header>

                {/* Isla blanca con 5 tarjetas principales */}
                <div className="features__card-wrapper">
                    <div className="features__grid">
                        {pharmaStandards.map(({ title, description, iconName }) => (
                            <article className="feature-card" key={title}>
                                <div className="feature-card__icon">
                                    <span className="material-symbols-outlined">{iconName}</span>
                                </div>
                                <h2 className="feature-card__title">{title}</h2>
                                <p className="feature-card__desc">{description}</p>
                            </article>
                        ))}
                    </div>

                    {/* Barra de sellos de calidad */}
                    <div className="features__footer-note" style={{ marginTop: '24px' }}>
                        <span className="features__footer-label">Estándares W3C:</span>
                        <span className="features__footer-techs">
                            Service Worker Level 3 · Web App Manifest Compliant · React 19 Core · Lighthouse 100/100 · HTTPS &amp; HSTS Ready
                        </span>
                    </div>
                </div>

                {/* Sección Comparativa */}
                <div className="features__card-wrapper comparison-card" style={{ marginTop: '16px' }}>
                    <h2 style={{ fontFamily: 'DM Sans', fontSize: '1.4rem', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
                        Diferencias: Web Apps Tradicionales vs. Progressive Web Apps con React 19
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '24px' }}>
                        Comparativa técnica de resiliencia de red, tiempos de carga e instalación nativa según métricas Core Web Vitals.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '16px' }}>
                        <div style={{ background: '#fef2f2', padding: '24px', borderRadius: '18px', border: '1px solid #fee2e2' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#dc2626' }}>
                                <span className="material-symbols-outlined">cancel</span>
                                <strong style={{ fontSize: '1.05rem' }}>Webs Tradicionales (SPA Clásicas)</strong>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: '#7f1d1d' }}>
                                <li>✖ Pantalla en blanco ante desconexión o caídas de red.</li>
                                <li>✖ Descarga redundante de bundles en cada navegación.</li>
                                <li>✖ Requieren empaquetado nativo pesado (100MB+) para instalarse.</li>
                                <li>✖ Bloqueo del hilo principal e interactividad deficiente.</li>
                            </ul>
                        </div>

                        <div style={{ background: '#f5f3ff', padding: '24px', borderRadius: '18px', border: '1px solid #ede9fe' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#7c22ce' }}>
                                <span className="material-symbols-outlined">check_circle</span>
                                <strong style={{ fontSize: '1.05rem' }}>Progressive Web Apps (React 19)</strong>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: '#4c1d95' }}>
                                <li>✓ Carga instantánea y operatividad offline completa con Service Workers.</li>
                                <li>✓ Precaché inteligente stale-while-revalidate con Workbox.</li>
                                <li>✓ Instalación instantánea en 1 clic ocupando menos de 3MB.</li>
                                <li>✓ 60 FPS estables con React Concurrent Mode y compresión Brotli.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
