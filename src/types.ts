export type entry_schema = {
  id: number;
  type: "Motor" | "Car" | "Van";
  owner: string;
  plate: string;
  status: "Parking" | "Reserved";
  time_parked: Date;
};
