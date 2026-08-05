import { Box, ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import LandingSection from "./components/LandingSection";
import ContactMeSection from "./components/ContactMeSection";
import Footer from "./components/Footer";
import { AlertProvider } from "./context/alertContext";
import Alert from "./components/Alert";
import StarField from "./components/StarField";
import SkillsSection from "./components/SkillsSection";
import VideoScrollCanvas from "./components/VideoScrollCanvas";
import { useSmoothSnap } from "./hooks/useSmoothSnap";

function MainContent() {
  useSmoothSnap();

  return (
    <Box
      minH="100vh"
      color="white"
      position="relative"
      zIndex={3}
      bg="transparent"
    >
      <main>
        {/* Landing Section */}
        <Box 
          data-snap="end" 
          data-pin-distance="750" 
          data-mobile-pin-distance="10"
        >
          <LandingSection />
        </Box>

        {/* Skills Section */}
        <Box 
          data-snap="start" 
          data-pin-distance="600" 
          data-mobile-pin-distance="50"
        >
          <SkillsSection />
        </Box>

        {/* Contact Section */}
        <Box 
          data-snap="end" 
          data-pin-distance="450" 
          data-mobile-pin-distance="40"
        >
          <ContactMeSection />
          <Footer />
        </Box>
      </main>
    </Box>
  );
}

export default function App() {
  return (
    <ChakraProvider>
      <AlertProvider>
        <VideoScrollCanvas />
        <StarField />
        <Header />
        <MainContent />
        <Alert />
      </AlertProvider>
    </ChakraProvider>
  );
}