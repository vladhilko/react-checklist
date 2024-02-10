import React, { useState } from 'react';
import { Box, Checkbox, Text, VStack, Input, Button, HStack } from '@chakra-ui/react';

import CheckListHeader from './CheckListHeader'
import CheckListDescription from './CheckListDescription'

const Checklist = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: false },
    { id: 3, text: 'Task 3', completed: true },
    { id: 4, text: 'Task 4', completed: false }
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  const toggleTask = taskId => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTaskText.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        text: newTaskText,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
    }
  };

  return (
    <Box w="full" p={4} className="max-w-screen-xl mx-auto">
      <CheckListHeader />
      <CheckListDescription />
      <VStack spacing={2} w="full">
        {tasks.map(task => (
          <HStack key={task.id} w="full">
            <Checkbox size="lg" isChecked={task.completed} onChange={() => toggleTask(task.id)} className="w-6 h-6" />
            <Text fontSize="xl" flex="1" className="ml-4">{task.text}</Text>
          </HStack>
        ))}
      </VStack>

      <HStack mt={4} w="full">
        <Input
          placeholder="Add a task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && addTask()}
          size="lg"
          className="flex-1"
        />
        <Button colorScheme="blue" size="lg" onClick={addTask}>Add</Button>
        <Input style={{ display: 'none' }}/>
      </HStack>

    </Box>
  );
};

export default Checklist;
