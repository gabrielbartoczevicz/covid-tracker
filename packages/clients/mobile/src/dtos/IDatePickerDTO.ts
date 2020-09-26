export default interface IDatePickerDTO {
  timeInterval?: {
    start: Date,
    end: Date
  };
  allTime: boolean;
  dateFormatted: string;
}
