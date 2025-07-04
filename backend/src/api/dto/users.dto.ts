import {
  IsOptional,
  IsString,
  IsEnum,
  IsBoolean,
  IsNumberString,
} from 'class-validator';
import { UserRole } from '../../guards/auth.guard';

export class UsersQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsBoolean()
  isEmailVerified?: boolean;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}

export class UpdateUserStatusDto {
  @IsBoolean()
  isEmailVerified: boolean;
}
