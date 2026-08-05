import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 1. Игнорируем скачки адресной строки
ScrollTrigger.config({ 
    ignoreMobileResize: true 
});

export const useSmoothSnap = () => {
    useEffect(() => {
    const mm = gsap.matchMedia();

    // 💻 Только для десктопов (от 768px и выше) включаем pin
    mm.add("(min-width: 768px)", () => {
        const DEFAULT_PIN_DISTANCE = 300;
        const triggers = [];
        const sections = document.querySelectorAll("[data-snap]");

        sections.forEach((section) => {
        const align = section.getAttribute("data-snap") || "center";
        const customDistance = section.getAttribute("data-pin-distance");
        const pinDistance = customDistance ? parseInt(customDistance, 10) : DEFAULT_PIN_DISTANCE;

        let startPos = "top top";
        if (align === "center") {
            startPos = "center center";
        } else if (align === "end") {
            startPos = "bottom bottom";
        }

        const trigger = ScrollTrigger.create({
            trigger: section,
            start: startPos,
            end: `+=${pinDistance}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
        });

        triggers.push(trigger);
        });

        return () => {
        triggers.forEach((t) => t.kill());
        };
    });

    // 📱 На мобильных (до 767px) pin полностью отключен — сайт скроллится нативно без миганий

    return () => {
        mm.revert();
    };
    }, []);
};