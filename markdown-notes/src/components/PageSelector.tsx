import React, { useState } from 'react';
import { LuFolderClosed, LuFolderOpen } from 'react-icons/lu';
import { useDirectoryContext } from '../hooks/useDirectoryContext';

const FolderSelector = () => {
  const { files, activeFile, setActiveFile } = useDirectoryContext();
  const [isPagesDirOpen, setIsPagesDirOpen] = useState(false);
  return (
    <div className="page-selector-container">
      <div
        className="page-selector"
        onClick={() => {
          setIsPagesDirOpen(!isPagesDirOpen);
        }}
        role="button"
        tabIndex={0}
        aria-expanded={isPagesDirOpen}
        aria-haspopup="listbox"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsPagesDirOpen(!isPagesDirOpen);
          }
        }}
      >
        <div className="page-selector__header">
          <p className="page-selector__header__label">Current folder:</p>
          <div className="page-selector__header__title">
            <LuFolderOpen aria-hidden="true" />
            <span>{activeFile}</span>
          </div>
        </div>
        <div
          className={`page-selector__chevron ${isPagesDirOpen ? 'page-selector__chevron--open' : ''}`}
          aria-hidden="true"
        />
      </div>
      <div
        className={`page-selector__dropdown ${isPagesDirOpen ? 'page-selector__dropdown--visible' : ''}`}
        role="listbox"
        aria-hidden={!isPagesDirOpen}
      >
        {files
          .filter((f) => f !== activeFile)
          .map((f) => (
            <div
              className="page-selector__dropdown__notebook"
              key={f}
              onClick={(e) => {
                e.stopPropagation();
                setActiveFile(f);
                setIsPagesDirOpen(false);
              }}
              role="option"
              tabIndex={isPagesDirOpen ? 0 : -1}
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
