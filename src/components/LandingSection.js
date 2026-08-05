import React, { useRef } from "react";
import { Avatar, Heading, VStack, Box } from "@chakra-ui/react";
import { motion, useScroll, useTransform, useSpring, easeInOut } from "framer-motion";
import FullScreenSection from "./FullScreenSection";
import logo from "../images/image.png";

const greeting = "Hello, I am Sergei!";
const bio1 = "Full stack developer";

const MotionAvatar = motion(Avatar);
const MotionHeading = motion(Heading);

const LandingSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 1. Инерционное сглаживание скролла
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // 2. Плавная трансформация со сглаженными диапазонами и меньшим сдвигом по Y
  const avatarOpacity = useTransform(smoothProgress, [0, 0.25], [1, 1]);
  const avatarY = useTransform(smoothProgress, [0, 0.25], [15, 0]);

  const greetingOpacity = useTransform(smoothProgress, [0, 0.25], [0.2, 1], { ease: easeInOut });
  const greetingY = useTransform(smoothProgress, [0.15, 0.45], [20, 0], { ease: easeInOut });

  const bio1Opacity = useTransform(smoothProgress, [0.4, 0.7], [0, 1], { ease: easeInOut });
  const bio1Y = useTransform(smoothProgress, [0.4, 0.7], [20, 0], { ease: easeInOut });


  return (
    // Увеличение h до 250vh даст больше дистанции для еще более плавного скролла
    <Box ref={containerRef} h="150vh" position="relative" zIndex={1} pointerEvents="none">
      <Box position="sticky" top="0" h="100vh">
        <FullScreenSection
          justifyContent="center"
          alignItems="center"
          isDarkBackground
        >
          <VStack spacing={12}>
            <MotionAvatar 
              src={logo} 
              size="2xl" 
              sx={{ filter: 'brightness(145%)' }}
              style={{ opacity: avatarOpacity, y: avatarY }}
            />

            <MotionHeading 
              as="h4" 
              size="md"
              style={{ opacity: greetingOpacity, y: greetingY }}
            >
              {greeting}
            </MotionHeading>
            
            <VStack spacing={2}>
              <MotionHeading 
                as="h1" 
                size="2xl"
                style={{ opacity: bio1Opacity, y: bio1Y }}
              >
                {bio1}
              </MotionHeading>
            </VStack>
          </VStack>
        </FullScreenSection>
      </Box>
    </Box>
  );
};

export default LandingSection;  