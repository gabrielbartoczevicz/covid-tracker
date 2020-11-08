export default interface IFindNotificationsByCitiesIDAndDateIntervalDTO {
  cities_id: string[];
  interval: {
    start: Date;
    end: Date;
  }
}
