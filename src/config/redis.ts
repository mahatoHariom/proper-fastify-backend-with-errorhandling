import * as redis from 'redis'

class Redis {
  private static redis: redis.RedisClientType

  public static async initialize() {
    this.redis = redis.createClient({
      url: 'redis://127.0.0.1/',
      // host: "127.0.0.1",
      password: ''
      // port: 6379,
      // enableAutoPipelining: true,
    })

    this.redis.on('error', (error) => {
      console.error('INIT', 'Failed to connect to redis ' + String(error))
      throw new Error('Failed to connect to redis')
    })

    this.redis.on('connect', () => {
      console.info('INIT', 'Connected to redis')
    })

    await this.redis.connect()
  }

  public static async set(key: string, value: string, options?: redis.SetOptions) {
    await this.redis.set(key, value, options)
  }

  public static async incr(key: string) {
    await this.redis.incr(key)
  }

  public static async decr(key: string) {
    await this.redis.decr(key)
  }

  public static async get<T = string>(key: string) {
    return this.redis.get(key) as T | undefined
  }

  public static async del(key: string) {
    await this.redis.del(key)
  }
}

export { Redis }
