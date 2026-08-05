import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Box } from '@chakra-ui/react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

// Укажите точное количество JPG-кадров в вашей папке
const TOTAL_FRAMES = 153; 

const VideoScrollCanvas = () => {
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    
    const imagesLoadedRef = useRef(false); 
    const rafIdRef = useRef(null);
    const lastFrameIndexRef = useRef(-1);

    const { scrollYProgress } = useScroll();

    // Плавность прокрутки
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 600,
        damping: 50,
        restDelta: 0.001,
    });

    const opacity = useTransform(smoothProgress, [0, 0.9], [0.3 , 0]);

    // Функция отрисовки кадра на Canvas
    const renderFrame = useCallback((index) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false }); // alpha: false увеличивает производительность
        const img = imagesRef.current[index];

        if (img && img.complete && img.naturalWidth !== 0) {
            // Эффект object-fit: cover
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);
            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            ctx.drawImage(
                img,
                0, 0, 
                img.width, 
                img.height,
                centerShift_x, 
                centerShift_y, 
                img.width * ratio, 
                img.height * ratio
            );
            
            lastFrameIndexRef.current = index;
        }
    }, []);

    // Обновление кадра по скроллу
    const updateFrameByProgress = useCallback((progressValue) => {
        if (!imagesLoadedRef.current) return;

        const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.floor(progressValue * TOTAL_FRAMES))
        );

        if (rafIdRef.current) {
            cancelAnimationFrame(rafIdRef.current);
        }

        rafIdRef.current = requestAnimationFrame(() => renderFrame(frameIndex));
    }, [renderFrame]);

    // Предзагрузка JPG-кадров
    useEffect(() => {
        let cancelled = false;
        let loadedCount = 0;
        const loadedImages = [];

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            const frameIndex = String(i).padStart(4, '0');
            img.src = `/frames/frame_${frameIndex}.jpg`;

            const markLoaded = () => {
                loadedCount++;
                if (loadedCount === TOTAL_FRAMES && !cancelled) {
                    imagesLoadedRef.current = true;
                    setImagesLoaded(true);
                }
            };

            img.decode()
                .then(markLoaded)
                .catch(markLoaded);

            loadedImages.push(img);
        }
        imagesRef.current = loadedImages;

        return () => { cancelled = true; };
    }, []);

    // Привязка скролла
    useMotionValueEvent(smoothProgress, "change", (latest) => {
        updateFrameByProgress(latest);
    });

    // Управление размером Canvas без мигания
    useEffect(() => {
        if (!imagesLoaded) return;

        const canvas = canvasRef.current;

        const resizeCanvas = () => {
            if (!canvas) return;
            // Используем window.screen.height/width или innerWidth/innerHeight
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Перерисовываем текущий кадр после ресайза
            if (lastFrameIndexRef.current !== -1) {
                renderFrame(lastFrameIndexRef.current);
            } else {
                updateFrameByProgress(smoothProgress.get());
            }
        };

        // Первоначальный размер
        resizeCanvas();

        let prevWidth = window.innerWidth;

        const handleResize = () => {
            // 🎯 КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: Меняем размер Canvas ТОЛЬКО при изменении ширины (поворот экрана),
            // чтобы не сбрасывать буфер при выплывании панели браузера.
            if (window.innerWidth !== prevWidth) {
                prevWidth = window.innerWidth;
                resizeCanvas();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [imagesLoaded, smoothProgress, updateFrameByProgress, renderFrame]);

    return (
        <Box
            as={motion.div}
            style={{ 
                opacity,
                transform: "translateZ(0)", 
                WebkitTransform: "translateZ(0)",
                willChange: "transform, opacity"
            }}
            position="fixed"
            top={0}
            left={0}
            width="100vw"
            height="100vmax" // Гарантирует покрытие всей высоты с запасом
            zIndex={2}
            pointerEvents="none"
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'block',
                }}
            />
        </Box>
    );
};

export default VideoScrollCanvas;