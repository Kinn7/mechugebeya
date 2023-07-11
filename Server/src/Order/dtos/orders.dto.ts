import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  total_price: number;
}
