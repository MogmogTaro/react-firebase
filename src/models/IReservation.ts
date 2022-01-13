import { ISystem } from "./ISystem";
import { Dayjs } from "dayjs";

export type IReservation = {
  id: string;
  facilityId: string;
  subject: string;
  description: string;
  startDate: Dayjs;
  endDate: Dayjs;
  system: ISystem;
};
