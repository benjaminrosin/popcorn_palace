import { PartialType } from "@nestjs/mapped-types";

export class CreateMovieDTO {
  title: string;
  genre: string;
  duration: number;
  rating: number;
  releaseYear: 2025;
}

export class UpdateMovieDTO extends PartialType (CreateMovieDTO) {}