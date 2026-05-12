import NodeCache from 'node-cache'
import { config } from '../config/index.js'

const cache = new NodeCache({ stdTTL: config.cacheTtl, checkperiod: 60 })

export function get(key) {
  return cache.get(key)
}

export function set(key, value) {
  return cache.set(key, value)
}

export function del(key) {
  return cache.del(key)
}

export function flush() {
  return cache.flushAll()
}
