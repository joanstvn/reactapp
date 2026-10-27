import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';

/**
 * Formulario de registro / crear cuenta.
 *
 * @param {Object} props
 * @param {(data: { name: string, email: string, password: string }) => void} [props.onSubmit]
 */
export const RegisterForm = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (onSubmit) await onSubmit({ name, email, password });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout backTo="/login">
            <h1 className="auth__title">Crear cuenta</h1>
            <p className="auth__subtitle">Completa tus datos para registrarte</p>

            <form className="auth__form" onSubmit={handleSubmit} noValidate>
                {/* Nombre */}
                <div className="auth__field">
                    <label htmlFor="register-name" className="auth__label">
                        Nombre
                    </label>
                    <div className="auth__input-wrap">
                        <input
                            id="register-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder=""
                            autoComplete="name"
                            className="auth__input"
                        />
                    </div>
                </div>

                {/* Correo */}
                <div className="auth__field">
                    <label htmlFor="register-email" className="auth__label">
                        Correo
                    </label>
                    <div className="auth__input-wrap">
                        <input
                            id="register-email"
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
                    <label htmlFor="register-password" className="auth__label">
                        Contraseña
                    </label>
                    <div className="auth__input-wrap">
                        <input
                            id="register-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=""
                            autoComplete="new-password"
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

                {/* Confirmar contraseña */}
                <div className="auth__field">
                    <label htmlFor="register-confirm" className="auth__label">
                        Confirmar contraseña
                    </label>
                    <div className="auth__input-wrap">
                        <input
                            id="register-confirm"
                            type={showConfirm ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder=""
                            autoComplete="new-password"
                            className="auth__input"
                        />
                        <button
                            type="button"
                            className="auth__toggle-pw"
                            onClick={() => setShowConfirm((prev) => !prev)}
                            aria-label={showConfirm ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        >
                            <span className="material-symbols-outlined" aria-hidden="true">
                                {showConfirm ? 'visibility_off' : 'visibility'}
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
                    {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
                </button>
            </form>

            {/* Switch a login */}
            <p className="auth__switch">
                ¿Ya tienes cuenta?{' '}
                <button
                    type="button"
                    className="auth__switch-link"
                    onClick={() => navigate('/login/iniciar-sesion')}
                >
                    Iniciar sesión
                </button>
            </p>
        </AuthLayout>
    );
};
