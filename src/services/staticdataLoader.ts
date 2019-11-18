import { promisify } from "util";
import staticdata from '../assets/staticdata/Business.json';

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

  getBusinessItem( name: string, level: number) {
    let items = staticdata.business[name];
    if (!!items) {
      let item = items.find(i => i.level === level);
      return item;
    }
    return undefined;
  }

  getAvailableManagers(): string[] {
    let result: string[] = [];
    for (let key in staticdata.business)
      result.push(key);
    return result;
  }
}