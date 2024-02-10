import React, { useState, useRef } from 'react';
import { Checkbox, Text, Input, HStack, useOutsideClick } from '@chakra-ui/react';

const CheckListItem = ({ item, onToggle, onUpdate }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [editText, setEditText] = useState(item.text);
  const inputRef = useRef(null);

  useOutsideClick({
    ref: inputRef,
    handler: () => {
      setIsEditable(false);
      onUpdate(item.id, editText); // Update the text when clicking outside
    },
  });

  const handleTextClick = () => {
    setIsEditable(true);
  };

  const handleInputChange = (e) => {
    setEditText(e.target.value);
  };

  const handleInputSubmit = (e) => {
    if (e.key === 'Enter') {
      setIsEditable(false);
      onUpdate(item.id, editText); // Update the text on Enter
    }
  };

  return (
    <HStack w="full" spacing={4}>
      <Checkbox size="lg" isChecked={item.completed} onChange={() => onToggle(item.id)} className="w-6 h-6" />
      {isEditable ? (
        <Input
          ref={inputRef}
          value={editText}
          onChange={handleInputChange}
          onKeyPress={handleInputSubmit}
          onBlur={() => setIsEditable(false)} // Optionally update on blur as well
          size="md"
          autoFocus
          className="flex-1 border-0 border-b border-gray-200 focus:border-b focus:border-black outline-none focus:ring-0"
        />
      ) : (
        <Text fontSize="xl" flex="1" className="ml-4" onClick={handleTextClick} cursor="pointer">
          {item.text}
        </Text>
      )}
    </HStack>
  );
};

export default CheckListItem;
