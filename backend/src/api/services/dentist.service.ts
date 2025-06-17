import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateDentistProfileDto,
  UpdateDentistProfileDto,
  DentistQueryDto,
  VerifyDentistDto,
} from '../dto/dentist.dto';
import { UserRole } from '../../guards/auth.guard';

@Injectable()
export class DentistService {
  constructor(private readonly prisma: PrismaService) {}

  // Create dentist profile (Only dentists can create their own profile)
  async createProfile(
    createProfileDto: CreateDentistProfileDto,
    userId: string,
  ) {
    // Check if user exists and is a dentist
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== 'dentist') {
      throw new ForbiddenException('Only dentists can create a profile');
    }

    // Check if profile already exists
    const existingProfile = await this.prisma.dentistProfile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      throw new ConflictException('Dentist profile already exists');
    }

    const profile = await this.prisma.dentistProfile.create({
      data: {
        ...createProfileDto,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            email: true,
          },
        },
      },
    });

    return profile;
  }

  // Get all verified dentist profiles for public map display
  async getPublicDentists(query: DentistQueryDto) {
    const {
      city,
      state,
      search,
      specialty,
      latitude,
      longitude,
      radius,
      page = '1',
      limit = '20',
    } = query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Build where condition
    const where: any = {
      isActive: true,
      isVerified: true, // Only show verified dentists
    };

    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    if (state) {
      where.state = { contains: state, mode: 'insensitive' };
    }

    if (search) {
      where.OR = [
        { clinicfirstName: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (specialty) {
      where.specialties = { has: specialty };
    }

    // For radius search (basic implementation)
    if (latitude && longitude && radius) {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      const radiusKm = parseFloat(radius);

      // Simple bounding box (more accurate geospatial search would require additional libraries)
      const latDelta = radiusKm / 111; // Rough conversion
      const lngDelta = radiusKm / (111 * Math.cos(lat * (Math.PI / 180)));

      where.latitude = {
        gte: lat - latDelta,
        lte: lat + latDelta,
      };
      where.longitude = {
        gte: lng - lngDelta,
        lte: lng + lngDelta,
      };
    }

    const total = await this.prisma.dentistProfile.count({ where });

    const dentists = await this.prisma.dentistProfile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
          },
        },
      },
      skip,
      take: limitNum,
      orderBy: { createdAt: 'desc' },
    });

    return {
      data: dentists,
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

  // Get all dentist profiles for admin (including unverified)
  async getAllDentistsAdmin(query: DentistQueryDto) {
    const { city, state, search, specialty, page = '1', limit = '20' } = query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Build where condition
    const where: any = {};

    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    if (state) {
      where.state = { contains: state, mode: 'insensitive' };
    }

    if (search) {
      where.OR = [
        { clinicfirstName: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { user: { firstName: { contains: search, mode: 'insensitive' } } },
      ];
    }

    if (specialty) {
      where.specialties = { has: specialty };
    }

    const total = await this.prisma.dentistProfile.count({ where });

    const dentists = await this.prisma.dentistProfile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            email: true,
          },
        },
      },
      skip,
      take: limitNum,
      orderBy: { createdAt: 'desc' },
    });

    return {
      data: dentists,
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

  // Get dentist profile by ID
  async getDentistById(id: string) {
    const dentist = await this.prisma.dentistProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            email: true,
          },
        },
      },
    });

    if (!dentist) {
      throw new NotFoundException('Dentist profile not found');
    }

    return dentist;
  }

  // Get current user's dentist profile
  async getMyProfile(userId: string) {
    const profile = await this.prisma.dentistProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            email: true,
          },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Dentist profile not found');
    }

    return profile;
  }

  // Update dentist profile
  async updateProfile(
    userId: string,
    updateProfileDto: UpdateDentistProfileDto,
    userRole: UserRole,
    targetUserId?: string,
  ) {
    // Determine which profile to update
    const profileUserId =
      userRole === UserRole.ADMIN && targetUserId ? targetUserId : userId;

    const existingProfile = await this.prisma.dentistProfile.findUnique({
      where: { userId: profileUserId },
    });

    if (!existingProfile) {
      throw new NotFoundException('Dentist profile not found');
    }

    // Check permissions
    if (userRole !== UserRole.ADMIN && existingProfile.userId !== userId) {
      throw new ForbiddenException('You can only update your own profile');
    }

    const updatedProfile = await this.prisma.dentistProfile.update({
      where: { userId: profileUserId },
      data: updateProfileDto,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            email: true,
          },
        },
      },
    });

    return updatedProfile;
  }

  // Verify/Unverify dentist (Admin only)
  async verifyDentist(id: string, verifyDto: VerifyDentistDto) {
    const profile = await this.prisma.dentistProfile.findUnique({
      where: { id },
    });

    if (!profile) {
      throw new NotFoundException('Dentist profile not found');
    }

    const updatedProfile = await this.prisma.dentistProfile.update({
      where: { id },
      data: { isVerified: verifyDto.isVerified },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            email: true,
          },
        },
      },
    });

    return updatedProfile;
  }

  // Toggle active status
  async toggleActiveStatus(
    userId: string,
    userRole: UserRole,
    targetId?: string,
  ) {
    let profileToUpdate: string;

    if (userRole === UserRole.ADMIN && targetId) {
      // Admin updating another dentist's profile
      profileToUpdate = targetId;
    } else {
      // Dentist updating their own profile
      const profile = await this.prisma.dentistProfile.findUnique({
        where: { userId },
      });

      if (!profile) {
        throw new NotFoundException('Dentist profile not found');
      }

      profileToUpdate = profile.id;
    }

    const existingProfile = await this.prisma.dentistProfile.findUnique({
      where: { id: profileToUpdate },
    });

    if (!existingProfile) {
      throw new NotFoundException('Dentist profile not found');
    }

    const updatedProfile = await this.prisma.dentistProfile.update({
      where: { id: profileToUpdate },
      data: { isActive: !existingProfile.isActive },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            email: true,
          },
        },
      },
    });

    return updatedProfile;
  }

  // Delete profile (Admin only or own profile)
  async deleteProfile(userId: string, userRole: UserRole, targetId?: string) {
    let profileToDelete: string;

    if (userRole === UserRole.ADMIN && targetId) {
      profileToDelete = targetId;
    } else {
      const profile = await this.prisma.dentistProfile.findUnique({
        where: { userId },
      });

      if (!profile) {
        throw new NotFoundException('Dentist profile not found');
      }

      profileToDelete = profile.id;
    }

    const existingProfile = await this.prisma.dentistProfile.findUnique({
      where: { id: profileToDelete },
    });

    if (!existingProfile) {
      throw new NotFoundException('Dentist profile not found');
    }

    await this.prisma.dentistProfile.delete({
      where: { id: profileToDelete },
    });

    return { message: 'Dentist profile deleted successfully' };
  }

  // Get dentist statistics (Admin only)
  async getDentistStatistics() {
    const [
      totalDentists,
      verifiedDentists,
      activeDentists,
      unverifiedDentists,
    ] = await Promise.all([
      this.prisma.dentistProfile.count(),
      this.prisma.dentistProfile.count({ where: { isVerified: true } }),
      this.prisma.dentistProfile.count({ where: { isActive: true } }),
      this.prisma.dentistProfile.count({ where: { isVerified: false } }),
    ]);

    // Get popular cities
    const popularCities = await this.prisma.dentistProfile.groupBy({
      by: ['city'],
      _count: { city: true },
      where: { isActive: true },
      orderBy: {
        _count: { city: 'desc' },
      },
      take: 10,
    });

    return {
      totalDentists,
      verifiedDentists,
      activeDentists,
      unverifiedDentists,
      popularCities: popularCities.map((city) => ({
        city: city.city,
        count: city._count.city,
      })),
    };
  }
}
