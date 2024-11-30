export type entry_schema = {
  id: number;
  type: "Motor" | "Car" | "Van";
  owner: string;
  plate: string;
  status: "Parking" | "Reserved" | "Rejected" | "Pending" | "Exited";
  time_parked: Date;
  contact: string;
  time_exited: Date;
};
