import factory from '@adonisjs/lucid/factories'
import Movie from '#models/movie'
import MovieStatuses from '#enums/movie_statuses'
import { DateTime } from 'luxon'
import { CineastFactory } from './cineast_factory.js'

export const MovieFactory = factory
  .define(Movie, async ({ faker }) => {
    return {
      statusId: MovieStatuses.WRITING,
      title: faker.music.songName(),
      summary: faker.lorem.sentence(),
      synopsis: faker.lorem.paragraphs(),
      posterUrl: faker.image.urlPicsumPhotos(),
    }
  })
  .state('released', (row, { faker }) => {
    row.statusId = MovieStatuses.RELEASED
    row.releaseAt = DateTime.fromJSDate(faker.date.past())
  })
  .state('releasingSoon', (row, { faker }) => {
    row.statusId = MovieStatuses.RELEASED
    row.releaseAt = DateTime.fromJSDate(faker.date.soon())
  })
  .state('postProduction', (row, { faker }) => {
    row.statusId = MovieStatuses.POST_PRODUCTION
    row.releaseAt = DateTime.fromJSDate(faker.date.soon())
  })
  .relation('director', () => CineastFactory)
  .relation('writer', () => CineastFactory)
  .build()
