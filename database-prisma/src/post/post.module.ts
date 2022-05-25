import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
