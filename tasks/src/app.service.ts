import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  /**
   * Answer the stackoverflow question:
   * https://stackoverflow.com/questions/71262106/cron-is-not-running-in-nestjs/72321946#72321946
   */
  async testCron() {
    const job = new CronJob('2 * * * * *', () => {
      this.logger.log('My cron running...');
    });

    this.schedulerRegistry.addCronJob('sec', job);
    job.start();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
