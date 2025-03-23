import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from "../src/app.module";
import { UUID } from "sequelize";
import { isUUID } from "class-validator";

// object with 3 arrays, each array is in a request body format
const newObjects = {
  movies: [
    { title: "one",
      genre: "Action",
      duration: 120,
      rating: 8.7,
      releaseYear: 2025
    },{
      title: "two",
      genre: "Action",
      duration: 120,
      rating: 8.7,
      releaseYear: 2025
    },{
      title: "three",
      genre: "Action",
      duration: 120,
      rating: 8.7,
      releaseYear: 2025
    }
  ],
  showtimes: [{
    movieId: 1,
    price:20.2,
    theater: "icc",
    startTime: "2025-02-16T11:46:46.125405Z",
    endTime: "2025-02-16T14:48:46.125405Z"
  },{
    movieId: 1,
    price:20.2,
    theater: "icc",
    startTime: "2025-02-16T11:46:46.125405Z",
    endTime: "2025-02-16T14:48:46.125405Z"
  },{
    movieId: 1,
    price:20.2,
    theater: "icc",
    startTime: "2025-02-15T11:46:46.125405Z",
    endTime: "2025-02-15T14:48:46.125405Z"
  }],
  bookings: [{
    showtimeId: 1,
    seatNumber: 14,
    userId: "84438967-f68f-4fa0-b620-0f08217e76af"
  },{
    showtimeId: 1,
    seatNumber: 15,
    userId: "84438967-f68f-4fa0-b620-0f08217e76af"
  },{
    showtimeId: 2,
    seatNumber: 14,
    userId: "84438967-f68f-4fa0-b620-0f08217e76af"
  }],
}


describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  })

  //general api req
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  //---------------------------------------------
  it('movies adding updating and deleting', async() =>{
    //get all, length should be 0
    let res = await request(app.getHttpServer())
      .get('/movies/all');
    expect(res.status).toBe(200);

    expect(res.body).toHaveLength(0);

    // adding a movie
    res = await request(app.getHttpServer())
      .post('/movies')
      .send(newObjects.movies[0]);
    expect(res.status).toBe(200);

    expect(res.body).toMatchObject({
      id: 1,
      ...newObjects.movies[0],
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    })

    // get all, length should be 1
    res = await request(app.getHttpServer())
      .get('/movies/all');
    expect(res.status).toBe(200);

    expect(res.body).toHaveLength(1);

    // failed to add the same movie
    res = await request(app.getHttpServer())
      .post('/movies')
      .send(newObjects.movies[0]);
    expect(res.status).toBe(400);

    // get all, length should be 1
    res = await request(app.getHttpServer())
      .get('/movies/all');
    expect(res.status).toBe(200);

    expect(res.body).toHaveLength(1);

    // update movie
    res = await request(app.getHttpServer())
      .post('/movies/update/' + newObjects.movies[0].title)
      .send({ genre: "updated" });
    expect(res.status).toBe(200);

    // check if update succeeded
    res = await request(app.getHttpServer())
      .get('/movies/all');
    expect(res.status).toBe(200);

    expect(res.body[0].genre).toBe("updated");

    // deleting the movie
    res = await request(app.getHttpServer())
      .delete('/movies/' + newObjects.movies[0].title);
    expect(res.status).toBe(200);

    // get all, length should be 0
    res = await request(app.getHttpServer())
      .get('/movies/all');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);

  })

  it("trying to add showtime and booking without a movie", async() =>{
    // making sure all tables are empty
    let res = await request(app.getHttpServer())
      .get('/movies/all');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);

    res = await request(app.getHttpServer())
      .get('/showtimes/all');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);

    res = await request(app.getHttpServer())
      .get('/bookings/all');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);

    // trying to add show and booking with no foreign key
    res = await request(app.getHttpServer())
      .post('/showtimes')
      .send(newObjects.bookings[0]);
    expect(res.status).toBe(400);

    res = await request(app.getHttpServer())
      .post('/bookings')
      .send(newObjects.bookings[0]);
    expect(res.status).toBe(404);

    // adding a movie
    res = await request(app.getHttpServer())
      .post('/movies')
      .send(newObjects.movies[0]);
    expect(res.status).toBe(200);

    expect(res.body).toMatchObject({
      id: 1,
      ...newObjects.movies[0],
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    })

    // adding show
    res = await request(app.getHttpServer())
      .post('/showtimes')
      .send(newObjects.showtimes[0]);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: 1,
      ...newObjects.showtimes[0],
      startTime: expect.any(String),
      endTime: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    })

    // cannot add the show due to time overlap
    res = await request(app.getHttpServer())
      .post('/showtimes')
      .send(newObjects.showtimes[1]);
    expect(res.status).toBe(400);

    // adding a booking
    res = await request(app.getHttpServer())
      .post('/bookings')
      .send(newObjects.bookings[0]);
    expect(res.status).toBe(200);
    expect(isUUID(res.body.bookingId)).toBe(true)

    // fail to add a booking seat taken
    res = await request(app.getHttpServer())
      .post('/bookings')
      .send(newObjects.bookings[0]);
    expect(res.status).toBe(400);

    // making sure
    res = await request(app.getHttpServer())
      .get('/movies/all');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);

    res = await request(app.getHttpServer())
      .get('/showtimes/all');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);

    res = await request(app.getHttpServer())
      .get('/bookings/all');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);

    // deleting the movie
    res = await request(app.getHttpServer())
      .delete('/movies/' + newObjects.movies[0].title);
    expect(res.status).toBe(200);

    // checks the CASCADE
    res = await request(app.getHttpServer())
      .get('/movies/all');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);

    res = await request(app.getHttpServer())
      .get('/showtimes/all');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);

    res = await request(app.getHttpServer())
      .get('/bookings/all');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);

  })



});
