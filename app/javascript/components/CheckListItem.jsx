import React, { useState, useRef } from 'react';
import { Checkbox, Text, Input, HStack, useOutsideClick, Spinner } from '@chakra-ui/react';

const CheckListItem = ({ item, onToggle, onUpdate }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [editText, setEditText] = useState(item.text);
  const [isUpdating, setIsUpdating] = useState(false);

  const inputRef = useRef(null);

  useOutsideClick({
    ref: inputRef,
    handler: () => {
      setIsEditable(false);
    },
  });

  const handleTextClick = () => {
    setIsEditable(true);
  };

  const handleInputChange = (e) => {
    setEditText(e.target.value);
  };

  const handleInputSubmit = async (e) => {
    if (e.key === 'Enter') {
      setIsUpdating(true); // Start updating
      try {
        // Assuming onUpdate is now an async function passed from the parent that updates the state
        await onUpdate(item.id, editText);
      } catch (error) {
        console.error("Failed to update item:", error);
      } finally {
        setIsUpdating(false); // Update completed or failed
        setIsEditable(false);
      }
    }
  };

  return (
    <HStack w="full" spacing={4}>
      <Checkbox size="lg" isChecked={item.completed} onChange={() => onToggle(item.id)} className="w-6 h-6" />
      {isEditable ? (
        isUpdating ? (
          <Spinner size="sm" /> // Show spinner while updating
        ) : (
          <Input
            ref={inputRef}
            value={editText}
            onChange={handleInputChange}
            onKeyPress={handleInputSubmit}
            onBlur={() => setIsEditable(false)}
            size="md"
            autoFocus
            className="flex-1 border-0 border-b border-gray-200 focus:border-b focus:border-black outline-none focus:ring-0"
          />
        )
      ) : (
        <Text fontSize="xl" flex="1" className="ml-4" onClick={handleTextClick} cursor="pointer">
          {item.text}
        </Text>
      )}
    </HStack>
  );
};

export default CheckListItem;
