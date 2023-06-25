export enum TypeNotification {
  SUCCESS,
  FAIL,
  WARNING
}

export interface INotification {
  title: string;
  type: TypeNotification;
  text: string;
  id: number;
}