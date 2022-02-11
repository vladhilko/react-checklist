import React from 'react';
import { VStack } from '@chakra-ui/react';
import CheckListItem from './CheckListItem';

const CheckListItems = ({ items, toggleItem, onUpdate }) => {
  return (
    <VStack spacing={2} w="full">
      {items.map(item => (
        <CheckListItem key={item.id} item={item} onToggle={toggleItem} onUpdate={onUpdate} />
      ))}
    </VStack>
  );
};

export default CheckListItems;
