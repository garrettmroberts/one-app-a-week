import { useRef, useState } from 'react';
import { HiLightningBolt } from 'react-icons/hi';
import {
  MdChevronLeft,
  MdChevronRight,
  MdSettings,
  MdAdd
} from 'react-icons/md';
import React from 'react';
import NotebookFinder from './NotebookFinder';
import FolderSelector from './FolderSelector';
import PageSelector from './PageSelector';

const Navigator = () => {
  const [navWidth, setNavWidth] = useState(250);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const draggingRef = useRef(false);

  const handleMouseDown = () => {
    draggingRef.current = true;
    setIsDragging(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    draggingRef.current = false;
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingRef.current) return;

    const newWidth = e.clientX;
    setNavWidth(newWidth);
  };

  const handleToggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
  };

  return (
    <div
      className={`navigator ${isCollapsed ? 'navigator--collapsed' : ''} ${isDragging ? 'navigator--dragging' : ''}`}
      style={{ width: isCollapsed ? '60px' : `${navWidth}px` }}
    >
      <div className="navigator__header">
        <HiLightningBolt
          className="navigator__header__icon"
          onClick={handleToggleCollapse}
        />
        <h1 className="navigator__header__title">MDNotes</h1>
        <button
          className="navigator__collapse-btn"
          onClick={handleToggleCollapse}
          aria-label={isCollapsed ? 'Expand navigator' : 'Collapse navigator'}
        >
          {isCollapsed ? <MdChevronRight /> : <MdChevronLeft />}
        </button>
      </div>
      <div className="navigator__body">
        <NotebookFinder />
        <FolderSelector />
        <PageSelector />
      </div>
      <div className="navigator__footer">
        {!isCollapsed && <span>3 notebooks</span>}
        <div className="navigator__footer__actions">
          <button aria-label="Add new notebook">
            <MdAdd />
          </button>
          <button aria-label="Settings">
            <MdSettings />
          </button>
        </div>
      </div>
      <div className="navigator__sizer" onMouseDown={() => handleMouseDown()} />
    </div>
  );
};

export default Navigator;
