import React, { useRef } from "react";
import { Box, Center, Text } from "@chakra-ui/react";
import { motion, useScroll, useTransform, useSpring, easeInOut } from "framer-motion";

const MotionBox = motion(Box);

// Компонент принимает name в пропсах
const SkillCard = ({ icon: Icon, color, name }) => {
    const cardRef = useRef(null);

    // 1. Отслеживаем прокрутку относительно КАРТОЧКИ.
    // Мы начинаем отслеживать, когда верх карточки касается низа экрана,
    // и заканчиваем, когда центр карточки достигает центра экрана.
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "center center"],
    });

  // 2. Добавляем инерционное сглаживание скролла (как в LandingSection)
  // Настройки stiffness и damping такие же, как в вашем примере, для одинакового "чувства" анимации.
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 25,
        restDelta: 0.001,
    });

    // 3. Плавная трансформация появления ПО АНАЛОГИИ С ТЕКСТОМ.
    // Заменяем rotation/scale на opacity и y (смещение по вертикали).

    // Появление из прозрачности (от 0 до 1)
    const opacity = useTransform(smoothProgress, [0, 1], [0, 1], { ease: easeInOut });

    // Выплывание снизу вверх (начинаем с 30px ниже, заканчиваем в 0px)
    // Мы используем чуть меньший диапазон сдвига (30), чтобы на маленьких карточках это смотрелось аккуратно.
    const y = useTransform(smoothProgress, [0, 0.8], [30, 0], { ease: easeInOut });

    // (Опционально) Небольшое увеличение масштаба для мягкости
    const scale = useTransform(smoothProgress, [0, 0.8], [0.95, 1], { ease: easeInOut });

    return (
    <Center
        ref={cardRef}
        boxSize={{ base: "80px", md: "300px" }}
        // perspective больше не нужен, так как нет 3D-вращения
    >
        <MotionBox
        w="100%"
        h="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={{ base: 2, md: 4 }}
        border="none"
        outline="none"
        _focus={{ outline: "none" }}
        style={{
            // Применяем анимированные MotionValues к стилям
            opacity: opacity,
            y: y,
            scale: scale,
            cursor: "pointer",
            // transformStyle: "preserve-3d" тоже больше не нужен
        }}
        whileHover={{
            // Легкий эффект при наведении, сохраняем масштаб
            filter: "brightness(1.3)",
            scale: 1.05,
            transition: { duration: 0.2 }
        }}
        >
        {/* Иконка — анимируется вместе с родителем */}
        <Box fontSize={{ base: "42px", md: "94px" }} color={color || "white"}>
            <Icon />
        </Box>

        {/* Подпись под иконкой — анимируется вместе с родителем */}
        {name && (
            <Text
            fontSize={{ base: "14px", md: "24px" }}
            fontWeight="semibold"
            color="white"
            textAlign="center"
            userSelect="none"
            >
            {name}
            </Text>
        )}
        </MotionBox>
    </Center>
    );
};

export default SkillCard;