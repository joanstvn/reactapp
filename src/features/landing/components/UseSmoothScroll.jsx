import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const useSmoothScroll = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
        });

        lenis.on('scroll', ScrollTrigger.update);

        const tickerCallback = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(500, 33);

        const handleAnchorClick = (e) => {
            const anchor = e.target.closest('a[href^="#"]');
            if (!anchor) return;

            const href = anchor.getAttribute('href');
            if (!href) return;

            if (href === '#' || href === '#top') {
                e.preventDefault();
                lenis.scrollTo(0, { duration: 1.2 });
                return;
            }

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                lenis.scrollTo(targetElement, { offset: 0, duration: 1.2 });
            }
        };

        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) setTimeout(() => lenis.scrollTo(target, { immediate: true }), 50);
        }

        document.addEventListener('click', handleAnchorClick);

        return () => {
            document.removeEventListener('click', handleAnchorClick);
            gsap.ticker.remove(tickerCallback);
            lenis.destroy();
        };
    }, []);
};
