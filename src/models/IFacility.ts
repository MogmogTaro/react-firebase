import { ISystem } from "./ISystem";

export type IFaciliry = {
  id: string;
  name: string;
  note?: string;
  system: ISystem;
};
