import { createEventSignal, createSignal } from 'sane-signal'

import * as common from '../../common'

const receivedPing = createSignal<common.Ping>({
  ip: '0',
})

const gunInstances = createSignal<Record<string, common.GunInstance>>(
  {
    someip: {
      ip: 'someip',
      lastPing: 18490123980,
      spawnTimestamp: 12378940,
    },
  },
  [receivedPing],
  (curr, [pingReceived]) => {},
)

const sockets: Record<string, WebSocket> = {}

export const receivedGunInstanceConnectionRequest = createSignal({
  ip: '$$__INIT__',
})

receivedGunInstanceConnectionRequest.sub(({ ip }) => {
  const theSocket = new WebSocket(ip)
  sockets[ip] = theSocket
  theSocket.onmessage &&
    theSocket.onmessage(() => {
      receivedPing.emit({
        ip,
      })
    })
  gunInstances.emit({
    ...gunInstances.current,
    [ip]: {
      ip,
      lastPing: 0,
      spawnTimestamp: 0,
    },
  })
})

export const receivedGunInstanceDisconnectionRequest = createSignal({
  ip: '$$__INIT__',
})

receivedGunInstanceDisconnectionRequest.sub(({ ip }) => {
  sockets[ip].close()
  delete sockets[ip]
  // blah blah
  const cpy = {
    ...gunInstances.current,
  }
  delete cpy[ip]
  gunInstances.emit(cpy)
})
