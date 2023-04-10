import { Roles } from "@shared/models/role.enum";

export interface Address {
  country: string;
  city: string;
  zip: string;
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  birthdate: string;
  about: string;
  genre: string;
  roles: Roles[];
  address: Address;
  username: string;
}
