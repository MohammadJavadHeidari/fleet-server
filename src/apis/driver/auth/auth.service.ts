import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
// Schemas
import { DriverSchemaClass } from '@src/apis/admin/driver/entities/driver.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
// 
import { JwtService } from '@nestjs/jwt';
import { ClsService } from '@src/common/cls/cls.service';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

interface OtpRecord {
  code: string;
  expires: number; // epoch ms
}

@Injectable()
export class AuthService {
  private readonly otps = new Map<string, OtpRecord>();

  constructor(
    @InjectModel(DriverSchemaClass.name)
    private readonly driverModel: Model<DriverSchemaClass>,
    private readonly jwtService: JwtService,
    private readonly cls: ClsService,
  ) {}

  async me() {
    try {
      const driverId = this.cls.get('driver.id');

      // Check if driver already exists
      const existingDriver = await this.driverModel.findById(driverId).lean();

      if (!existingDriver) {
        throw new BadRequestException('Driver not found');
      }

      const { ...driverResponse } = existingDriver;

      return {
        success: true,
        message: 'Driver fetched successfully',
        data: driverResponse,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error fetching driver',
        data: {},
      };
    }
  }

  async sendOtp(dto: RequestOtpDto) {
    try {
      // Find user by email
      const driver = await this.driverModel.findOne({ phoneNumber: dto.phoneNumber }).lean();

      if (!driver) {
        throw new UnauthorizedException('Invalid phone number');
      }

      const code = this.generateOtp();

      this.otps.set(driver.phoneNumber, { code, expires: Date.now() + 5 * 60 * 1000 });


      console.log(`OTP code ${code} sent to driver with phone number: ${driver.phoneNumber}`);

      return {
        success: true,
        message: 'code has been sent to driver',
        data: { phoneNumber: driver.phoneNumber, otp: code },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error signing in driver',
        data: {},
      };
    }
  }

  async verifyOtp(dto: VerifyOtpDto) {
    try {
      const record = this.otps.get(dto.phoneNumber);

      if (!record || record.code != dto.otp) {
        throw new UnauthorizedException('کد اعتبارسنجی نادرست است');
      }

      this.otps.delete(dto.phoneNumber);

      const driver = await this.driverModel.findOne({ phoneNumber: dto.phoneNumber })!;

      if (!driver) {
        throw new UnauthorizedException('Invalid phone number');
      }

      const { _id, firstName, lastName, phoneNumber } = driver;

      const payload = { driverId: _id, phoneNumber: phoneNumber };

      const accessToken = await this.jwtService.signAsync(payload);

      return {
        success: true,
        message: 'Driver signed in successfully',
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
        message: error.message || 'Error signing in driver',
        data: {},
      };
    }
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6‑digit numeric
  }
}
