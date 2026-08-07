import { Incident } from "../incident/incidentRequest.model";

export interface Area {
  id: number;
  name: string;
  incidents:Incident[]
}