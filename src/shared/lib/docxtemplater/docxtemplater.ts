import { saveAs } from 'file-saver'
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import get from 'lodash.get'

export const generateFileFromTemplate = <T extends object>(data: T, templatePath: string, fileName?: string) => {
  fetch(templatePath)
    .then(response => response.arrayBuffer())
    .then(content => {
      const zip = new PizZip(content)
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        parser: tag => ({
          get(scope, context) {
            const arrayLikeIndex = context.scopePathItem
            if (tag === '.') {
              if (context.scopePathLength[1] - 1 === context.scopePathItem[1]) {
                return scope
              }
              return scope + ', '
            }
            if (tag === '$index') {
              return arrayLikeIndex.at(0)
            }
            if (tag === '$ordinalNumber') {
              return (arrayLikeIndex.at(0) || 0) + 1
            }
            if (/\./.test(tag)) {
              return get(scope, tag, scope[tag])
            }
            return scope[tag]
          },
        }),
      })
      doc.render(data)
      saveAs(
        doc.getZip().generate({
          type: 'blob',
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        }),
        fileName || templatePath
      )
    })
}
