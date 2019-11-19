import businessData from 'assets/staticdata/Business.json';
import managerData from 'assets/staticdata/Manager.json';


export type ManagerType = {
  'id': number;
  'name': string;
  'salary': number;
  'effect': string,
  'part' : string,
  'description': string
};

export type AutomateManagerType = {
  id: number;
  part: string;
};

export default class StaticDataService {
  static getInstance(): StaticDataService {
    if (!(window as any).staticDataService) {
      (window as any).staticDataService = new StaticDataService();
      return (window as any).staticDataService;
    } else
      return (window as any).staticDataService;
  }

  getBusinessItem( name: string, level: number) {
    let items = businessData.business[name];
    if (!!items) {
      let item = items.find(i => i.level === level);
      return item;
    }
    return undefined;
  }

  getAvailableManagers(): ManagerType[] {
    return managerData.manager;
  }

  getAutomateManagers(): AutomateManagerType[] {
    return managerData.manager
      .filter(item => item.effect === 'AUTOMATIC')
      .map(item => ({
        id: item.id, part: item.part
      }));
  }
}