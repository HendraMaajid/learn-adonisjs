import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import MovieService from '#services/movie_service'
import { toHtml } from '@dimerapp/markdown/utils'
import cacheService from '#services/cache_service'

export default class Movie {
  declare title: string

  declare summary: string

  declare abstract?: string

  declare slug: string

  static async find(slug: string) {
    if (await cacheService.has(slug)) {
      console.log(`Cache hit for movie: ${slug}`)
      return cacheService.get(slug)
    }
    const md = await MovieService.read(slug)
    const movie = new Movie()
    movie.title = md.frontmatter.title
    movie.summary = md.frontmatter.summary
    movie.slug = slug
    movie.abstract = toHtml(md).contents
    await cacheService.set(slug, movie)
    return movie
  }
  static async all() {
    const slugs = await MovieService.getSlugs()
    const movies: Movie[] = []
    for (const slug of slugs) {
      const movie = await Movie.find(slug)
      movies.push(movie)
    }
    return movies
  }
}
