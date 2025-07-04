import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRole } from '../../guards/auth.guard';

export interface UserQuery {
  search?: string;
  role?: UserRole;
  isEmailVerified?: boolean;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Get all users with filtering and pagination (Admin only)
  async getAllUsers(query: UserQuery) {
    const {
      search,
      role,
      isEmailVerified,
      page = '1',
      limit = '10',
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Build where condition
    const where: any = {};

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (isEmailVerified !== undefined) {
      where.isEmailVerified = isEmailVerified;
    }

    // Get total count for pagination
    const total = await this.prisma.user.count({ where });

    // Get users
    const users = await this.prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,
        clinicName: true,
        location: true,
      },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limitNum,
    });

    return {
      users,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
        hasNextPage: pageNum * limitNum < total,
        hasPrevPage: pageNum > 1,
      },
    };
  }

  // Get user by ID (Admin only)
  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,
        clinicName: true,
        location: true,
        latitude: true,
        longitude: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role === UserRole.ADMIN) {
      throw new ForbiddenException('Cannot access admin user details');
    }

    return user;
  }

  // Update user status (Admin only)
  async updateUserStatus(id: string, isEmailVerified: boolean) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role === UserRole.ADMIN) {
      throw new ForbiddenException('Cannot modify admin user');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { isEmailVerified },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  // Delete user (Admin only)
  async deleteUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role === UserRole.ADMIN) {
      throw new ForbiddenException('Cannot delete admin user');
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return { message: 'User deleted successfully' };
  }

  // Get user statistics (Admin only)
  async getUserStatistics() {
    const [totalUsers, totalDentists, totalPatients, verifiedUsers] =
      await Promise.all([
        this.prisma.user.count({
          where: { NOT: { role: UserRole.ADMIN } },
        }),
        this.prisma.user.count({
          where: {
            isEmailVerified: true,
            NOT: { role: UserRole.ADMIN },
          },
        }),
        this.prisma.user.count({
          where: {
            isEmailVerified: false,
            NOT: { role: UserRole.ADMIN },
          },
        }),
        this.prisma.user.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
            },
            NOT: { role: UserRole.ADMIN },
          },
        }),
      ]);

    return {
      totalUsers,
      totalDentists,
      totalPatients,
      verifiedUsers,
    };
  }
}
