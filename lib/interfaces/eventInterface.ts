export interface eventInterface {
  id: number;
  eventName: string;
  referenceName?: string;
  startDate: Date;
  endDate: Date;
  userId: string;
  status: string;
  password: string;
  amount: number;
}

export interface EventInterfaceDetail extends eventInterface {
  inventory: {
    id: number;
    pendal: {
      size4: number;
      size2: number;
    };
    table: {
      buffetCloth: number;
      round: number;
    };
    plates: number;
    buckets: number;
    washBasin: number;
    chairs: number;
    spoons: number;
    basin: number;
  };
  decoration: Array<Object>;
  timeline: Array<Object>;
}
