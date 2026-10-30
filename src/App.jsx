import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSmoothScroll } from '@/features/landing/components/UseSmoothScroll';

const MainLayout = lazy(() => import('@/features/landing/layouts/MainLayout').then((m) => ({ default: m.MainLayout })));
const HomePage = lazy(() => import('@/features/landing/pages/HomePage').then((m) => ({ default: m.HomePage })));
const BenefitsPage = lazy(() => import('@/features/landing/pages/BenefitsPage').then((m) => ({ default: m.BenefitsPage })));
const FaqPage = lazy(() => import('@/features/landing/pages/FaqPage').then((m) => ({ default: m.FaqPage })));
const PropsPage = lazy(() => import('@/features/landing/pages/PropsPage').then((m) => ({ default: m.PropsPage })));
const RickAndMorty = lazy(() => import('@/features/landing/components/RickAndMorty').then((m) => ({ default: m.RickAndMorty })));
const AuthChoice = lazy(() => import('@/features/auth/components/AuthChoice').then((m) => ({ default: m.AuthChoice })));
const LoginForm = lazy(() => import('@/features/auth/components/LoginForm').then((m) => ({ default: m.LoginForm })));
const RegisterForm = lazy(() => import('@/features/auth/components/RegisterForm').then((m) => ({ default: m.RegisterForm })));
const RecoverPassword = lazy(() => import('@/features/auth/components/RecoverPassword').then((m) => ({ default: m.RecoverPassword })));

const App = () => {
    useSmoothScroll();

    return (
        <Suspense fallback={null}>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/beneficios" element={<BenefitsPage />} />
                    <Route path="/faq" element={<FaqPage />} />
                    <Route path="/rick-and-morty" element={<RickAndMorty />} />
                    <Route path="/props" element={<PropsPage />} />
                </Route>
                <Route path="/login" element={<AuthChoice />} />
                <Route path="/login/iniciar-sesion" element={<LoginForm />} />
                <Route path="/login/crear-cuenta" element={<RegisterForm />} />
                <Route path="/login/recuperar" element={<RecoverPassword />} />
            </Routes>
        </Suspense>
    );
};

export default App;
