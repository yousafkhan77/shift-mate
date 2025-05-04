import React from "react";
import TextInput, { TextInputInterface } from "./TextInput";
import Box from "./Box";
import EvilIcons from "@expo/vector-icons/EvilIcons";

interface SearchInputProps extends TextInputInterface {
  icon?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  ...props
}: SearchInputProps) => {
  return (
    <TextInput
      {...props}
      left={
        <Box pl={1.25}>
          <EvilIcons name="search" size={28} color="black" />
        </Box>
      }
    />
  );
};

export default SearchInput;
