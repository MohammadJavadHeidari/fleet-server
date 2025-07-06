import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeSchemaClass, EmployeeWithVirtuals } from './entities/employee.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EmployeeMapper } from './mappers/employee.mapper';
import { StationSchemaClass } from '../station/entities/station.schema';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(EmployeeSchemaClass.name) private readonly employeeModel: Model<EmployeeSchemaClass>,
    @InjectModel(StationSchemaClass.name) private readonly stationModel: Model<StationSchemaClass>,
  ) {}

  async getEmployees() {
    const employees = await this.employeeModel.find().populate({
      path: 'stationId',
      model: this.stationModel,
    });

    return {
      success: true,
      message: 'Employees fetched successfully',
      results: {
        data: employees.map((employee) => EmployeeMapper.toDomain(employee as unknown as EmployeeWithVirtuals)),
        total: employees.length,
      },
    };
  }

  async create(createEmployeeDto: CreateEmployeeDto) {
    // Check if employee already exists by phone number
    const existingEmployeeByPhone = await this.employeeModel.findOne({
      phoneNumber: createEmployeeDto.phoneNumber,
    });

    if (existingEmployeeByPhone) {
      throw new BadRequestException('Employee with this phone number already exists');
    }

     // Check if employee already exists by email
     const existingEmployeeByEmail = await this.employeeModel.findOne({
      email: createEmployeeDto.email,
    });

    if (existingEmployeeByEmail) {
      throw new BadRequestException('Employee with this email already exists');
    }

    const employee = await this.employeeModel.create(createEmployeeDto);

    return {
      success: true,
      message: 'Employee created successfully',
      results: EmployeeMapper.toDomain(employee as unknown as EmployeeWithVirtuals),
    };
  }
}
