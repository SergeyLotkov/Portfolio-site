import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto:apssdgx@gmail.com",
  },
  {
    icon: faGithub,
    url: "https://github.com/SergeyLotkov",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  }
];

const Header = () => {
  const headerRef = useRef(null);

  const handleClick = (anchor) => (e) => {
    e.preventDefault(); 
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    
    if (element) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const rect = element.getBoundingClientRect();
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Находим Y-центр элемента на странице
      const elementCenterY = scrollTop + rect.top + (elementHeight / 2);
      
      // Совмещаем центр элемента с центром экрана
      const targetScrollY = elementCenterY - (windowHeight / 2);

      window.scrollTo({
        top: Math.max(0, targetScrollY),
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    let prevScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const headerElement = headerRef.current;

      if (!headerElement) return;

      if (currentScrollY < 10) {
        headerElement.style.transform = "translateY(0)";
        prevScrollY = currentScrollY;
        return;
      }

      if (currentScrollY > prevScrollY) {
        headerElement.style.transform = "translateY(-200px)";
      } else {
        headerElement.style.transform = "translateY(0)";
      }
      prevScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);   

  return (
    <Box
      ref={headerRef}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      pointerEvents="auto"
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      px={0}
    >
      <Box 
        color="white" 
        maxWidth="1280px" 
        margin="0 auto"
        w="100%"
      >
        <HStack
          px={{ base: 4, sm: 6, md: 16 }}
          py={{ base: 4, md: 4 }}
          justifyContent="space-between"
          alignItems="center"
          w="100%"
        >
          <nav>
            <HStack spacing={{ base: 4, sm: 5 }}>
              {socials.map((social) => (
                <a 
                  key={social.url} 
                  href={social.url} 
                  target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel={social.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                >
                  <Box fontSize={{ base: "1.4rem", sm: "1.6rem", md: "1.8rem" }}>
                    <FontAwesomeIcon icon={social.icon} />
                  </Box>
                </a>
              ))}
            </HStack>
          </nav>
          <nav>
            <HStack 
              spacing={{ base: 4, sm: 6, md: 8 }}
              fontSize={{ base: "sm", sm: "md", md: "lg" }}
              fontWeight="medium"
            >
              <a href="#skills-section" onClick={handleClick('skills')}>My skills</a>
              <a href="#contactme-section" onClick={handleClick('contactme')}>Contact me</a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;