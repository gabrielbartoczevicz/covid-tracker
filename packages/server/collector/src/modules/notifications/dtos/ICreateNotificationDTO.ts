export default interface ICreateNotificationDTO {
  date: Date;
  epi_week: number;
  notifications: number;
  deaths: number;
  recovered: number;
  city_id: string;
}
