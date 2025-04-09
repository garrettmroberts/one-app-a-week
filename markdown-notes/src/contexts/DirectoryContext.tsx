import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react';
import {
  SampleNotebooks as nb,
  SampleFolders as sdir,
  SampleFiles as sf
} from '../constants/temp';

interface DirectoryContextType {
  notebooks: string[];
  folders: string[];
  files: string[];
  activeNotebook: string;
  activeFolder: string;
  activeFile: string;
  setActiveNotebook: (notebook: string) => void;
  setActiveFolder: (folder: string) => void;
  setActiveFile: (file: string) => void;
  // addNotebook?: (notebook: string) => void;
  // addFolder?: (folder: string) => void;
  // addFile?: (file: string) => void;
  // removeNotebook?: (notebook: string) => void;
  // removeFolder?: (folder: string) => void;
  // removeFile?: (file: string) => void;
  // updateNotebook?: (oldName: string, newName: string) => void;
  // updateFolder?: (oldName: string, newName: string) => void;
  // updateFile?: (oldName: string, newName: string) => void;
  // moveFile?: (file: string, newFolder: string) => void;
  // moveFolder?: (folder: string, newNotebook: string) => void;
  // renameFile?: (oldName: string, newName: string) => void;
}

const DirectoryContext = createContext<DirectoryContextType | undefined>(
  undefined
);

export const useDirectoryContext = () => {
  const context = useContext(DirectoryContext);
  if (!context) {
    throw new Error(
      'useDirectoryContext must be used within a DirectoryProvider'
    );
  }
  return context;
};

export const DirectoryProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [notebooks, setNotebooks] = useState<string[]>([]);
  const [folders, setFolders] = useState<string[]>([]);
  const [files, setFiles] = useState<string[]>([]);
  const [activeNotebook, setActiveNotebook] = useState<string>('');
  const [activeFolder, setActiveFolder] = useState<string>('');
  const [activeFile, setActiveFile] = useState<string>('');

  useEffect(() => {
    // Fetch initial data
    setNotebooks(nb);
    setFolders(sdir);
    setFiles(sf);
    setActiveNotebook(nb[0]);
    setActiveFolder(sdir[0]);
    setActiveFile(sf[0]);
  }, []);

  const value: DirectoryContextType = {
    notebooks,
    folders,
    files,
    activeNotebook,
    activeFolder,
    activeFile,
    setActiveNotebook,
    setActiveFolder,
    setActiveFile
  };

  return (
    <DirectoryContext.Provider value={value}>
      {children}
    </DirectoryContext.Provider>
  );
};
