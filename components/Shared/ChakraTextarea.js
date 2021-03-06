import { ErrorMessage, Field } from "formik";
import { Textarea, VStack } from "@chakra-ui/react";
import TextError from "./TextError";
function ChakraTextarea({ name, ...rest }) {
  return (
    <VStack>
      <Field as={Textarea} name={name} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </VStack>
  );
}

export default ChakraTextarea;
