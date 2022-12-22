export const getNumberFromString = (str: string) => +str.replace(/\D+/g, '')

export const getOnlyDigitsString = (str = '') => str.replace(/\D+/g, '')
