import { Area } from "../area/areaRequest.model";
import { Role } from "../role/rolesRequest.model";

export interface UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  role:Role;
  role_id: number;
  area:Area;
  area_id: number;
  estado?:boolean

}
