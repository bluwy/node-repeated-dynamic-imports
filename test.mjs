import { Bench } from 'tinybench'

const bench = new Bench({
  iterations: 100
})

/**
 * @template {T}
 * @param {() => Promise<T>} imp
 * @returns {() => T | Promise<T>}
 */
function createCachedImport(imp) {
  let cached
  return () => {
    if (!cached) {
      cached = imp().then((module) => {
        cached = module
        return module
      })
    }
    return cached
  }
}

const importOtherMjs = createCachedImport(() => import('./other.mjs'))

// Warmup
await import('./other.mjs')
await import('./other.mjs')
await import('./other.mjs')
await import('./other.mjs')
await import('./other.mjs')

bench
  .add('manual cached', async () => {
    return await importOtherMjs()
  })
  .add('nodejs', async () => {
    return await import('./other.mjs')
  })

await bench.run()

console.table(bench.table())
