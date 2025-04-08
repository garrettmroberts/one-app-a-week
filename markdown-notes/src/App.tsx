import { useRef, useState } from 'react';
import './styles/main.scss';
import Navigator from './components/Navigator';
import React from 'react';

function App() {
  const [treeWidth, setTreeWidth] = useState(250);

  return (
      <main>
        <Navigator width={treeWidth} />
        <div className="editor" />
      </main>
  );
}

export default App;
