import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/features/landing/layouts/MainLayout';
import { HomePage } from '@/features/landing/pages/HomePage';
import { BenefitsPage } from '@/features/landing/pages/BenefitsPage';
import { FaqPage } from '@/features/landing/pages/FaqPage';
import { PropsPage } from '@/features/landing/pages/PropsPage';
import { AuthChoice } from '@/features/auth/components/AuthChoice';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { RecoverPassword } from '@/features/auth/components/RecoverPassword';
import { useSmoothScroll } from '@/features/landing/components/UseSmoothScroll';
import { RickAndMorty } from '@/features/landing/components/RickAndMorty';

const App = () => {
    useSmoothScroll();

    return (
        <Routes>
            {/* Rutas principales con Header, Footer y scroll reset coordinados */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/beneficios" element={<BenefitsPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/rick-and-morty" element={<RickAndMorty />} />
                <Route path="/props" element={<PropsPage />} />
            </Route>

            {/* Rutas de autenticación y portal de desarrolladores */}
            <Route path="/login" element={<AuthChoice />} />
            <Route path="/login/iniciar-sesion" element={<LoginForm />} />
            <Route path="/login/crear-cuenta" element={<RegisterForm />} />
            <Route path="/login/recuperar" element={<RecoverPassword />} />
        </Routes>
    );
};

export default App;
