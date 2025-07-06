import { Station } from '../../station/domain/station';
import { Employee } from '../domain/employee';
import { EmployeeWithVirtuals } from '../entities/employee.schema';

export class EmployeeMapper {
  static toDomain(raw: EmployeeWithVirtuals): Employee {
    const employee = new Employee();
    employee.id = raw._id.toString();
    employee.firstName = raw.firstName;
    employee.lastName = raw.lastName;
    employee.fullName = raw.fullName;
    employee.phoneNumber = raw.phoneNumber;
    employee.email = raw.email;
    employee.station = raw.stationId;
    employee.createdAt = raw.createdAt;
    employee.updatedAt = raw.updatedAt;
    return employee;
  }
}
