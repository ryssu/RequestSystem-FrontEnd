import { UserRole } from "./userrole";

export class Account {
    myId: number = 0;
    userID: string = "";
    dateCreated: string = "";
    username: string = "";
    password: string = "";
    role: UserRole; // Assuming UserRole is another TypeScript class representing the role

}

