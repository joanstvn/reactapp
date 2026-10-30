import { useNavigate } from 'react-router-dom';
import './Auth.css';

/**
 * Layout compartido para todas las vistas de autenticación.
 * Provee contenedor, luz ambiental, botón de cierre y tarjeta central.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido de la vista.
 * @param {string} [props.backTo='/'] - Ruta a la que navega el botón de cierre.
 */
export const AuthLayout = ({ children, backTo = '/' }) => {
    const navigate = useNavigate();

    return (
        <>
            <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
            <main id="main-content">
                <section className="auth-container" aria-label="Autenticación">
            <div className="auth__ambient" aria-hidden="true" />

            <button
                type="button"
                className="auth__close-btn"
                onClick={() => navigate(backTo)}
                aria-label="Volver"
            >
                <span className="material-symbols-outlined" aria-hidden="true">
                    close
                </span>
            </button>

            <div className="auth__card">
                {children}
            </div>
                </section>
            </main>
        </>
    );
};
