import React from "react";
import axios from 'axios'; // Import axios
import CheckList from "./CheckList";
import { ChakraProvider } from '@chakra-ui/react';

const App = () => {
  // Configure Axios to include CSRF token in headers
  const configureAxios = () => {
    const csrfToken = document.querySelector('[name=csrf-token]').content;
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;
  };

  // Call the function to configure Axios with CSRF token
  configureAxios();

  return (
    <>
      <ChakraProvider>
        <CheckList />
      </ChakraProvider>
    </>
  );
}

export default App;
