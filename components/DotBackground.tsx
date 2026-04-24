'use client'
import { useEffect, useRef } from 'react'

export default function DotBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    let t = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.008
      const cols = Math.ceil(canvas.width / 60)
      const rows = Math.ceil(canvas.height / 60)

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const x = c * 60
          const y = r * 60
          const wave = Math.sin(c * 0.2 + t) * Math.cos(r * 0.2 + t * 0.5)
          const alpha = (wave + 1) * 0.15 + 0.05
          const hue = 225 + wave * 45
          ctx.beginPath()
          ctx.arc(x, y, 1.4, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${hue}, 85%, 68%, ${alpha})`
          ctx.fill()
        }
      }
      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.9,
      }}
    />
  )
}
