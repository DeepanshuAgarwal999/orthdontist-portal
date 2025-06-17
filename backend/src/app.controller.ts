import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthGuard, UserRole } from './guards/auth.guard';
import { Roles, RolesGuard } from './guards/role.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @Get('users')
  async getUsers() {
    const totalUsers = await this.prismaService.user.count();
    return {
      success: true,
      totalUsers,
    };
  }
}
