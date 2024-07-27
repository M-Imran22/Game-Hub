import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Select,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Types, TypesKeys } from "./newGameTypes";
import { useFormContext } from "react-hook-form";

interface Props {
  options?: Types;
}
const SystemRequirements = ({ options }: Props) => {
  const { register } = useFormContext();
  return (
    <Box width="100%" my={5}>
      <Text fontWeight="bold" my={5}>
        System Requirements
      </Text>
      <HStack spacing={4}>
        <Box>
          <Text>RECOMMENDED:</Text>
          <VStack spacing={4}>
            {Object.keys(options || {}).map((key) => {
              const typedKey = key as TypesKeys;
              return (
                <FormControl key={typedKey}>
                  <FormLabel>{typedKey}</FormLabel>
                  <Select
                    {...register(`systemRequirements.recommended.${typedKey}`)}
                    placeholder={`Select ${typedKey}`}
                  >
                    {options?.[typedKey]?.[0]?.options?.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              );
            })}
          </VStack>
        </Box>
        <Box>
          <Text>MINIMUM:</Text>
          <VStack spacing={4}>
            {Object.keys(options || {}).map((key) => {
              const typedKey = key as TypesKeys;
              return (
                <FormControl key={typedKey}>
                  <FormLabel>{typedKey}</FormLabel>
                  <Select
                    {...register(`systemRequirements.minimum.${typedKey}`)}
                    placeholder={`Select ${typedKey}`}
                  >
                    {options?.[typedKey]?.[0]?.options?.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              );
            })}
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
};

export default SystemRequirements;
