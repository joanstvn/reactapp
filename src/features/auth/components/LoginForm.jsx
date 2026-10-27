import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';

/**
 * Formulario de inicio de sesión.
 *
 * @param {Object} props
 * @param {(data: { email: string, password: string }) => void} [props.onSubmit]
 */
export const LoginForm = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (onSubmit) await onSubmit({ email, password });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout backTo="/login">
            <h1 className="auth__title">Iniciar sesión</h1>
            <p className="auth__subtitle">Ingresa tus credenciales para continuar</p>

            <form className="auth__form" onSubmit={handleSubmit} noValidate>
                {/* Correo */}
                <div className="auth__field">
                    <label htmlFor="login-email" className="auth__label">
                        Correo
                    </label>
                    <div className="auth__input-wrap">
                        <input
                            id="login-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=""
                            autoComplete="email"
                            className="auth__input"
                        />
                    </div>
                </div>

                {/* Contraseña */}
                <div className="auth__field">
                    <label htmlFor="login-password" className="auth__label">
                        Contraseña
                    </label>
                    <div className="auth__input-wrap">
                        <input
                            id="login-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=""
                            autoComplete="current-password"
                            className="auth__input"
                        />
                        <button
                            type="button"
                            className="auth__toggle-pw"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        >
                            <span className="material-symbols-outlined" aria-hidden="true">
                                {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="btn auth__submit-btn"
                    disabled={isLoading}
                >
                    {isLoading ? 'Ingresando...' : 'Iniciar sesión'}
                </button>
            </form>

            {/* Olvidé mi contraseña */}
            <button
                type="button"
                className="auth__forgot-btn"
                onClick={() => navigate('/login/recuperar')}
            >
                Olvidé mi contraseña
            </button>

            {/* Switch a registro */}
            <p className="auth__switch">
                ¿No tienes cuenta?{' '}
                <button
                    type="button"
                    className="auth__switch-link"
                    onClick={() => navigate('/login/crear-cuenta')}
                >
                    Crear cuenta
                </button>
            </p>
        </AuthLayout>
    );
};
