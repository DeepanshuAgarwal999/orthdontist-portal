import {
  Injectable,
  ExecutionContext,
  CanActivate,
  UnauthorizedException,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from './auth.guard';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);

export const DentistAdminRoles = () =>
  SetMetadata('roles', [UserRole.ADMIN, UserRole.DENTIST]);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(
      'roles',
      context.getHandler(),
    );

    // If no roles are required, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Ensure user exists and has a role
    if (!user || !user.role) {
      throw new UnauthorizedException(
        'User not authenticated or role not defined',
      );
    }

    // Check if the user's role is in the required roles
    const hasRequiredRole = requiredRoles.some((role) => user.role === role);

    if (!hasRequiredRole) {
      throw new UnauthorizedException(
        `Access denied. Required role: ${requiredRoles.join(' or ')}`,
      );
    }

    return true;
  }
}

/**
 * Guard specifically for dentist or admin access
 * Usage: @UseGuards(AuthGuard, DentistAdminGuard)
 */
@Injectable()
export class DentistAdminGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Ensure user exists and has a role
    if (!user || !user.role) {
      throw new UnauthorizedException(
        'User not authenticated or role not defined',
      );
    }

    // Check if the user's role is either ADMIN or DENTIST
    const hasRequiredRole =
      user.role === UserRole.ADMIN || user.role === UserRole.DENTIST;

    if (!hasRequiredRole) {
      throw new UnauthorizedException(
        `Access denied. Required role: ${UserRole.ADMIN} or ${UserRole.DENTIST}`,
      );
    }

    return true;
  }
}
