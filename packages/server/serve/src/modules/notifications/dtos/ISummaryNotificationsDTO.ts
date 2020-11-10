type INotifications = Array<{
  date: Date,
  notifications: number;
  deaths: number;
  recovered: number;
}>;

interface IMeta {
  total_notifications: number;
  total_deaths: number;
  total_recovered: number;
}

export { IMeta, INotifications };
