import './styles/main.scss';
import Navigator from './components/Navigator';
import React from 'react';
import Editor from './components/Editor';
import { DirectoryProvider } from './contexts/DirectoryContext';

function App() {
  return (
    <DirectoryProvider>
      <main>
        <Navigator />
        <Editor />
      </main>
    </DirectoryProvider>
  );
}

export default App;
