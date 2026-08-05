import React, { useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

const VideoScroll = () => {
    const videoRef = useRef(null);
    const animationFrameRef = useRef(null);

    const { scrollYProgress } = useScroll();

    // 1. Увеличиваем restDelta, чтобы убрать микро-колебания в конце движения
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 60,
        damping: 25,
        restDelta: 0.01, // 👈 Пружина останавливается сразу, без медленного "ползания"
    });

    // 2. Прозрачность
    const videoOpacity = useTransform(smoothProgress, [0, 0.9], [0.5, 0]);

    // 3. Оптимизированный обработчик видео-скролла
    useMotionValueEvent(smoothProgress, "change", (latest) => {
        const video = videoRef.current;
        if (!video || Number.isNaN(video.duration)) return;

        const targetTime = latest * video.duration;

        // Порог в 1 кадр при 30 FPS (1 / 30 = 0.033 секунды)
        const frameThreshold = 0.033; 

        // 👈 ОБНОВЛЯЕМ ТОЛЬКО ЕСЛИ:
        // 1. Разница больше длительности одного кадра (убираем микро-скорость)
        // 2. Видеодекодер НЕ занят прошлым поском (!video.seeking)
        if (Math.abs(video.currentTime - targetTime) >= frameThreshold && !video.seeking) {
            
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            animationFrameRef.current = requestAnimationFrame(() => {
                if (video) {
                    // Используем fastSeek при наличии, иначе стандартный currentTime
                    if ('fastSeek' in video) {
                        video.fastSeek(targetTime);
                    } else {
                        video.currentTime = targetTime;
                    }
                }
            });
        }
    });

    return (
        <Box
            as={motion.div}
            style={{ opacity: videoOpacity }} 
            position="fixed"
            top={0}
            left={0}
            width="100vw"
            height="100vh"
            zIndex={1}
            pointerEvents="none"
        >
            <Box
                as="video"
                ref={videoRef}
                src="/output_scroll.mp4"
                muted
                playsInline
                preload="auto"
                w="100%"
                h="100%"
                objectFit="cover"
                mixBlendMode="screen"
            />
        </Box>
    );
};

export default VideoScroll;