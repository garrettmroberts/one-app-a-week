import './styles/main.scss';
import Navigator from './components/Navigator';
import React from 'react';
import Editor from './components/Editor';
import { context, MainContext } from './contexts/Context';

function App() {
  return (
    <MainContext.Provider value={context}>
      <main>
        <Navigator />
        <Editor />
      </main>
    </MainContext.Provider>
  );
}

export default App;
