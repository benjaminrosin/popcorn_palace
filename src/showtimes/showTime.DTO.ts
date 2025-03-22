import { PartialType } from "@nestjs/mapped-types";
import { IsDate, IsDateString, IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateShowtimeDTO {
  @IsInt()
  movieId: number;

  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty()
  theater: string;

  //@IsDate({message: "startTime must be valid date"})
  @IsDateString({}, {message: "startTime must be valid date"})
  startTime: Date;

  //@IsDate({message: "endTime must be valid date"})
  @IsDateString({}, {message: "endTime must be valid date"})
  endTime: Date;
}

export class UpdateShowtimeDTO extends PartialType (CreateShowtimeDTO) {}