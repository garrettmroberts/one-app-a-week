import React, { useState } from 'react';
import { SamplePages as sp } from '../constants/temp';
import { LuFolderClosed, LuFolderOpen } from 'react-icons/lu';

const FolderSelector = () => {
  const [pages] = useState(sp);
  const [activePage, setActivePage] = useState(pages[0]);
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
            <span>{activePage}</span>
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
        {pages
          .filter((p) => p !== activePage)
          .map((p) => (
            <div
              className="page-selector__dropdown__notebook"
              key={p}
              onClick={(e) => {
                e.stopPropagation();
                setActivePage(p);
                setIsPagesDirOpen(false);
              }}
              role="option"
              tabIndex={isPagesDirOpen ? 0 : -1}
              aria-selected={false}
            >
              <LuFolderClosed aria-hidden="true" />
              <span>{p}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FolderSelector;
