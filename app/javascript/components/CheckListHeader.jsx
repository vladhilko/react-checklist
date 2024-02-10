import React, { useState, useRef, useEffect } from 'react';
import { Text, Input, useOutsideClick, Box } from '@chakra-ui/react';
import axios from 'axios';

const CheckListHeader = () => {
  const [headerText, setHeaderText] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [editText, setEditText] = useState('');
  const inputRef = React.useRef();

  useEffect(() => {
    const fetchCheckListTitle = async () => {
      try {
        const response = await axios.get('http://localhost:3000/check_list');
        const { title } = response.data; // Assuming the response has a title field
        setHeaderText(title);
        setEditText(title); // Also set editText to the fetched title
      } catch (error) {
        console.error("Error fetching CheckList title:", error);
      }
    };

    fetchCheckListTitle();
  }, []);

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

  const handleInputSubmit = async (e) => {
    if (e.key === 'Enter') {
      try {
        await axios.patch('http://localhost:3000/check_list', {
          check_list: { title: editText }
        });
        setHeaderText(editText);
        setIsEditable(false);
      } catch (error) {
        console.error("Error updating title:", error);
      }
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
          {headerText || "Loading title..."}
        </Text>
      )}
    </Box>
  );
};

export default CheckListHeader;
