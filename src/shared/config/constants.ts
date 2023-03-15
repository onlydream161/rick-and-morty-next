/**
 * Только константы не относящиеся к бизнес сущностям напрямую
 */

export const THEME_LIGHT = 'light'
export const THEME_DARK = 'dark'

export const LANG_RU = 'ru'
export const LANG_EN = 'en'

export const SORT_ASC = 'asc'
export const SORT_DESC = 'desc'

export const DEFAULT_DATE_FORMAT = 'DD-MM-YYYY'

export const SHORT_WEEK_DAYS_NAME = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

export const SHORT_MONTHS_NAME = ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']

export const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 15, 20, 30, 40, 50]

export const ACCESS_TOKEN_COOKIES_NAME = 'access_token'
export const REFRESH_TOKEN_COOKIES_NAME = 'refresh_token'
export const REFRESH_TOKEN_MAX_AGE = 360000

export const EMAIL_REG_EXP =
  // eslint-disable-next-line
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

export const EMOJI_REG_EXP = /[^\p{L}\p{N}\p{P}\p{Z}^$\n]/g

export const SELECT_INITIAL_FILTERS = {
  page: 1,
  itemsPerPage: 100,
  name: '',
}

export const ALLOWED_IMAGES_EXT = ['JPG', 'JPEG', 'PNG', 'GIF', 'SVG', 'TIFF', 'ICO']
export const ALLOWED_VIDEOS_EXT = ['MPEG', 'MP4', 'Quicktime', 'WMV', 'AVI', 'FLV', 'OGG']
export const ALLOWED_AUDIOS_EXT = ['MP3', 'WAV', 'OGG']
export const ALLOWED_FILES_EXT = [...ALLOWED_IMAGES_EXT, ...ALLOWED_VIDEOS_EXT, ...ALLOWED_AUDIOS_EXT]

export const ALLOWED_IMAGES_MIMETYPE = [
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/gif',
  'image/svg+xml',
  'image/tiff',
  'image/x-tiff',
  'image/x-icon',
]
export const ALLOWED_VIDEOS_MIMETYPE = [
  'video/mpeg',
  'video/x-mpeg',
  'video/mp4',
  'application/mp4',
  'video/quicktime',
  'video/x-ms-wmv',
  'video/avi',
  'video/msvideo',
  'application/x-troff-msvideo',
  'video/x-msvideo',
  'video/x-flv',
  'video/ogg',
  'application/ogg',
]
export const ALLOWED_AUDIOS_MIMETYPE = [
  'audio/mpeg',
  'audio/mpeg3',
  'audio/x-mpeg-3',
  'audio/wav',
  'audio/x-wav',
  'audio/ogg',
]

export const ALLOWED_FILES_MIMETYPE = [
  ...ALLOWED_IMAGES_MIMETYPE,
  ...ALLOWED_VIDEOS_MIMETYPE,
  ...ALLOWED_AUDIOS_MIMETYPE,
]

export const ALLOWED_IMAGES_MIMETYPE_STRING = ALLOWED_IMAGES_MIMETYPE.join(',')
export const ALLOWED_VIDEOS_MIMETYPE_STRING = ALLOWED_VIDEOS_MIMETYPE.join(',')
export const ALLOWED_AUDIOS_MIMETYPE_STRING = ALLOWED_AUDIOS_MIMETYPE.join(',')
export const ALLOWED_FILES_MIMETYPE_STRING = ALLOWED_FILES_MIMETYPE.join(',')

export const IMAGES_EXT_TO_MIMETYPE_RELATION = {
  JPEG: ['image/jpeg', 'image/pjpeg'],
  PNG: 'image/png',
  GIF: 'image/gif',
  SVG: 'image/svg+xml',
  TIFF: ['image/tiff', 'image/x-tiff'],
  ICO: 'image/x-icon',
}

export const VIDEOS_EXT_TO_MIMETYPE_RELATION = {
  MPEG: ['video/mpeg', 'video/x-mpeg'],
  MP4: ['video/mp4', 'application/mp4'],
  Quicktime: 'video/quicktime',
  WMV: 'video/x-ms-wmv',
  AVI: ['video/avi', 'video/msvideo', 'application/x-troff-msvideo', 'video/x-msvideo'],
  FLV: 'video/x-flv',
  OGG: ['video/ogg', 'application/ogg'],
}

export const AUDIOS_EXT_TO_MIMETYPE_RELATION = {
  MP3: ['audio/mpeg', 'audio/mpeg3', 'audio/x-mpeg-3'],
  WAV: ['audio/wav', 'audio/x-wav'],
  OGG: 'audio/ogg',
}

export const FILES_EXT_TO_MIMETYPE_RELATION = {
  ...IMAGES_EXT_TO_MIMETYPE_RELATION,
  ...VIDEOS_EXT_TO_MIMETYPE_RELATION,
  ...AUDIOS_EXT_TO_MIMETYPE_RELATION,
  ...{ OGG: ['video/ogg', 'application/ogg', 'audio/ogg'] },
}
