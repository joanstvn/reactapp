import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollSection.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Icono de estrella/destello de 4 puntas idéntico a la referencia.
 */
const SparkleIcon = ({ className = '', size = 20 }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        style={{ display: 'block' }}
    >
        <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
    </svg>
);

/**
 * Capacidades clave del ecosistema React 19 & PWA con ritmo editorial.
 */
const scrollItems = [
    'Arquitectura offline-first',
    'Latencia cero al instante',
    'Instalación nativa sin stores',
    'React 19 & Concurrent Mode',
    'Service Workers con precaché',
    'Persistencia con IndexedDB',
    'Core Web Vitals al máximo',
    'Notificaciones Web Push',
    'Sincronización en segundo plano',
];

/**
 * Métricas de rendimiento PWA para la tarjeta sticky.
 */
const statsData = [
    {
        value: '100%',
        labelLine1: 'Lighthouse',
        labelLine2: 'PWA audit',
    },
    {
        value: '0ms',
        labelLine1: 'latencia',
        labelLine2: 'offline',
    },
    {
        value: '<1.2s',
        labelLine1: 'LCP Core',
        labelLine2: 'Web Vitals',
    },
];

const setActive = (activeIndex, items) => {
    items.forEach((item, i) => {
        item.classList.toggle('is-active', i === activeIndex);
    });
};

export const ScrollSection = () => {
    const navigate = useNavigate();
    const sectionRef = useRef(null);
    const listRef = useRef(null);
    const itemsRef = useRef([]);

    useEffect(() => {
        const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReduced) return;

        const ctx = gsap.context(() => {
            const items = itemsRef.current.filter(Boolean);
            if (!items.length) return;

            // Animación suave de entrada para el encabezado
            gsap.from('.scroll-hl__heading > *', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                filter: 'blur(10px)',
                stagger: 0.12,
                duration: 0.9,
                ease: 'power3.out',
                clearProps: 'all',
            });

            // Animación suave de entrada de la tarjeta sticky
            gsap.from('.scroll-hl__card', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
                y: 40,
                opacity: 0,
                scale: 0.96,
                filter: 'blur(12px)',
                duration: 0.9,
                ease: 'power3.out',
                clearProps: 'all',
                delay: 0.1,
            });

            // ScrollTrigger progresivo sobre la lista completa
            ScrollTrigger.create({
                trigger: listRef.current,
                start: 'top 60%',
                end: 'bottom 40%',
                scrub: false,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const totalItems = items.length;
                    const activeIndex = Math.min(
                        Math.floor(progress * totalItems),
                        totalItems - 1
                    );
                    setActive(activeIndex, items);
                },
                onEnter: () => setActive(0, items),
                onLeaveBack: () => setActive(0, items),
            });

            // Primer ítem activo por defecto
            setActive(0, items);
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="scroll-hl" ref={sectionRef}>
            <div className="scroll-hl__container">
                {/* ── Columna Izquierda: Encabezado + Lista con scroll ── */}
                <div className="scroll-hl__left">
                    <div className="scroll-hl__heading">
                        <h2 className="scroll-hl__title">
                            Apps web con ritmo, velocidad y entrega constante.
                        </h2>
                    </div>

                    <ul className="scroll-hl__list" ref={listRef}>
                        {scrollItems.map((text, index) => (
                            <li
                                key={index}
                                className={`scroll-hl__item ${index === 0 ? 'is-active' : ''}`}
                                ref={(el) => (itemsRef.current[index] = el)}
                            >
                                <span className="scroll-hl__star-wrapper">
                                    <SparkleIcon className="scroll-hl__star" size={20} />
                                </span>
                                <span className="scroll-hl__text">{text}</span>
                            </li>
                        ))}
                    </ul>

                    <p className="scroll-hl__description">
                        React 19, Service Workers, Workbox e IndexedDB para creadores que necesitan que cada pantalla cargue en 0ms y funcione sin conexión.
                    </p>
                </div>

                {/* ── Columna Derecha: Tarjeta Sticky ── */}
                <div className="scroll-hl__right">
                    <div className="scroll-hl__card">
                        <div className="scroll-hl__card-header">
                            <h3 className="scroll-hl__card-title">
                                Rendimiento<br />verificado
                            </h3>
                            <SparkleIcon className="scroll-hl__card-star" size={26} />
                        </div>

                        <div className="scroll-hl__card-stats">
                            {statsData.map((stat, index) => (
                                <div className="scroll-hl__card-stat" key={index}>
                                    <span className="scroll-hl__card-value">{stat.value}</span>
                                    <div className="scroll-hl__card-label">
                                        <span>{stat.labelLine1}</span>
                                        <span>{stat.labelLine2}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="scroll-hl__card-footer">
                            <button
                                type="button"
                                className="btn scroll-hl__card-cta"
                                onClick={() => navigate('/beneficios')}
                            >
                                Conocer Beneficios
                                <span className="material-symbols-outlined" aria-hidden="true">
                                    arrow_forward
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
