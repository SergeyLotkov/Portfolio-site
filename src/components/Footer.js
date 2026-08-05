import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box w="100%">
      <footer>
        <Flex
          margin="0 auto"
          px={{ base: 4, sm: 6, md: 12 }}
          color="white"
          justifyContent="center"
          alignItems="center"
          maxWidth="1024px"
          minHeight={{ base: "50px", md: "64px" }}
          py={{ base: 3, md: 0 }}
          textAlign="center"
        >
          <Text fontSize={{ base: "xs", sm: "sm", md: "md" }}>
            Sergei • © 2026
          </Text>
        </Flex>
      </footer>
    </Box>
  );
};

export default Footer;