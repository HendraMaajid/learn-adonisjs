import { movies } from '#database/data/movies'
import { CineastFactory } from '#database/factories/cineast_factory'
import { MovieFactory } from '#database/factories/movie_factory'
import { UserFactory } from '#database/factories/user_factory'
import MovieStatuses from '#enums/movie_statuses'
import Cineast from '#models/cineast'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  static environment: ['development', 'testing']
  async run() {
    // Write your database queries inside the run method
    const cineast = await CineastFactory.createMany(10)
    await UserFactory.with('profile').createMany(5)
    await this.#createMovies(cineast)
  }
  async #createMovies(cineast: Cineast[]) {
    let index = 0
    await MovieFactory.tap((row, { faker }) => {
      const movie = movies[index]
      const released = DateTime.now().set({ year: movie.releaseYear })
      row.statusId = MovieStatuses.RELEASED
      row.directorId = cineast.at(Math.floor(Math.random() * cineast.length))!.id
      row.writerId = cineast.at(Math.floor(Math.random() * cineast.length))!.id
      row.title = movie.title
      row.releaseAt = DateTime.fromJSDate(
        faker.date.between({
          from: released.startOf('year').toJSDate(),
          to: released.endOf('year').toJSDate(),
        })
      )

      index++
    }).createMany(movies.length)

    await MovieFactory.with('director').with('writer').createMany(3)
    await MovieFactory.apply('released').with('director').with('writer').createMany(2)
    await MovieFactory.apply('releasingSoon').with('director').with('writer').createMany(2)
    await MovieFactory.apply('postProduction').with('director').with('writer').createMany(2)
  }
}
