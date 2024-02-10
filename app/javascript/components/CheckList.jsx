import React, { useState } from 'react';
import { Box, Input, Button, HStack } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd';
import CheckListHeader from './CheckListHeader';
import CheckListDescription from './CheckListDescription';
import CheckListItems from './CheckListItems';

const Checklist = () => {
  const [checkListItems, setCheckListItems] = useState([
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: false },
    { id: 3, text: 'Task 3', completed: true },
    { id: 4, text: 'Task 4', completed: false },
  ]);
  const [newCheckListItemText, setNewCheckListItemText] = useState('');

  const toggleCheckListItem = (itemId) => {
    setCheckListItems(checkListItems.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    ));
  };

  const updateCheckListItem = (itemId, newText) => {
    setCheckListItems(checkListItems.map(item =>
      item.id === itemId ? { ...item, text: newText } : item
    ));
  };

  const addCheckListItem = () => {
    if (newCheckListItemText.trim() !== '') {
      const newCheckListItem = {
        id: checkListItems.length + 1,
        text: newCheckListItemText,
        completed: false,
      };
      setCheckListItems([...checkListItems, newCheckListItem]);
      setNewCheckListItemText('');
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(checkListItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCheckListItems(items);
  };

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
