import { PartialType } from "@nestjs/mapped-types";
import { IsInt, IsPositive, IsString, Max, Min } from "class-validator";

export class CreateMovieDTO {
  @IsString()
  title: string;

  @IsString()
  genre: string;

  @IsInt()
  @IsPositive()
  duration: number;

  @Min(0)
  @Max(10)
  rating: number;

  @IsInt()
  @Min(1000, { message: "releaseYear must be valid date"})
  @Max(2025, { message: "releaseYear must be valid year"})
  releaseYear: number;
}

export class UpdateMovieDTO extends PartialType (CreateMovieDTO) {}