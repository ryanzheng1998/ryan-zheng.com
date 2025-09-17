import {
  Clipper2ZFactoryFunction,
  MainModule,
} from 'clipper2-wasm/dist/clipper2z'
import {
  Clipper2ZUtilsFactoryFunction,
  MainModule as UtilsMainModule,
} from 'clipper2-wasm/dist/clipper2z-utils'

// @ts-ignore
import * as _Clipper2ZFactory from 'clipper2-wasm/dist/umd/clipper2z'
const Clipper2ZFactory =
  _Clipper2ZFactory as unknown as Clipper2ZFactoryFunction

// @ts-ignore
import _Clipper2ZUtilsFactory from 'clipper2-wasm/dist/umd/clipper2z-utils'
const Clipper2ZUtilsFactory =
  _Clipper2ZUtilsFactory as unknown as Clipper2ZUtilsFactoryFunction

let cached: {
  main: MainModule & EmscriptenModule
  utils: UtilsMainModule & EmscriptenModule
} | null = null

export const getClipper = async () => {
  if (cached !== null) return cached

  const mainPromise = Clipper2ZFactory({
    locateFile: () => '/clipper2z.wasm',
  })
  const utilsPromise = Clipper2ZUtilsFactory({
    locateFile: () => '/clipper2z-utils.wasm',
  })

  const [main, utils] = await Promise.all([mainPromise, utilsPromise])

  cached = { main, utils }

  return { main, utils }
}
