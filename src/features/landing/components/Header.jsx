import { useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import './Header.css';

gsap.registerPlugin(Flip);

const ELASTIC_EASE = 'elastic.out(0.7, 0.55)';

export const Header = () => {
    const navRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const navEl = navRef.current;
        if (!navEl) return;

        const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let isStuck = false;

        const updateState = (stuck) => {
            if (stuck === isStuck) return;
            isStuck = stuck;

            const isMobile = window.innerWidth <= 860;
            if (isReduced || isMobile) {
                navEl.classList.toggle('is-stuck', isStuck);
                return;
            }

            // 1. Grabar estado Flip de todos los elementos marcados con data-flip
            const flipState = Flip.getState(navEl.querySelectorAll('[data-flip]'), {
                props: 'backgroundColor,boxShadow',
            });

            // 2. Alternar la clase de layout
            navEl.classList.toggle('is-stuck', isStuck);
            navEl.classList.add('is-flipping');

            const onComplete = () => {
                navEl.classList.remove('is-flipping');
            };

            // 3. Ejecutar la animación elástica FLIP
            Flip.from(flipState, {
                duration: 0.95,
                ease: ELASTIC_EASE,
                absolute: true,
                scale: true,
                nested: true,
                onComplete,
                onInterrupt,
            });

            function onInterrupt() {
                onComplete();
            }
        };

        const handleScroll = () => {
            const scrollTop =
                window.scrollY ||
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0;
            updateState(scrollTop > 24);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            gsap.killTweensOf(navEl.querySelectorAll('[data-flip]'));
        };
    }, []);

    return (
        <>
            <header className="nav" ref={navRef} data-nav>
                <div className="nav__inner">
                    {/* 1. Logo Brand (Izquierda en reposo, píldora centrada al scrollear en desktop) */}
                    <NavLink to="/" className="nav__brand" data-flip aria-label="softapp - Plataforma React & PWA">
                        softapp
                    </NavLink>

                    {/* 2. Menú Cápsula Desktop (Centro en reposo, fusionado con glass al scrollear) */}
                    <nav className="nav__links" data-flip aria-label="Navegación principal">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
                        >
                            Inicio
                        </NavLink>
                        <NavLink
                            to="/beneficios"
                            className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
                        >
                            Beneficios
                        </NavLink>
                        <NavLink
                            to="/faq"
                            className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
                        >
                            Preguntas
                        </NavLink>
                        <NavLink
                            to="/rick-and-morty"
                            className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
                        >
                            Rick & Morty
                        </NavLink>
                        <NavLink
                            to="/props"
                            className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
                        >
                            Props
                        </NavLink>
                    </nav>

                    {/* 3. Botón CTA Desktop (Derecha en reposo, se junta al centro elásticamente) */}
                    <div className="nav__actions" data-flip>
                        <button
                            type="button"
                            className="btn nav__cta"
                            onClick={() => navigate('/login')}
                        >
                            Ingresar
                            <span className="material-symbols-outlined" aria-hidden="true">
                                person
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Dock Flotante Móvil (Estilo Dock de celulares) ── */}
            <nav className="mobile-dock" aria-label="Navegación móvil tipo dock">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => `mobile-dock__item ${isActive ? 'is-active' : ''}`}
                    aria-label="Ir a Inicio"
                >
                    <span className="material-symbols-outlined mobile-dock__icon" aria-hidden="true">home</span>
                    <span className="mobile-dock__label">Inicio</span>
                </NavLink>

                <NavLink
                    to="/beneficios"
                    className={({ isActive }) => `mobile-dock__item ${isActive ? 'is-active' : ''}`}
                    aria-label="Ir a Beneficios"
                >
                    <span className="material-symbols-outlined mobile-dock__icon" aria-hidden="true">auto_awesome</span>
                    <span className="mobile-dock__label">Beneficios</span>
                </NavLink>

                <NavLink
                    to="/faq"
                    className={({ isActive }) => `mobile-dock__item ${isActive ? 'is-active' : ''}`}
                    aria-label="Ir a Preguntas Frecuentes"
                >
                    <span className="material-symbols-outlined mobile-dock__icon" aria-hidden="true">help</span>
                    <span className="mobile-dock__label">Preguntas</span>
                </NavLink>

                <NavLink
                    to="/rick-and-morty"
                    className={({ isActive }) => `mobile-dock__item ${isActive ? 'is-active' : ''}`}
                    aria-label="Rick & Morty"
                >
                    <span className="material-symbols-outlined mobile-dock__icon" aria-hidden="true">science</span>
                    <span className="mobile-dock__label">Rick & Morty</span>
                </NavLink>

                <NavLink
                    to="/props"
                    className={({ isActive }) => `mobile-dock__item ${isActive ? 'is-active' : ''}`}
                    aria-label="Ir a Props Playground"
                >
                    <span className="material-symbols-outlined mobile-dock__icon" aria-hidden="true">tune</span>
                    <span className="mobile-dock__label">Props</span>
                </NavLink>

                {/* Botón Iniciar Sesión / Acceso prioritario */}
                <NavLink
                    to="/login"
                    className={({ isActive }) => `mobile-dock__item mobile-dock__item--cta ${isActive ? 'is-active' : ''}`}
                    aria-label="Acceder"
                >
                    <span className="material-symbols-outlined mobile-dock__icon" aria-hidden="true">account_circle</span>
                    <span className="mobile-dock__label">Acceder</span>
                </NavLink>
            </nav>
        </>
    );
};
