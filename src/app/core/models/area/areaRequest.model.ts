import { Incident } from "../incident/incidentRequest.model";
import { UserModel } from "../user/user.model";

export interface Area {
  id: number;
  name: string;
  slug: string;
  estado?: boolean;
  users: UserModel[]
  incidents: Incident[]
}