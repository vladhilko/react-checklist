import React, { useState } from 'react';
import { Text, Input, useOutsideClick, Box } from '@chakra-ui/react';

const CheckListHeader = () => {
  const [headerText, setHeaderText] = useState('Check List Header');
  const [isEditable, setIsEditable] = useState(false);
  const [editText, setEditText] = useState(headerText);
  const inputRef = React.useRef();

  useOutsideClick({
    ref: inputRef,
    handler: () => setIsEditable(false),
  });

  const handleTextClick = () => {
    setIsEditable(true);
  };

  const handleInputChange = (e) => {
    setEditText(e.target.value);
  };

  const handleInputSubmit = (e) => {
    if (e.key === 'Enter') {
      setHeaderText(editText);
      setIsEditable(false);
    }
  };

  return (
    <Box>
      {isEditable ? (
        <Input
          ref={inputRef}
          value={editText}
          onChange={handleInputChange}
          onKeyPress={handleInputSubmit}
          size="lg"
          fontSize="6xl"
          fontWeight="bold"
          mb={4}
          autoFocus
          className="text-6xl font-bold mt-5 block w-full bg-transparent border-0 border-b-2 border-gray-200 focus:border-black focus:ring-0 pt-3 leading-normal pb-4 px-0"
        />
      ) : (
        <Text
          fontSize="6xl"
          fontWeight="bold"
          mb={4}
          onClick={handleTextClick}
          cursor="pointer"
        >
          {headerText}
        </Text>
      )}
    </Box>
  );
};

export default CheckListHeader;
