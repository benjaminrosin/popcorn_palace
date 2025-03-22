import { PartialType } from "@nestjs/mapped-types";

export class CreateShowtimeDTO {
  movieId: number;
  price: number;
  theater: string;
  startTime: Date;
  endTime: Date;
}

export class UpdateShowtimeDTO extends PartialType (CreateShowtimeDTO) {}