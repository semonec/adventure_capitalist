import businessData from 'assets/staticdata/Business.json';
import managerData from 'assets/staticdata/Manager.json';
import { ManagerType } from 'modules/managers';

type AutomateManagerType = {
  id: number;
  part: string;
};

/**
 * Access to staticdata and obtain prebuild datas, such as business information for each item, level.
 * And Manager's information.
 * This would be used widely all the componens, so make it as singleton instance. 
 */
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

  /**
   * load specific business item with name and it's level
   * redux state will store current information only. prevent pollution of business information
   * This will be called at organizing business state's initial value, and update it's value after level up.
   * @param {string} name Kind of business item, in the sim, I only prepared for LEMON, NEWSPAPER, and CAR_WASH type
   * @param {number} level Level of that business item
   * @returns JSON object with 
   *  - level: number
   *  - levelUpCost: number // needed cost for the next level
   *  - revenue: number // amount of earning for each process
   *  - duration: number // amount of time cost for each process's from start till end.
   */ 
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

  // simply filtering with automated manager type
  getAutomateManagers(): AutomateManagerType[] {
    return managerData.manager
      .filter(item => item.effect === 'AUTOMATIC')
      .map(item => ({
        id: item.id, part: item.part
      }));
  }
}