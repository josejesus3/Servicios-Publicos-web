import { Area } from "../area/areaRequest.model";

export interface Incident {
  id: number;
  title: string;
  description: string;
  direction: string;
  latitude: number;
  longitude: number;
  status: string;
  area_id: number;
  resolution_expire: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  media: any[];
  area: Area;
}