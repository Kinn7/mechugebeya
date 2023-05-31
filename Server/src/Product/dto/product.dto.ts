import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsDate()
  expiry_date: Date;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  category: number;
}

export class AddCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
