import StaticDataService from './staticdataLoader';

export default class PlayerDataService {  

  constructor() {
  }
  static getInstance(): PlayerDataService {
    if (!(window as any).playerDataService) {
     (window as any).playerDataService = new PlayerDataService();
      return (window as any).playerDataService;
    } else
      return (window as any).playerDataService;
  }

  // store user data into localStorage
  // in case of real production situation, we would like to store it to back-end server
  // but in this sim, I'll store it in the localStorage
  storeUserMoney(cash: number) {
    window.localStorage.setItem('cash', cash.toString());
    window.localStorage.setItem('time', new Date().getTime().toString());
  }

  loadUserMoney(): number {
    let cash = window.localStorage.getItem('cash');
    if (cash !== null)
      return Number.parseInt(cash);
    else
      return 0;
  }

  storeUserBusiness(business: any) {
    window.localStorage.setItem(business.name, JSON.stringify(business));
    window.localStorage.setItem('time', new Date().getTime().toString());
  }
  loadUserBusiness(business: any) {
    
  }
  storeUserManager(manager: any) {
    window.localStorage.setItem('manager', JSON.stringify(manager));
    window.localStorage.setItem('time', new Date().getTime().toString());
  }

  calculateBackgroundEarned() {
    let cash = window.localStorage.getItem('cash');
    let time = window.localStorage.getItem('time');
    let business = window.localStorage.getItem('business');
    let manager = window.localStorage.getItem('manager');

    if (cash === null || time === null || business === null || manager === null)
      return 0;

    let staticdata = StaticDataService.getInstance();
    // get time gap between saved time and current time
    let currentTime = new Date().getTime();
    let backgrounded = currentTime - Number.parseInt(time);
    
    // calculate businessitem's revenue per ms, which has it's automation manager
    let parsedManager = JSON.parse(manager);
    let parsedBusiness = JSON.parse(business);

    console.log(parsedManager, parsedBusiness, cash, backgrounded);

    // get hiredManager

    let hiredManager = parsedManager.list.filter((manager) => parsedManager.hired[manager.id] === true && manager.effect === 'AUTOMATIC')
    console.log(hiredManager);

    if (hiredManager.length === 0)
      return 0;
    
    
    //console.log('hasManagerItem', hasManagerItem);
    
    // let parsedManager = JSON.parse(manager);
    // let hiredAutomatedManager = staticdata.getAutomateManagers().filter(managerData => parsedManager[managerData.id] );

  }
} 
