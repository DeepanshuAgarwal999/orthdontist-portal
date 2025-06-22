import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { BlogController } from './controller/blog.controller';
import { CourseController } from './controller/course.controller';
import { EbookController } from './controller/ebook.controller';
import { LiveSessionController } from './controller/livesession.controller';
import { ImageKitController } from './controller/imagekit.controller';
import { AuthService } from './services/auth.service';
import { BlogService } from './services/blog.service';
import { CourseService } from './services/course.service';
import { EbookService } from './services/ebook.service';
import { LiveSessionService } from './services/livesession.service';
import { EmailService } from './services/email.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ImageKitService } from './services/imagekit.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    AuthController,
    BlogController,
    CourseController,
    EbookController,
    LiveSessionController,
    ImageKitController,
  ],
  providers: [
    AuthService,
    BlogService,
    CourseService,
    EbookService,
    LiveSessionService,
    EmailService,
    ImageKitService,
  ],
  exports: [
    AuthService,
    BlogService,
    CourseService,
    EbookService,
    LiveSessionService,
    EmailService,
    ImageKitService,
  ],
})
export class ApiModule {}
