export type entry_schema = {
  id: number;
  type: "Bike" | "E-Bike" | "Motor" | "Tricycle" | "Car" | "Van" | "Truck";
  owner: string;
  plate: string;
  status: "Parking" | "Reserved" | "Rejected" | "Pending" | "Exited";
  time_parked: Date;
  contact: string;
  time_exited: Date;
};

export type entry_print = {
  id: number;
  type: "Bike" | "E-Bike" | "Motor" | "Tricycle" | "Car" | "Van" | "Truck";
  owner: string;
  plate: string;
  status: "Parking" | "Reserved" | "Rejected" | "Pending" | "Exited";
  time: string;
};
