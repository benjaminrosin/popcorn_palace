import { IsInt, IsUUID } from "class-validator";

export class CreateBooking{
  @IsInt()
  showtimeId: number;

  @IsInt()
  seatNumber: number;

  @IsUUID()
  userId: string;
}