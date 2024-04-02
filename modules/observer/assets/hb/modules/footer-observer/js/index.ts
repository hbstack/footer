import { default as handler, reset } from './handler';

(() => {
    const footer = document.querySelector('.hb-footer')
    if (footer === null) {
        return
    }

    const threshold: Array<number> = [0]
    for (let i = 1; i <= 100; i += 1) {
        threshold.push(i / 100)
    }
    const observer = new IntersectionObserver(handler, {
        threshold: threshold,
    })
    observer.observe(footer)

    window.addEventListener('resize', () => {
        reset()
    })
})()
