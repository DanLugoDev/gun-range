import * as utils from './utils'

export type Ping = utils.RO<{
  ip: string
}>

export type GunInstance = utils.RO<{
  ip: string
  /**
   * Unix timestamp in milliseconds.
   */
  lastPing: number
  /**
   * Unix timestamp in milliseconds.
   */
  spawnTimestamp: number
}>
