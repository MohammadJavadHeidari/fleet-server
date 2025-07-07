import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { EmployeeSchemaClass } from '@src/apis/admin/employee/entities/employee.schema';
//
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ClsService } from '@src/common/cls/cls.service';

interface OtpRecord {
  code: string;
  expires: number; // epoch ms
}

@Injectable()
export class AuthService {
  private readonly otps = new Map<string, OtpRecord>();

  constructor(
    @InjectModel(EmployeeSchemaClass.name) private readonly employeeModel: Model<EmployeeSchemaClass>,
    //
    private readonly jwtService: JwtService,
    private readonly cls: ClsService,
  ) {}

  async me() {
    try {
      const employeeId = this.cls.get('employee.id');

      // Check if user already exists
      const existingEmployee = await this.employeeModel.findById(employeeId).lean();

      if (!existingEmployee) {
        throw new BadRequestException('Employee not found');
      }

      const { password, ...userResponse } = existingEmployee;

      return {
        success: true,
        message: 'User fetched successfully',
        data: userResponse,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error fetching user',
        data: {},
      };
    }
  }

  async sendOtp(dto: RequestOtpDto) {
    try {
      const employee = await this.employeeModel.findOne({ phoneNumber: dto.phoneNumber }).lean();

      if (!employee) {
        throw new UnauthorizedException('Invalid phone number');
      }

      const code = this.generateOtp();

      this.otps.set(employee.phoneNumber, { code, expires: Date.now() + 5 * 60 * 1000 });

      console.log(`OTP code ${code} sent to employee with phone number: ${employee.phoneNumber}`);

      return {
        success: true,
        message: 'code has been sent to employee',
        data: { phoneNumber: employee.phoneNumber, otp: code },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error signing in employee',
        data: {},
      };
    }
  }

  async verifyOtp(dto: VerifyOtpDto) {
    try {
      const record = this.otps.get(dto.phoneNumber);

      if (!record || record.expires < Date.now() || record.code !== dto.otp) {
        throw new UnauthorizedException('Invalid or expired OTP');
      }

      this.otps.delete(dto.phoneNumber);

      const employee = await this.employeeModel.findOne({ phoneNumber: dto.phoneNumber })!;

      if (!employee) {
        throw new UnauthorizedException('Invalid phone number');
      }

      const { _id, firstName, lastName, phoneNumber } = employee;

      const payload = { employeeId: _id, phoneNumber: phoneNumber };

      const accessToken = await this.jwtService.signAsync(payload);

      console.log('Employee signed in successfully with phone number: ', phoneNumber);

      return {
        success: true,
        message: 'Employee signed in successfully',
        data: {
          accessToken,
          firstName,
          lastName,
          phoneNumber,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error signing in employee',
        data: {},
      };
    }
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6‑digit numeric
  }
}
