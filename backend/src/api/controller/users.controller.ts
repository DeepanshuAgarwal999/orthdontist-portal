import {
  Controller,
  Get,
  Delete,
  Patch,
  Param,
  Query,
  Body,
  UseGuards,
  ValidationPipe,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../services/users.service';
import { UsersQueryDto, UpdateUserStatusDto } from '../dto/users.dto';
import { AuthGuard, UserRole } from '../../guards/auth.guard';
import { RolesGuard, Roles } from '../../guards/role.guard';

@Controller('users')
@Roles(UserRole.ADMIN)
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get all users with filtering and pagination (Admin only)
   * GET /api/v1/users
   */
  @Get()
  async getAllUsers(
    @Query(ValidationPipe) query: UsersQueryDto,
    @Res() res: Response,
  ) {
    const result = await this.usersService.getAllUsers(query);
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Users retrieved successfully',
      users: result.users,
      total: result.pagination.total,
      page: result.pagination.page,
      limit: result.pagination.limit,
      totalPages: result.pagination.totalPages,
    });
  }

  /**
   * Get user statistics (Admin only)
   * GET /api/v1/users/statistics
   */
  @Get('statistics')
  async getUserStatistics(@Res() res: Response) {
    const stats = await this.usersService.getUserStatistics();

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'User statistics retrieved successfully',
      data: stats,
    });
  }

  /**
   * Get user by ID (Admin only)
   * GET /api/v1/users/:id
   */
  @Get(':id')
  async getUserById(@Param('id') id: string, @Res() res: Response) {
    const user = await this.usersService.getUserById(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    });
  }

  /**
   * Update user status (Admin only)
   * PATCH /api/v1/users/:id/status
   */
  @Patch(':id/status')
  async updateUserStatus(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserStatusDto: UpdateUserStatusDto,
    @Res() res: Response,
  ) {
    const user = await this.usersService.updateUserStatus(
      id,
      updateUserStatusDto.isEmailVerified,
    );

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'User status updated successfully',
      data: user,
    });
  }

  /**
   * Delete user (Admin only)
   * DELETE /api/v1/users/:id
   */
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    const result = await this.usersService.deleteUser(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: result.message,
    });
  }
}
