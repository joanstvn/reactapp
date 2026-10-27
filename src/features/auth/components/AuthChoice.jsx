import { useNavigate } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';

/**
 * Vista hub de autenticación.
 * Permite al usuario elegir entre iniciar sesión o crear una cuenta nueva.
 *
 * @param {Object} props
 * @param {() => void} [props.onGoogleLogin] - Callback para autenticación con Google.
 */
export const AuthChoice = ({ onGoogleLogin }) => {
    const navigate = useNavigate();

    return (
        <AuthLayout backTo="/">
            <h1 className="auth__title">Portal softapp</h1>
            <p className="auth__subtitle">Accede para gestionar tus proyectos React y módulos PWA</p>

            {/* Opciones principales */}
            <div className="auth__choices">
                <button
                    type="button"
                    className="auth__choice-btn auth__choice-btn--primary"
                    onClick={() => navigate('/login/iniciar-sesion')}
                >
                    <span className="material-symbols-outlined" aria-hidden="true">
                        login
                    </span>
                    Iniciar sesión
                </button>

                <button
                    type="button"
                    className="auth__choice-btn auth__choice-btn--secondary"
                    onClick={() => navigate('/login/crear-cuenta')}
                >
                    <span className="material-symbols-outlined" aria-hidden="true">
                        person_add
                    </span>
                    Crear cuenta
                </button>
            </div>

            {/* Divisor */}
            <div className="auth__divider">
                <span>o</span>
            </div>

            {/* Google */}
            <button
                type="button"
                className="auth__google-btn"
                onClick={onGoogleLogin}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.36 7.33 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                </svg>
                <span>Continuar con Google</span>
            </button>

            {/* Términos */}
            <p className="auth__terms">
                Al continuar aceptas los{' '}
                <a href="#terms" className="auth__terms-link">Términos</a>{' '}
                y el{' '}
                <a href="#privacy" className="auth__terms-link">Aviso de privacidad</a>.
            </p>
        </AuthLayout>
    );
};
