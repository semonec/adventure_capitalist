export default class PlayerDataService {
  private static instance: PlayerDataService;

  static getInstance(): PlayerDataService {
    if (PlayerDataService.instance) {
      return PlayerDataService.instance;
    } else {
      PlayerDataService.instance = new PlayerDataService();
      return PlayerDataService.instance;
    }
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
    return cash !== null ? Number.parseInt(cash) : 0;
  }

  storeUserBusiness(business: any) {
    window.localStorage.setItem(business.name, JSON.stringify(business));
  }

  loadUserBusiness(business: any) {
    let item = window.localStorage.getItem(business);
    return item !== null ? JSON.parse(item) : null;
  }

  storeUserManager(manager: any) {
    window.localStorage.setItem('manager', JSON.stringify(manager));
  }

  loadUserManager() {
    let item = window.localStorage.getItem('manager');
    return item !== null ? JSON.parse(item) : null;
  }

  calculateBackgroundEarned() {
    let cash = window.localStorage.getItem('cash');
    let time = window.localStorage.getItem('time');
    let business = window.localStorage.getItem('business');
    let manager = window.localStorage.getItem('manager');

    if (cash === null || time === null || business === null || manager === null)
      return 0;

    // get time gap between saved time and current time
    let currentTime = new Date().getTime();
    let backgrounded = currentTime - Number.parseInt(time);
    
    // calculate businessitem's revenue per ms, which has it's automation manager
    let parsedManager = JSON.parse(manager);
    let parsedBusiness = JSON.parse(business);


    // get hiredManager
    let hiredManager = parsedManager.list.filter((manager) => parsedManager.hired[manager.id] === true && manager.effect === 'AUTOMATIC')
    if (hiredManager.length === 0)
      return 0;
  }
} 
