import React from 'react';
import { useDirectoryContext } from '../contexts/DirectoryContext';

const BreadCrumbs: React.FC = () => {
  const { activeNotebook, activeFolder, activeFile } = useDirectoryContext();

  return (
    <div className="bread-crumbs">
      <p>{`${activeNotebook} > ${activeFolder} > ${activeFile}`}</p>
    </div>
  );
};

export default BreadCrumbs;
