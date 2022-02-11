import React from 'react';
import { VStack, Box } from '@chakra-ui/react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import CheckListItem from './CheckListItem';

const CheckListItems = ({ items, toggleItem, onUpdate }) => {
  return (
    <Droppable droppableId="checklistItems">
      {(provided) => (
        <VStack {...provided.droppableProps} ref={provided.innerRef} spacing={2} w="full">
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={String(item.id)} index={index}>
              {(provided, snapshot) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  w="full"
                  _hover={{ bg: snapshot.isDragging ? "blue.50" : "" }}
                >
                  <CheckListItem item={item} onToggle={toggleItem} onUpdate={onUpdate} />
                </Box>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </VStack>
      )}
    </Droppable>
  );
};

export default CheckListItems;
