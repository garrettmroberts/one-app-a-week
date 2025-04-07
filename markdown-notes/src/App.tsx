import { useRef, useState } from 'react';
import './styles/main.scss';
import Navigator from './components/Navigator';
import React from 'react';

function App() {
  const [treeWidth, setTreeWidth] = useState(250);
  const draggingRef = useRef(false);

  const handleMouseDown = () => {
    draggingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  const handleMouseUp = () => {
    draggingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingRef.current) return;

    const newWidth = e.clientX;
    setTreeWidth(newWidth);
  }

  return (
      <main>
        <Navigator width={treeWidth} />
        <div
          className="spacer" 
          onMouseDown={() => handleMouseDown()}
        />
        <div className="editor">editor</div>
      </main>
  );
}

export default App;
