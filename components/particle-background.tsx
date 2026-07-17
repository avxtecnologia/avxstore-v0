"use client"

import { useEffect, useRef } from "react"

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let W = 0
    let H = 0
    let particles: { x: number; y: number; vx: number; vy: number; r: number }[] = []

    function handleResize() {
      W = window.innerWidth
      H = window.innerHeight
      canvas!.width = W * dpr
      canvas!.height = H * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.round((W * H) / 16000)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 1 + Math.random() * 1.6,
      }))
    }
    handleResize()
    window.addEventListener("resize", handleResize)

    const mouse = { x: -9999, y: -9999, active: false }
    function onMove(e: MouseEvent) {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }
    function onLeave() {
      mouse.active = false
    }
    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)

    const RADIUS = 140
    const ATTRACT = 0.55
    let raf = 0

    function draw() {
      ctx!.clearRect(0, 0, W, H)

      for (const p of particles) {
        if (mouse.active) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < RADIUS && dist > 0.01) {
            const force = (1 - dist / RADIUS) * ATTRACT
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
        }
        p.vx += (Math.random() - 0.5) * 0.02
        p.vy += (Math.random() - 0.5) * 0.02
        p.vx *= 0.93
        p.vy *= 0.93
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) { p.x = 0; p.vx *= -0.6 }
        if (p.x > W) { p.x = W; p.vx *= -0.6 }
        if (p.y < 0) { p.y = 0; p.vy *= -0.6 }
        if (p.y > H) { p.y = H; p.vy *= -0.6 }
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            const op = (1 - dist / 110) * 0.35
            ctx!.strokeStyle = `rgba(255,151,82,${op})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.stroke()
          }
        }
      }

      if (mouse.active) {
        for (const p of particles) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < RADIUS) {
            const op = (1 - dist / RADIUS) * 0.5
            ctx!.strokeStyle = `rgba(255,214,180,${op})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(mouse.x, mouse.y)
            ctx!.lineTo(p.x, p.y)
            ctx!.stroke()
          }
        }
        const g = ctx!.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 16)
        g.addColorStop(0, "rgba(255,214,180,0.9)")
        g.addColorStop(1, "rgba(242,84,11,0)")
        ctx!.fillStyle = g
        ctx!.beginPath()
        ctx!.arc(mouse.x, mouse.y, 16, 0, Math.PI * 2)
        ctx!.fill()
      }

      for (const p of particles) {
        ctx!.beginPath()
        ctx!.fillStyle = "rgba(242,84,11,0.9)"
        ctx!.shadowColor = "rgba(255,151,82,0.8)"
        ctx!.shadowBlur = 6
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.shadowBlur = 0
      }

      if (!reduceMotion) raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
