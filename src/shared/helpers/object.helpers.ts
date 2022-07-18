export const getDeepClone = <T>(data: T): T => JSON.parse(JSON.stringify(data))
