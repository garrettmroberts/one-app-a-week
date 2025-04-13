const { contextBridge } = require('electron');
const fs = require('fs');
const path = require('path');

contextBridge.exposeInMainWorld('api', {
  sayHello: () => {
    return 'Hello from preload.js!';
  },

  // File system operations
  readFile: (filePath) => {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      console.error('Failed to read file: ', error);
      return null;
    }
  },

  writeDirectory: (dirPath) => {
    try {
      fs.mkdirSync(dirPath, { recursive: true });
      return true;
    } catch (error) {
      console.error('Failed to create directory: ', error);
      return false;
    }
  },

  writeFile: (filePath, content) => {
    try {
      fs.writeFileSync(filePath, content, 'utf-8');
      return true;
    } catch (error) {
      console.error('Failed to write file: ', error);
      return false;
    }
  },

  listFiles: (dirPath) => {
    try {
      return fs.readdirSync(dirPath);
    } catch (error) {
      console.error('Failed to list files: ', error);
      return [];
    }
  },

  fileExists: (filePath) => {
    return fs.existsSync(filePath);
  }
});
