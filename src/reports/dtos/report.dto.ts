import { Expose, Transform } from 'class-transformer';
export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  mileage: number;

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: number;
}
