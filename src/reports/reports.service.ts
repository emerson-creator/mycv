import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportsRepository: Repository<Report>,
  ) {}
  create(reportDto: CreateReportDto, user: User) {
    const report = this.reportsRepository.create({ ...reportDto, user });
    return this.reportsRepository.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.reportsRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!report) {
      return null;
    }
    report.approved = approved;
    return this.reportsRepository.save(report);
  }

  createEstimate({ make, model, year, lng, lat, mileage }: GetEstimateDto) {
    return this.reportsRepository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }
}
