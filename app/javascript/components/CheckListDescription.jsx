import React, { useState, useRef, useEffect } from 'react';
import { Text, Textarea, Box } from '@chakra-ui/react';
import axios from 'axios';

const CheckListDescription = () => {
  const [descriptionText, setDescriptionText] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [editText, setEditText] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    // Fetch the CheckList description when the component mounts
    const fetchCheckListDescription = async () => {
      try {
        const response = await axios.get('http://localhost:3000/check_list');
        const { description } = response.data; // Assuming the response has a description field
        setDescriptionText(description);
        setEditText(description); // Set editText to the fetched description as well
      } catch (error) {
        console.error("Error fetching CheckList description:", error);
      }
    };

    fetchCheckListDescription();

    // This effect should only run once when the component mounts
  }, []);

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

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      try {
        await axios.patch('http://localhost:3000/check_list', {
          check_list: { description: editText }
        });
        setDescriptionText(editText);
        setIsEditable(false);
      } catch (error) {
        console.error("Error updating description:", error);
      }
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
          minHeight="unset"
        />
      ) : (
      <Text
        fontSize="xl"
        mb={4}
        onClick={handleTextClick}
        cursor="pointer"
        sx={{ whiteSpace: 'pre-line' }}
      >
        {descriptionText || "Loading description..."}
      </Text>
      )}
    </Box>
  );
};

export default CheckListDescription;
