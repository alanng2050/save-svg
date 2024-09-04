import { saveBlob } from '@tinychange/save-blob'

export const saveSvg = async ({
  node,
  format,
  name,
  size,
  onFinish,
}: {
  node: Element | null
  format: 'png' | 'jpeg' | 'svg'
  name: string
  size: number
  onFinish?: () => void
}) => {
  if (node?.nodeName !== 'svg') throw Error('"node" must be SVG item')

  const stringhtml = node.outerHTML
  const blob = new Blob([stringhtml], { type: 'image/svg+xml' })
  if (format === 'svg') {
    saveBlob({ filename: name, blob })
    onFinish?.()
    return
  }

  const reader = new FileReader()
  reader.onload = (readerEvt) => {
    const data = readerEvt.target?.result as string
    const imgNode = document.createElement('img')
    imgNode.src = data
    const canvas = document.createElement('canvas')
    canvas.height = size
    canvas.width = size
    imgNode.onload = () => {
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(imgNode, 0, 0)
      canvas.toBlob(
        (blob) => {
          if (blob) saveBlob({ blob, filename: name })
          imgNode.remove()
          canvas.remove()
          onFinish?.()
        },
        `image/${format}`,
        1
      )
    }
  }
  reader.readAsDataURL(blob)
}
