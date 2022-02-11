import React, { useState, useRef, useEffect } from 'react';
import { Text, Textarea, Box } from '@chakra-ui/react';

const CheckListDescription = () => {
  const [descriptionText, setDescriptionText] = useState('Check List Description');
  const [isEditable, setIsEditable] = useState(false);
  const [editText, setEditText] = useState(descriptionText);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px'; // Reset height to shrink if text is removed
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [editText, isEditable]); // Effect runs every time editText changes

  const handleTextClick = () => {
    setIsEditable(true);
  };

  const handleInputChange = (e) => {
    setEditText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevents form submission on Enter without Shift
      setDescriptionText(editText);
      setIsEditable(false);
    }
  };

  const handleBlur = () => {
    setDescriptionText(editText);
    setIsEditable(false);
  };

  return (
    <Box>
      {isEditable ? (
        <Textarea
          ref={textareaRef}
          value={editText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          autoFocus
          placeholder="Enter new description"
          className="text-xl mt-1 block w-full bg-transparent border-0 border-b-2 border-gray-200 focus:border-black focus:ring-0 pt-1 leading-tight pb-2 px-0 resize-y overflow-hidden"
          minHeight="unset" // Allows the textarea to shrink or grow
        />
      ) : (
      <Text
        fontSize="xl"
        mb={4}
        onClick={handleTextClick}
        cursor="pointer"
        sx={{ whiteSpace: 'pre-line' }} // This will preserve the line breaks
      >
        {descriptionText}
      </Text>
      )}
    </Box>
  );
};

export default CheckListDescription;
