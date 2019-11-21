/**
 * Player's data save/load within localStorage
 * Currently not considered with fullstack development. so I'll store game data into localStorage only.
 */
export default class PlayerDataService {
  private static instance: PlayerDataService;

  // Making singleton instance for the service. share one service within components, reduce memory cost.
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
  // time will be updated only when 
  storeUserMoney(cash: number) {
    window.localStorage.setItem('cash', cash.toString());
    window.localStorage.setItem('time', new Date().getTime().toString());
  }
  // load user's stored money and return it
  loadUserMoney(): number {
    let cash = window.localStorage.getItem('cash');
    return cash !== null ? Number.parseInt(cash) : 0;
  }
  // store user's business status as json
  storeUserBusiness(business: any) {
    window.localStorage.setItem(business.name, JSON.stringify(business));
  }
  // load user's business status and convert it as object.
  loadUserBusiness(business: any) {
    let item = window.localStorage.getItem(business);
    return item !== null ? JSON.parse(item) : null;
  }
  // store user's current manager situation
  storeUserManager(manager: any) {
    window.localStorage.setItem('manager', JSON.stringify(manager));
  }
  // load user's current manager situation
  loadUserManager() {
    let item = window.localStorage.getItem('manager');
    return item !== null ? JSON.parse(item) : null;
  }
  /**
   * TODO: while user offline, it should be counted with automated business items.
   * Calculate Background Earned
   * 1. load stored latest time and gold, business status (USER_STORED_GOLD)
   * 2. get current time and obtain time differences (TIME_GAP)
   * 3. calcuate automated business item's earning/ms (EARNING_PER_MS)
   * 4. Among the business items, calculate condition with not automated and busy state's items's earning  (INCOME_SINGLE)
   * 5. so the calculated cost would be TIME_GAP * EARNING_PER_MS + USER_STORED_GOLD + INCOME_SINGLE
   * It will not the correct answer but, considerable value I think. 
   * @returns {number} gold that will be calculated whie backgrounded(off-lined) earnings + user earned
   */
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
