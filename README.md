Run `node test.mjs` to run the benchmark against two cases:

1. A `createCachedImport()` function that caches the result of dynamic imports manually.
2. Simply call `await import()` directly and rely on the runtime cache.

The result locally (MacOS M1 Pro, Node.js v20.12.2):

```
┌─────────┬─────────────────┬─────────────┬────────────────────┬──────────┬─────────┐
│ (index) │ Task Name       │ ops/sec     │ Average Time (ns)  │ Margin   │ Samples │
├─────────┼─────────────────┼─────────────┼────────────────────┼──────────┼─────────┤
│ 0       │ 'manual cached' │ '5,116,888' │ 195.43127172950625 │ '±0.74%' │ 2558445 │
│ 1       │ 'nodejs'        │ '863,698'   │ 1157.81171239986   │ '±0.48%' │ 431850  │
└─────────┴─────────────────┴─────────────┴────────────────────┴──────────┴─────────┘
```

<details>
<summary>Result with Node.js v18.18.2 (node20 had significant improvements)</summary>

```
┌─────────┬─────────────────┬─────────────┬───────────────────┬──────────┬─────────┐
│ (index) │    Task Name    │   ops/sec   │ Average Time (ns) │  Margin  │ Samples │
├─────────┼─────────────────┼─────────────┼───────────────────┼──────────┼─────────┤
│    0    │ 'manual cached' │ '5,153,790' │  194.03193033114  │ '±0.94%' │ 2576896 │
│    1    │    'nodejs'     │  '85,838'   │ 11649.79618615562 │ '±0.51%' │  42920  │
└─────────┴─────────────────┴─────────────┴───────────────────┴──────────┴─────────┘
```
</details>