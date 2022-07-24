export const FILE_ENTITY_MOCK = {
  'id|+1': 1,
  name: '@name(true)',
  originalName: /test-file\.(png|jpg|jpeg|pdf|doc|docx)/,
  // Изменить в зависимости от бэка
  path: /https:\/\/dummyimage\.com\/200x100\.(png|jpg|jpeg|pdf|doc|docx)/,
  url: /https:\/\/dummyimage\.com\/200x100\.(png|jpg|jpeg|pdf|doc|docx)/,
  dateCreate: '@date',
  dateUpdate: '@date',
} as { [key: string]: unknown }
