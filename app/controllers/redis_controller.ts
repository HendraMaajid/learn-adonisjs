import cacheService from '#services/cache_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class RedisController {
  async destroy({ response, params }: HttpContext) {
    await cacheService.delete(params.slug)
    return response.redirect().back()
  }
  async flush({ response }: HttpContext) {
    console.log('Flushing Redis DB')
    await cacheService.flushdb()
    return response.redirect().back()
  }
}
