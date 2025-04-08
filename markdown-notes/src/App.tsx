import { useRef, useState } from 'react';
import './styles/main.scss';
import Navigator from './components/Navigator';
import React from 'react';

function App() {
  return (
    <main>
      <Navigator />
      <div className="editor" />
    </main>
  );
}

export default App;
