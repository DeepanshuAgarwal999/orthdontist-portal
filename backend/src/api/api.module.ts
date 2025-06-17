import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { DentistController } from './controller/dentist.controller';
import { BlogController } from './controller/blog.controller';
import { AuthService } from './services/auth.service';
import { BlogService } from './services/blog.service';
import { DentistService } from './services/dentist.service';
import { EmailService } from './services/email.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController, DentistController, BlogController],
  providers: [AuthService, BlogService, DentistService, EmailService],
  exports: [AuthService, BlogService, DentistService, EmailService],
})
export class ApiModule {}
