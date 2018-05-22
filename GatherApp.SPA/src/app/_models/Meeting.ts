import { User } from './User';

export interface Meeting {

    id: number;
    description: string;
    startingTime: Date;
    finishingTime: Date;
    user: User;

}

