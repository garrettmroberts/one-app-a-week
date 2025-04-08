import React, { useState } from 'react';
import { SampleFolders as sf } from '../constants/temp';
import { LuFolderClosed, LuFolderOpen } from 'react-icons/lu';

const FolderSelector = () => {
  const [folders] = useState(sf);
  const [activeFolder, setActiveFolder] = useState(folders[folders.length - 1]);
  const [isNotebookDirOpen, setIsNotebookDirOpen] = useState(false);
  return (
    <div className="folder-selector-container">
      <div
        className="folder-selector"
        onClick={() => {
          setIsNotebookDirOpen(!isNotebookDirOpen);
        }}
        role="button"
        tabIndex={0}
        aria-expanded={isNotebookDirOpen}
        aria-haspopup="listbox"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsNotebookDirOpen(!isNotebookDirOpen);
          }
        }}
      >
        <div className="folder-selector__header">
          <p className="folder-selector__header__label">Current folder:</p>
          <div className="folder-selector__header__title">
            <LuFolderOpen aria-hidden="true" />
            <span>{activeFolder}</span>
          </div>
        </div>
        <div
          className={`folder-selector__chevron ${isNotebookDirOpen ? 'folder-selector__chevron--open' : ''}`}
          aria-hidden="true"
        />
      </div>
      <div
        className={`folder-selector__dropdown ${isNotebookDirOpen ? 'folder-selector__dropdown--visible' : ''}`}
        role="listbox"
        aria-hidden={!isNotebookDirOpen}
      >
        {folders
          .filter((f) => f !== activeFolder)
          .map((f) => (
            <div
              className="folder-selector__dropdown__notebook"
              key={f}
              onClick={(e) => {
                e.stopPropagation();
                setActiveFolder(f);
                setIsNotebookDirOpen(false);
              }}
              role="option"
              tabIndex={isNotebookDirOpen ? 0 : -1}
              aria-selected={false}
            >
              <LuFolderClosed aria-hidden="true" />
              <span>{f}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FolderSelector;
