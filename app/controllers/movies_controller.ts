import type { HttpContext } from '@adonisjs/core/http'

import Movie from '#models/movie'

export default class MoviesController {
  async index({ view }: HttpContext) {
    const movies = await Movie.all()
    const recentlyReleased = await Movie.query()
      .apply((scope) => scope.released())
      .orderBy('release_at', 'desc')
      .limit(9)
    const comingSoon = await Movie.query()
      .apply((scope) => scope.notReleased())
      .whereNotNull('releaseAt')
      .orderBy('release_at', 'asc')
      .limit(3)
    return view.render('pages/home', { recentlyReleased, comingSoon })
  }

  async show({ view, params }: HttpContext) {
    const movie = await Movie.findByOrFail('slug', params.slug)
    return view.render('pages/movies/show', { movie })
  }
}
