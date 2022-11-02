export default () => {
  return Object.keys(process.env).reduce(
    (acc, el) => {
      acc[el.startsWith('NEXT_PUBLIC_') ? 'publicRuntimeConfig' : 'serverRuntimeConfig'][el] = process.env[el]
      return acc
    },
    { serverRuntimeConfig: {}, publicRuntimeConfig: {} } as {
      serverRuntimeConfig: Record<string, unknown>
      publicRuntimeConfig: Record<string, unknown>
    }
  )
}
