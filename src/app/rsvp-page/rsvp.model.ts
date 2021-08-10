export interface RsvpDataModel {
  uid: string;
  name: string;
  comment: string;
  attending: boolean;
  attendees: number;
  phoneNumber?: string;
  email?: string;
  authorized?: boolean;
}