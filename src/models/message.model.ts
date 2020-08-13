import {User} from './user.model';

export interface Message {
  id: number;
  content: string;
  readonly creationTime: Date;
  readonly user: User;
}
