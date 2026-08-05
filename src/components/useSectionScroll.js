import { useState, useEffect, useRef, useCallback } from 'react';

export const useSectionScroll = (totalSections, lockDuration = 800) => {
    const [activeSection, setActiveSection] = useState(0);
    const isLockedRef = useRef(false);
    const touchStartY = useRef(0);

    const goToSection = useCallback((index) => {
        if (index < 0 || index >= totalSections || isLockedRef.current) return;

        isLockedRef.current = true;
        setActiveSection(index);

        // Блокировка от частых прокруток на время анимации
        setTimeout(() => {
            isLockedRef.current = false;
        }, lockDuration);
    }, [totalSections, lockDuration]);

    const nextSection = useCallback(() => {
        goToSection(activeSection + 1);
    }, [activeSection, goToSection]);

    const prevSection = useCallback(() => {
        goToSection(activeSection - 1);
    }, [activeSection, goToSection]);

    useEffect(() => {
        // Обработка колесика мыши / тачпада
        const handleWheel = (e) => {
            e.preventDefault();
            if (e.deltaY > 0) {
                nextSection();
            } else if (e.deltaY < 0) {
                prevSection();
            }
        };

        // Обработка свайпов на смартфонах
        const handleTouchStart = (e) => {
            touchStartY.current = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            if (isLockedRef.current) return;
            const touchEndY = e.touches[0].clientY;
            const diff = touchStartY.current - touchEndY;

            if (Math.abs(diff) > 50) { // Порог свайпа 50px
                if (diff > 0) nextSection();
                else prevSection();
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [nextSection, prevSection]);

    return { activeSection, goToSection };
};