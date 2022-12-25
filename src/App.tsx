import * as React from 'react'

// 1. import `ChakraProvider` component
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import './App.css';
import { NotePage } from './pages/Home/NotePage';



const theme = extendTheme({
    styles: {
        global: () => ({
            body: {
                bg: "#D9AFD9",
                backgroundImage: "linear-gradient(85deg, #D9AFD9 0%, #97D9E1 100%)",
            },
}),
    },
    colors: {},
    fonts: {},
    fontSizes: {},
    breakpoints: {
        sm: "320px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
    },
});

function App() {
  return (
      <ChakraProvider theme={theme}>
        <NotePage />
      </ChakraProvider>
  );
}

export default App;
