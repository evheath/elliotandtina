export interface UploadDataModel {
  uid: string;
  name: string;
  downloadURL: string;
  path: string;
  likers: string[];
  timestamp: number;
  comment?: string;
}