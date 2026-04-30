import {
  IsNumber,
  IsString,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';
export class CreateReportDto {
  @IsString()
  title: string;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1886)
  @Max(new Date().getFullYear() + 4)
  year: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;
}
