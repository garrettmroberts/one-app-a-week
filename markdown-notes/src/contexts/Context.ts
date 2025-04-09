import { createContext } from 'react';

export const context = createContext({
  notebooks: [],
  folders: [],
  pages: [],
  selectedBotebook: null,
  selectedFolder: null,
  selectedPage: null
});

export const MainContext = createContext(context);
