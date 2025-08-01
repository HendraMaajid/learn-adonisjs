import redis from '@adonisjs/redis/services/main'

class CacheService {
  async has(...keys: string[]) {
    return redis.exists(keys)
  }
  async get(key: string) {
    const value = await redis.get(key)
    return value && JSON.parse(value)
  }
  async set(key: string, value: any) {
    return redis.set(key, JSON.stringify(value))
  }
  async delete(...keys: string[]) {
    return redis.del(keys)
  }

  async flushdb() {
    return redis.flushdb()
  }
}

const cacheService = new CacheService()
export default cacheService
