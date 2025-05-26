import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserSchemaClass } from './entities/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { SigninAuthDto } from './dto/signin-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(UserSchemaClass.name)
    private readonly userModel: Model<UserSchemaClass>,
    private readonly jwtService: JwtService,
  ) { }


  async signin(signinAuthDto: SigninAuthDto) {
    try {
      // Find user by email
      const user = await this.userModel.findOne({ email: signinAuthDto.email }).lean()
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      // Check if password matches using bcrypt
      const isPasswordValid = await bcrypt.compare(signinAuthDto.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const { _id, email, firstName, lastName } = user;

      const payload = { userId: user._id, email: user.email };

      const accessToken = await this.jwtService.signAsync(payload);

      return {
        success: true,
        message: 'User signed in successfully',
        data: { accessToken, email, firstName, lastName }
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error signing in',
        data: {}
      };
    }
  }

  async signup(signupAuthDto: SignupAuthDto) {
    try {
      // Check if user already exists
      const existingUser = await this.userModel.findOne({ email: signupAuthDto.email });
      if (existingUser) {
        throw new BadRequestException('User with this email already exists');
      }

      // Create new user with hashed password
      const createdUser = await this.userModel.create(signupAuthDto);

      const { password, ...userResponse } = createdUser.toObject();

      return {
        success: true,
        message: 'User created successfully',
        data: userResponse,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error creating user',
        data: {},
      };
    }
  }
}
