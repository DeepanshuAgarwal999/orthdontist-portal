import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  ValidationPipe,
  HttpStatus,
  Res,
  Patch,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DentistService } from '../services/dentist.service';
import {
  CreateDentistProfileDto,
  UpdateDentistProfileDto,
  DentistQueryDto,
  VerifyDentistDto,
} from '../dto/dentist.dto';
import { AuthGuard, UserRole } from '../../guards/auth.guard';
import { RolesGuard, Roles } from '../../guards/role.guard';

@Controller('dentists')
export class DentistController {
  constructor(private readonly dentistService: DentistService) {}

  // ==================== DENTIST ROUTES ====================

  /**
   * Create dentist profile (Dentist only)
   * POST /api/v1/dentists/profile
   */
  @Post('profile')
  @Roles(UserRole.DENTIST)
  @UseGuards(AuthGuard, RolesGuard)
  async createProfile(
    @Body(ValidationPipe) createProfileDto: CreateDentistProfileDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const profile = await this.dentistService.createProfile(
      createProfileDto,
      req.user.id,
    );

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Dentist profile created successfully',
      data: profile,
    });
  }

  /**
   * Get my dentist profile (Dentist only)
   * GET /api/v1/dentists/profile/me
   */
  @Get('profile/me')
  @Roles(UserRole.DENTIST)
  @UseGuards(AuthGuard, RolesGuard)
  async getMyProfile(@Req() req: Request, @Res() res: Response) {
    const profile = await this.dentistService.getMyProfile(req.user.id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: profile,
    });
  }

  /**
   * Update my dentist profile (Dentist only)
   * PUT /api/v1/dentists/profile/me
   */
  @Put('profile/me')
  @Roles(UserRole.DENTIST)
  @UseGuards(AuthGuard, RolesGuard)
  async updateMyProfile(
    @Body(ValidationPipe) updateProfileDto: UpdateDentistProfileDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const profile = await this.dentistService.updateProfile(
      req.user.id,
      updateProfileDto,
      req.user.role,
    );

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Profile updated successfully',
      data: profile,
    });
  }

  /**
   * Toggle my profile active status (Dentist only)
   * PATCH /api/v1/dentists/profile/me/toggle-active
   */
  @Patch('profile/me/toggle-active')
  @Roles(UserRole.DENTIST)
  @UseGuards(AuthGuard, RolesGuard)
  async toggleMyActiveStatus(@Req() req: Request, @Res() res: Response) {
    const profile = await this.dentistService.toggleActiveStatus(
      req.user.id,
      req.user.role,
    );

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Profile status updated successfully',
      data: profile,
    });
  }

  // ==================== ADMIN ROUTES ====================

  /**
   * Get all dentist profiles for admin (Admin only)
   * GET /api/v1/dentists/admin
   */
  @Get('admin')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async getAllDentistsAdmin(
    @Query() query: DentistQueryDto,
    @Res() res: Response,
  ) {
    const result = await this.dentistService.getAllDentistsAdmin(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Dentists retrieved successfully',
      data: result.data,
      pagination: result.pagination,
    });
  }

  /**
   * Get dentist statistics (Admin only)
   * GET /api/v1/dentists/admin/statistics
   */
  @Get('admin/statistics')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async getDentistStatistics(@Res() res: Response) {
    const stats = await this.dentistService.getDentistStatistics();

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Dentist statistics retrieved successfully',
      data: stats,
    });
  }

  /**
   * Verify/Unverify dentist (Admin only)
   * PATCH /api/v1/dentists/admin/:id/verify
   */
  @Patch('admin/:id/verify')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async verifyDentist(
    @Param('id') id: string,
    @Body(ValidationPipe) verifyDto: VerifyDentistDto,
    @Res() res: Response,
  ) {
    const profile = await this.dentistService.verifyDentist(id, verifyDto);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: `Dentist ${verifyDto.isVerified ? 'verified' : 'unverified'} successfully`,
      data: profile,
    });
  }

  /**
   * Update any dentist profile (Admin only)
   * PUT /api/v1/dentists/admin/:userId
   */
  @Put('admin/:userId')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async updateDentistProfile(
    @Param('userId') userId: string,
    @Body(ValidationPipe) updateProfileDto: UpdateDentistProfileDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const profile = await this.dentistService.updateProfile(
      req.user.id,
      updateProfileDto,
      req.user.role,
      userId,
    );

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Dentist profile updated successfully',
      data: profile,
    });
  }

  /**
   * Delete dentist profile (Admin only)
   * DELETE /api/v1/dentists/admin/:id
   */
  @Delete('admin/:id')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async deleteDentistProfile(@Param('id') id: string, @Res() res: Response) {
    const result = await this.dentistService.deleteProfile(
      '',
      UserRole.ADMIN,
      id,
    );

    return res.status(HttpStatus.OK).json({
      success: true,
      message: result.message,
    });
  }

  // ==================== PUBLIC ROUTES ====================

  /**
   * Get all verified dentists for public map (Public access)
   * GET /api/v1/dentists
   */
  @Get()
  async getPublicDentists(
    @Query() query: DentistQueryDto,
    @Res() res: Response,
  ) {
    const result = await this.dentistService.getPublicDentists(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Dentists retrieved successfully',
      data: result.data,
      pagination: result.pagination,
    });
  }

  /**
   * Get dentist profile by ID (Public access for verified dentists)
   * GET /api/v1/dentists/:id
   */
  @Get(':id')
  async getDentistById(@Param('id') id: string, @Res() res: Response) {
    const dentist = await this.dentistService.getDentistById(id);

    // Only show verified and active profiles to public
    if (!dentist.isVerified || !dentist.isActive) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Dentist not found',
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Dentist profile retrieved successfully',
      data: dentist,
    });
  }
}
