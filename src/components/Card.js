import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  return (
    <VStack
      color="black"
      bg="white"
      borderRadius="xl"
      alignItems="flex-start"
      overflow="hidden"
      pb={4}
    >
      <Image 
        src={imageSrc} 
        alt={title} 
        borderRadius="xl"
        w="100%"
        h="150px"
        objectFit="cover"
        borderRadius="0"
      />

      <VStack spacing={2} px={4} alignItems="flex-start">
        <Heading size="md">{title}</Heading>
        <Text color="#64748b">{description}</Text>

        <HStack pt={2} cursor="pointer">
          <Text fontWeight="bold">See more</Text>
          <FontAwesomeIcon icon={faArrowRight} size="1x" />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Card;
