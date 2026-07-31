import React from "react";
import { Avatar, Heading, VStack } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import logo from "../images/image.png";

const greeting = "Hello, I am Sergei!";
const bio1 = "A frontend developer";
const bio2 = "specialised in React";


const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#2A4365"
  >
    <VStack spacing={8}>
      <Avatar src={logo} size="2xl" />

      <Heading as="h4" size="md">{greeting}</Heading>
      
      <VStack spacing={2}>
        <Heading as="h1" size="2xl">{bio1}</Heading>
        <Heading as="h1" size="2xl">{bio2}</Heading>
      </VStack>
    </VStack>

  </FullScreenSection>
);

export default LandingSection;
