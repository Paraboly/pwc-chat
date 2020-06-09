export interface IMessageItem {
  id: string;
  username: string;
  message: string;
  time: string;
  editTime?: string;
  editable: boolean;
  deletable: boolean;
}
