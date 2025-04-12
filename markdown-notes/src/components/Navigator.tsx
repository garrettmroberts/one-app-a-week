import { useRef, useState } from 'react';
import { HiLightningBolt } from 'react-icons/hi';
import {
  MdChevronLeft,
  MdChevronRight,
  MdSettings,
  MdAdd
} from 'react-icons/md';
import NotebookFinder from './NotebookFinder';
import FolderSelector from './FolderSelector';
import PageSelector from './PageSelector';
import React from 'react';
import { useDirectoryContext } from '../hooks/useDirectoryContext';

const Navigator = () => {
  const { notebooks } = useDirectoryContext();
  const [navWidth, setNavWidth] = useState(250);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const draggingRef = useRef(false);
  const mouseXRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    draggingRef.current = true;
    setIsDragging(true);

    mouseXRef.current = e.clientX;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingRef.current) return;

    const newWidth = e.clientX;

    mouseXRef.current = newWidth;

    if (newWidth >= 200) {
      setNavWidth(newWidth);
      setIsCollapsed(false);
    } else if (newWidth <= 60) {
      setIsCollapsed(true);
    }
  };

  const handleMouseUp = () => {
    draggingRef.current = false;
    setIsDragging(false);

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleToggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
  };

  const addNotebook = () => {
    console.log('addNotebook is not yet implemented.');
  };

  const openSettings = () => {
    console.log('openSettings is not yet implemented.');
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
        {!isCollapsed && <span>{notebooks.length} notebooks</span>}
        <div className="navigator__footer__actions">
          <button
            className="navigator__footer__actions__button"
            aria-label="Add new notebook"
            onClick={addNotebook}
          >
            <MdAdd />
          </button>
          <button
            className="navigator__footer__actions__button"
            aria-label="Settings"
            onClick={openSettings}
          >
            <MdSettings />
          </button>
        </div>
      </div>
      <div
        className="navigator__sizer"
        onMouseDown={(e) => handleMouseDown(e)}
      />
    </div>
  );
};

export default Navigator;
