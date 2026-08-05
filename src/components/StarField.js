import React, { useState, useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const SingleStar = ({ initialStar }) => {
  // Локальное состояние для позиции звезды
    const [position, setPosition] = useState({ x: initialStar.x, y: initialStar.y });
    const [size] = useState(initialStar.size);

    // Генерируем случайную длительность для каждой звезды
    const duration = useMemo(() => Math.random() * 4 + 3, []);

    return (
    <MotionBox
        position="absolute"
        left={`${position.x}%`}
        top={`${position.y}%`}
        // Анимация: от прозрачного к видимому и обратно
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        // Когда анимация повторяется (звезда погасла), меняем координаты
        onRepeatComplete: () => {
            setPosition({
            x: Math.random() * 100,
            y: Math.random() * 100,
            });
        },
        }}
    >
        <Box
        width={`${size * 2}px`}
        height={`${size * 2}px`}
        bg="white"
        borderRadius="full"
        boxShadow={`0 0 ${size * 5}px rgba(255, 255, 255, 0.8)`}
        />
    </MotionBox>
    );
    };

    const StarField = () => {
    // Генерируем начальные звезды
    const stars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, index) => ({
        id: index,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 0.8 + 0.3,
    }));
    }, []);

    return (
    <Box
        position="fixed"
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        overflow="hidden"
        bg="#18181b"
        pointerEvents="none"
        zIndex={0}
    >
        {stars.map((star) => (
        <SingleStar key={star.id} initialStar={star} />
        ))}
    </Box>
    );
};

export default StarField;