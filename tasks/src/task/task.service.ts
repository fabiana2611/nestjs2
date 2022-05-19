import { Injectable, Logger } from '@nestjs/common';
import {
  Cron,
  CronExpression,
  Interval,
  SchedulerRegistry,
  Timeout,
} from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  private static time = 2;
  private static quantity = 3;
  private static limit = TaskService.time * TaskService.quantity;
  private nameTask = '### TESTE  3 Times ###';

  constructor(private schedulerRegistry: SchedulerRegistry) {
    setTimeout(() => {
      this.stopJob();
      this.addCronJon('newJob', '4');
      this.threeTimes();
    }, 1000);
  }

  // (second | minutes | hours | day of month | months | day of week)
  @Cron('3 * * * * *')
  onSecond3() {
    this.logger.log('each second 3..');
  }

  @Cron('*/3 * * * * *')
  every3Seconds() {
    this.logger.log('every 3 Seconds..');
  }

  @Cron('* * * * * *')
  everySecondCron() {
    this.logger.log('every Second Cron..');
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  every10SecondCron() {
    this.logger.log('every 10 SecondCron..');
  }

  @Cron('*/5 * * * * *', {
    name: 'myCronJob',
    timeZone: 'Europe/Paris',
  })
  jobWithname() {
    this.logger.log('jobWithname ...');
  }

  @Interval(10000)
  intervalJob() {
    this.logger.log('intervalJob ...');
  }

  @Interval('myCronJob2', 2500)
  intervalJob2() {
    this.logger.log('intervalJob2 ...');
  }

  @Timeout(5000)
  jobTimeout() {
    this.logger.log('jobTimeout after 5 seconds...');
  }

  stopJob() {
    const job = this.schedulerRegistry.getCronJob('myCronJob');

    job.stop();
    this.logger.log(job.lastDate());
  }

  addCronJon(name: string, seconds: string, limit?: number) {
    const job = new CronJob(`*/${seconds} * * * * *`, () => {
      this.logger.warn(`time (${seconds} for job ${name} to run!`);
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.warn(
      `job ${name} added for each minute at ${seconds} seconds!`,
    );
  }

  threeTimes() {
    this.addCronJon(
      this.nameTask,
      TaskService.time.toString(),
      TaskService.quantity,
    );
  }

  @Timeout(TaskService.limit * 1000)
  threeTimesTimeout() {
    this.schedulerRegistry.deleteCronJob(this.nameTask);
    this.logger.warn(`job ${this.nameTask} deleted!`);
  }
}
