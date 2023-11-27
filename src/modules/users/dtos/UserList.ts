import { UserRole } from '../entity/User';

export interface UserList {
  id: string;
  name: string;
  username: string;
  role: UserRole;
}
