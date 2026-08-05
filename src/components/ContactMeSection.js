import React from "react";
import { useFormik } from "formik";
import {
  Box, Button, FormControl, FormErrorMessage, FormLabel,
  Heading, Input, Select, Textarea, VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import { useAlertContext } from "../context/alertContext";

const ContactMeSection = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "hireMe",
      comment: "", 
    },
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      
      try {
        const response = await fetch("/.netlify/functions/send-telegram", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.firstName,
            email: values.email,
            type: values.type,
            message: values.comment,
          }),
        });

        const result = await response.json();

        if (result.success) {
          onOpen('success', `Thanks for your submission ${values.firstName}, we will get back to you soon!`);
          resetForm();
        } else {
          throw new Error("Form submission failed");
        }
      } catch (error) {
        onOpen('error', 'Something went wrong, please try again later.');
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      type: Yup.string().optional(),
      comment: Yup.string()
        .min(25, "Must be at least 25 characters")
        .required("Required"),
    }),
  });

  return (
    <FullScreenSection isDarkBackground py={0} px={0} spacing={0}>
      <VStack         id="contactme-section"
        w={{ base: "100%", lg: "1024px" }} 
        maxW="1024px" 
        px={{ base: 4, lg: 16 }}
        pt={{ base: 20, md: 200 }}
        pb={{ base: 20, md: 20 }}
        spacing={{ base: 4, md: 6 }}
        alignItems="flex-start"
      >
        <Heading as="h1" fontSize={{ base: "2xl", sm: "3xl", lg: "4xl" }}>
          Contact me
        </Heading>
        <Box p={0} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={{ base: 3, md: 4 }}>
              <FormControl isInvalid={formik.touched.firstName && formik.errors.firstName}>
                <FormLabel htmlFor="firstName" mb={{ base: 1, md: 2 }}>Name</FormLabel>
                <Input id="firstName" name="firstName" {...formik.getFieldProps("firstName")} />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              
              <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                <FormLabel htmlFor="email" mb={{ base: 1, md: 2 }}>Email Address</FormLabel>
                <Input id="email" name="email" type="email" {...formik.getFieldProps("email")} />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              
              <FormControl isInvalid={formik.touched.comment && formik.errors.comment}>
                <FormLabel htmlFor="comment" mb={{ base: 1, md: 2 }}>Your message</FormLabel>
                <Textarea 
                  id="comment" 
                  name="comment" 
                  height={{ base: "100px", md: "150px" }} 
                  {...formik.getFieldProps("comment")} 
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              
              <Button type="submit" colorScheme="purple" width="full" isLoading={isLoading} mt={{ base: 2, md: 4 }}>
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default ContactMeSection;