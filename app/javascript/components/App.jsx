import React from "react"
import CheckList from "./CheckList"
import { ChakraProvider } from '@chakra-ui/react'

const App = () => {
  return (
    <>
      <ChakraProvider>
        <CheckList/>
      </ChakraProvider>
    </>
  )
}

export default App
