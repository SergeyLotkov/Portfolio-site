import React, { useRef } from "react";
import { VStack, Heading, SimpleGrid, Container, Box } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SiPython, SiNodedotjs, SiJavascript, SiReact } from "react-icons/si";
import SkillCard from "./SkillCard";

const MotionHeading = motion(Heading);

const skills = [
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "React / JSX", icon: SiReact, color: "#61DAFB" },
];

const SkillsSection = () => {
    const headingRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: headingRef,
        offset: ["start end", "center center"],
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

    return (
    <Container maxW="1280px" px={{ base: 2, sm: 4, md: 8 }} py={{ base: 8, md: 20 }} h="60vh" >
        {/* 🎯 Якорь id вынесен в отдельную обертку с сдвигом scrollMargin, чтобы выровнять карточки по центру */}
        <Box 
            id="skills-section" 
            sx={{
                // Корректирует точное положение центра на мобильных устройствах
                scrollMarginTop: { base: "20px", md: "0px" },
                scrollMarginBlockStart: { base: "20px", md: "0px" }
            }}
            w="100%"
        >
            <VStack spacing={{ base: 12, sm: 16, md: 20 }} >
                <MotionHeading 
                    ref={headingRef}
                    as="h2" 
                    size={{ base: "lg", md: "xl" }} 
                    color="white" 
                    textAlign="center"
                    letterSpacing="wide"
                    pt={{ base: "10px", md: "70px" }}
                    style={{
                        opacity,
                        y,
                        scale,
                    }}
                >
                    My Skills
                </MotionHeading>

                <SimpleGrid columns={4} spacing={{ base: 2, sm: 4, md: 8 }} w="100%">
                    {skills.map((skill, index) => (
                    <SkillCard
                        key={skill.name}
                        icon={skill.icon}
                        name={skill.name}
                        color={skill.color}
                        delay={index * 0.15}
                    />
                    ))}
                </SimpleGrid>
            </VStack>
        </Box>
    </Container>
    );
};

export default SkillsSection;