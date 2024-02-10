import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Input, Button, HStack } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd';
import CheckListHeader from './CheckListHeader';
import CheckListDescription from './CheckListDescription';
import CheckListItems from './CheckListItems';

const Checklist = () => {
  const [checkListItems, setCheckListItems] = useState([]);

  useEffect(() => {
    fetchCheckListItems();
  }, []);

  const fetchCheckListItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/check_list_items');
      setCheckListItems(response.data);
    } catch (error) {
      console.error("Fetching check list items failed:", error);
    }
  };

  const addCheckListItem = async () => {
    if (newCheckListItemText.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:3000/check_list_items', {
          check_list_item: { text: newCheckListItemText, completed: false }
        });
        fetchCheckListItems(); // Refresh list after adding
        setNewCheckListItemText('');
      } catch (error) {
        console.error("Adding check list item failed:", error);
      }
    }
  };

  const toggleCheckListItem = async (itemId) => {
    const item = checkListItems.find(item => item.id === itemId);
    if (item) {
      try {
        await axios.patch(`http://localhost:3000/check_list_items/${itemId}`, {
          check_list_item: { completed: !item.completed }
        });
        fetchCheckListItems(); // Refresh list after toggling
      } catch (error) {
        console.error("Toggling check list item failed:", error);
      }
    }
  };

  const updateCheckListItem = async (itemId, newText) => {
    try {
      await axios.patch(`http://localhost:3000/check_list_items/${itemId}`, {
        check_list_item: { text: newText }
      });
      fetchCheckListItems(); // Refresh list after updating
    } catch (error) {
      console.error("Updating check list item failed:", error);
    }
  };

  const onDragEnd = async (result) => {
    // Implement drag end logic here if needed
    // For now, we'll just log the result
    console.log(result);
    // You might need a server-side endpoint to handle reordering if you want it persisted
  };

  const [newCheckListItemText, setNewCheckListItemText] = useState('');

  return (
    <Box w="full" p={4} className="max-w-screen-xl mx-auto">
      <CheckListHeader />
      <CheckListDescription />
      <DragDropContext onDragEnd={onDragEnd}>
        <CheckListItems items={checkListItems} toggleItem={toggleCheckListItem} onUpdate={updateCheckListItem} />
      </DragDropContext>
      <HStack mt={4} w="full">
        <Input
          placeholder="Add a check list item..."
          value={newCheckListItemText}
          onChange={(e) => setNewCheckListItemText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addCheckListItem()}
          size="lg"
          className="flex-1"
        />
        <Button colorScheme="blue" size="lg" onClick={addCheckListItem}>Add</Button>
      </HStack>
    </Box>
  );
};

export default Checklist;
