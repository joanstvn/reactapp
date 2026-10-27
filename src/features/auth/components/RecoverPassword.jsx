import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';

/**
 * Formulario de recuperación de contraseña.
 * Muestra un campo de correo y, tras enviarlo, un mensaje de confirmación.
 *
 * @param {Object} props
 * @param {(data: { email: string }) => void} [props.onSubmit]
 */
export const RecoverPassword = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (onSubmit) await onSubmit({ email });
            setIsSent(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout backTo="/login/iniciar-sesion">
            {!isSent ? (
                <>
                    <h1 className="auth__title">Recuperar contraseña</h1>
                    <p className="auth__subtitle">
                        Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                    </p>

                    <form className="auth__form" onSubmit={handleSubmit} noValidate>
                        {/* Correo */}
                        <div className="auth__field">
                            <label htmlFor="recover-email" className="auth__label">
                                Correo
                            </label>
                            <div className="auth__input-wrap">
                                <input
                                    id="recover-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder=""
                                    autoComplete="email"
                                    className="auth__input"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="btn auth__submit-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Enviando...' : 'Enviar enlace'}
                        </button>
                    </form>

                    {/* Volver */}
                    <p className="auth__switch">
                        ¿Recordaste tu contraseña?{' '}
                        <button
                            type="button"
                            className="auth__switch-link"
                            onClick={() => navigate('/login/iniciar-sesion')}
                        >
                            Iniciar sesión
                        </button>
                    </p>
                </>
            ) : (
                /* Estado de éxito */
                <div className="auth__success">
                    <div className="auth__success-icon">
                        <span className="material-symbols-outlined" aria-hidden="true">
                            mark_email_read
                        </span>
                    </div>
                    <h2 className="auth__success-title">Revisa tu correo</h2>
                    <p className="auth__success-text">
                        Enviamos un enlace de recuperación a <strong>{email}</strong>. Revisa tu bandeja de entrada.
                    </p>
                    <button
                        type="button"
                        className="btn auth__submit-btn"
                        onClick={() => navigate('/login/iniciar-sesion')}
                        style={{ marginTop: 16 }}
                    >
                        Volver a iniciar sesión
                    </button>
                </div>
            )}
        </AuthLayout>
    );
};
