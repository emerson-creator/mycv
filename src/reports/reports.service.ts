import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportsRepository: Repository<Report>,
  ) {}
  create(reportDto: CreateReportDto, user: User) {
    const report = this.reportsRepository.create({ ...reportDto, user });
    return this.reportsRepository.save(report);
  }
}
