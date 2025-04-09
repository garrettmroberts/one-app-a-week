import React, { useState } from 'react';
import { SampleFolders as sf } from '../constants/temp';
import { LuFolderClosed, LuFolderOpen } from 'react-icons/lu';
import { useDirectoryContext } from '../contexts/DirectoryContext';

const FolderSelector = () => {
  const { folders, activeFolder, setActiveFolder } = useDirectoryContext();
  const [isFoldersDirOpen, setIsFoldersDirOpen] = useState(false);

  return (
    <div className="folder-selector-container">
      <div
        className="folder-selector"
        onClick={() => {
          setIsFoldersDirOpen(!isFoldersDirOpen);
        }}
        role="button"
        tabIndex={0}
        aria-expanded={isFoldersDirOpen}
        aria-haspopup="listbox"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsFoldersDirOpen(!isFoldersDirOpen);
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
          className={`folder-selector__chevron ${isFoldersDirOpen ? 'folder-selector__chevron--open' : ''}`}
          aria-hidden="true"
        />
      </div>
      <div
        className={`folder-selector__dropdown ${isFoldersDirOpen ? 'folder-selector__dropdown--visible' : ''}`}
        role="listbox"
        aria-hidden={!isFoldersDirOpen}
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
                setIsFoldersDirOpen(false);
              }}
              role="option"
              tabIndex={isFoldersDirOpen ? 0 : -1}
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
