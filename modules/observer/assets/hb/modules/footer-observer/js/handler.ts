let initialized = false
const elements: Array<string> = []
const initializedElements: Array<HTMLElement> = []

export function attachOn(...selecotrs: string[]) {
  elements.push(...selecotrs)
}

const isSticky = (ele: HTMLElement): boolean => {
  return window.getComputedStyle(ele).position === 'sticky'
}


const getElements = (): Array<HTMLElement> => {
  if (!initialized) {
    for (const i of elements) {
      const ele = document.querySelector<HTMLElement>(i)
      if (ele !== null) {
        initializedElements.push(ele)
      }
    }
  }

  initialized = true

  return initializedElements
}

const resetElement = (ele: HTMLElement): void => {
  ele.style.removeProperty('height')
}

export function reset() {
  for (const ele of getElements()) {
    if (!isSticky(ele)) {
      resetElement(ele)
    }
  }
}

const handler = (entries): void => {
  entries.forEach((entry) => {
    const height = entry.intersectionRect.height
    for (const ele of getElements()) {
      if (!isSticky(ele)) {
        return
      }
      if (entry.isIntersecting && entry.intersectionRect.height > 0) {
        ele.style.height = `calc(100vh - var(--hb-top-offset) - ${height}px - 2rem)`
      } else {
        resetElement(ele)
      }
    }
  })
}

export default handler
