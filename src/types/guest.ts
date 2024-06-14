import { Beer } from "./beer";

export type Guest = {
  id: number;
  name: string;
  email?: string | null;
  phone?: string | null;
  notifications: Beer[];
}
