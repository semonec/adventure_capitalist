import { promisify } from "util";

export default class StaticDataService {
  constructor() {
  }

  static getInstance(): StaticDataService {
    if (!(window as any).staticDataService) {
      (window as any).staticDataService = new StaticDataService();
      return (window as any).staticDataService;
    } else
      return (window as any).staticDataService;
  }

  init() {
    
  }

  private readJson(filename: string) {
    if(window) {
      return require('jQuery').get(filename,{}).then(function (contents) {
        return contents;
      });
    } else{
      var readFile = promisify(require('fs').readFile);
      return readFile(filename).then(function (contents) {
        return JSON.parse(contents);
      });
    }
  }
}