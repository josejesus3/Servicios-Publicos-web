export interface IncidentRequest {
  title: string;
  description: string;
  direction: string;
  area_id: number;
  latitude?: number | 0.0;
  longitude?: number | 0.0;
  status?: string;
}