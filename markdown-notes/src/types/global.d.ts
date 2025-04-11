export {};

declare global {
  interface Window {
    api: {
      sayHello: () => string;
      readFile: (filepath: string) => string | null;
      writeFile: (filePath: string, content: string) => boolean;
      listFiles: (dirPath: string) => string[];
      fileExists: (filePath: string) => boolean;
    };
  }
}
