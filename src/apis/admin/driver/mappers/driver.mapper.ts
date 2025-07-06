
import { Driver } from '../domain/driver';
import { DriverWithVirtuals } from '../entities/driver.schema';

export class DriverMapper {
  static toDomain(raw: DriverWithVirtuals): Driver {
    const driver = new Driver();
    driver.id = raw._id.toString();
    driver.firstName = raw.firstName;
    driver.lastName = raw.lastName;
    driver.phoneNumber = raw.phoneNumber;
    driver.nationalId = raw.nationalId;
    driver.licensePlateTwoDigit = raw.licensePlateTwoDigit;
    driver.licensePlateLetter = raw.licensePlateLetter;
    driver.licensePlateThreeDigit = raw.licensePlateThreeDigit;
    driver.licensePlateProvince = raw.licensePlateProvince;
    driver.carBrand = raw.carBrand;
    driver.carColor = raw.carColor;
    driver.carProductionDate = raw.carProductionDate;
    driver.isActive = raw.isActive;
    driver.route = raw.routeId;
    driver.createdAt = raw.createdAt;
    driver.updatedAt = raw.updatedAt;
    return driver;
  }
}
