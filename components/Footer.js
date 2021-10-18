import {
  Box,
  Stack,
  HStack,
  Flex,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Textarea,
  Input,
  Button,
  InputGroup,
} from "@chakra-ui/react";
import { PhoneIcon, AtSignIcon } from "@chakra-ui/icons";
import Image from "next/image";
function Footer() {
  return (
    <Flex
      bg="#1C3341"
      color="white"
      spacing="18px"
      justify="space-around"
      direction={["column", "column", "row", "row"]}
      align={{ base: "center", md: "flex-start" }}
    >
      <Box py="40px" display={{ base: "flex", md: "auto" }}>
        <Stack>
          <Heading paddingBottom="25px" fontSize={{ base: "35px", md: "30px" }}>
            FAQ’s
          </Heading>
          <Accordion allowToggle spacing={4}>
            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <AccordionIcon />
                  <Box flexShrink={2} textAlign="left">
                    How Are We Different?
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={2}>we are Different</AccordionPanel>
            </AccordionItem>

            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <AccordionIcon />
                  <Box flexShrink={2} textAlign="left">
                    Is This Platform Totally Free?
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>Yes, it is Totally free</AccordionPanel>
            </AccordionItem>
            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <AccordionIcon />
                  <Box flexShrink={2} textAlign="left">
                    What Services Do We Provide?
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>Lots of Services</AccordionPanel>
            </AccordionItem>
            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <AccordionIcon Reverse />
                  <Box flexShrink={2} textAlign="left">
                    Where Are We Located?
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>Lots of Services</AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>
      </Box>
      <Box py="40px">
        <Stack>
          <Heading paddingBottom="25px" fontSize={{ base: "35px", md: "30px" }}>
            Lets Work
          </Heading>
          <HStack spacing={3}>
            <PhoneIcon />
            <Text>+964 750 000 00 00</Text>
          </HStack>
          <HStack spacing={3}>
            <AtSignIcon />
            <Text>letswork@gmail.com</Text>
          </HStack>
        </Stack>
      </Box>
      <Box py="40px">
        <Stack>
          <Heading fontSize={{ base: "35px", md: "30px" }}>Contact us</Heading>
          <Text>Send us messages</Text>
          <InputGroup w={{ base: "15rem", lg: "auto" }}>
            <Stack
              width={("sm", "sm", "sm", "xs")}
              display={["flow", "flow", "flex"]}
            >
              <Input variant="filled" placeholder="Name" />
              <Input variant="filled" placeholder="Email" />
              <Input
                as={Textarea}
                variant="filled"
                placeholder="Your Message"
              />
              <Button bg="blue.400" variant="primary" width="100%">
                Submit
              </Button>
            </Stack>
          </InputGroup>
        </Stack>
      </Box>
    </Flex>
  );
}

export default Footer;