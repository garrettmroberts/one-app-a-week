export {};

declare global {
  interface Window {
    api: {
      sayHello: () => string;
      readFile: (filepath: string) => string | null;
      writeDirectory: (filepath: string) => boolean;
      writeFile: (filePath: string, content: string) => boolean;
      listFiles: (dirPath: string) => string[];
      fileExists: (filePath: string) => boolean;
    };
  }
}
