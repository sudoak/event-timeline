export interface timeLineInterface {
  id: number;
  eventId: number;
  name: string;
  desc: string;
  status: string;
  pics: [{ url: string }];
  datetime: Date;
}
