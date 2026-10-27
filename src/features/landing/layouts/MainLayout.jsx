import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const MainLayout = () => {
    const { pathname } = useLocation();

    // Resetear posición de scroll al cambiar de página
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [pathname]);

    return (
        <>
            <Header />
            <Outlet />
            <Footer key={pathname} />
        </>
    );
};
