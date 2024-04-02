const elements: Record<string, null | HTMLElement> = {}

export function attachOn(...selecotrs: string[]) {
  for (const i of selecotrs) {
    elements[i] = null
  }
}

const handler = (entries): void => {
  entries.forEach((entry) => {
    const height = entry.intersectionRect.height
    for (const i in elements) {
      let ele = elements[i]
      if (ele === null) {
        ele = document.querySelector(i)
        if (ele === null) {
          delete elements[i]
          continue
        }
      }
      if (entry.isIntersecting && entry.intersectionRect.height > 0) {
        ele.style.height = `calc(100vh - var(--hb-top-offset) - ${height}px - 2rem)`
      } else {
        ele.style.removeProperty('height')
      }
    }
  })
}

export default handler
