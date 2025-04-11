import '@testing-library/jest-dom';

declare global {
  interface Window {
    api: {
      sayHello: jest.Mock<string, []>;
      readFile: jest.Mock<string | null, [string]>;
      writeFile: jest.Mock<boolean, []>;
      listFiles: jest.Mock<string[], [string]>;
      fileExists: jest.Mock<boolean, []>;
    };
  }
}

window.api = {
  sayHello: jest.fn().mockReturnValue('Hello from preload.js!'),
  readFile: jest.fn().mockImplementation((path) => {
    if (path.includes('nonexistent')) return null;
    return 'Mock file content';
  }),
  writeFile: jest.fn().mockReturnValue(true),
  listFiles: jest.fn().mockImplementation((path) => {
    if (path === 'src/data') return ['notebook1', 'notebook2'];
    if (path.includes('notebook1')) return ['folder1', 'folder2'];
    if (path.includes('folder1')) return ['file1.md', 'file2.md'];
    return [];
  }),
  fileExists: jest.fn().mockReturnValue(true)
};
