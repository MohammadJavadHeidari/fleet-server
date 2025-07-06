import { Route } from "../../route/domain/route";

export class Driver {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    nationalId: string;
    licensePlateTwoDigit: number;
    licensePlateLetter: string;
    licensePlateThreeDigit: number;
    licensePlateProvince: number;
    carBrand: string;
    carColor: string;
    carProductionDate: number;
    isActive: boolean;
    route: Route;
    createdAt: Date;
    updatedAt: Date;
}
