import { Station } from "../../station/domain/station";

    export class Employee {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    station: Station;
    createdAt: Date;
    updatedAt: Date;
}
