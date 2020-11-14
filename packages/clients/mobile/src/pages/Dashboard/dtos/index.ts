export interface IDatePicker {
  interval: {
    start: Date,
    end: Date,
  },
  dateFormatted: string;
}

export interface INotifications {
  meta: {
    total_notifications: number;
    total_deaths: number;
    total_recovered: number;
  },
  notifications: Array<{
    date: Date,
    notifications: number;
    deaths: number;
    recovered: number;
  }>
}

export interface IResponse {
  meta: {
    total_notifications: number;
    total_deaths: number;
    total_recovered: number;
  },
  notifications: Array<{
    date: string,
    notifications: number;
    deaths: number;
    recovered: number;
  }>
}

export interface IFormData {
  state_name?: string;
  city_name: string;
}

export interface IRequest {
  state_name?: string;
  city_name: string;
  interval: {
    start: Date;
    end: Date;
  }
}

export interface IFormatted {
  label: string;
  value: number;
}
