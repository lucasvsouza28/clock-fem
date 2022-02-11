import { useState } from 'react';
import { styled, globalStyles, lightTheme } from '../stitches.config';
import { HomePage } from './pages/Home';

function App() {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  globalStyles();

  const Box = styled('div', {
    display: 'flex',
    flexDirection: 'column',

    height: '100vh',
  })

  return (
    <Box>
      <HomePage />
    </Box>
  )
}

export default App
