import businessData from 'assets/staticdata/Business.json';
import managerData from 'assets/staticdata/Manager.json';
import { ManagerType } from 'modules/managers';

export type AutomateManagerType = {
  id: number;
  part: string;
};

export default  class StaticDataService {
  private static instance: StaticDataService;

  static getInstance(): StaticDataService {
    if (StaticDataService.instance) {
      return StaticDataService.instance;
    } else {
      StaticDataService.instance = new StaticDataService();
      return StaticDataService.instance;
    }
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