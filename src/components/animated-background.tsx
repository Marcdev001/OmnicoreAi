"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<any[]>([])
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class SmokeParticle {
      x: number
      y: number
      radius: number
      color: string
      velocity: { x: number; y: number }
      life: number
      opacity: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.radius = Math.random() * 20 + 10
        this.color = "#30D5C8"
        this.velocity = {
          x: Math.random() * 0.5 - 0.25,
          y: Math.random() * -1 - 0.5,
        }
        this.life = Math.random() * 100 + 100
        this.opacity = Math.random() * 0.5 + 0.2
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()
      }

      update() {
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.radius += 0.1
        this.life--
        this.opacity -= 0.003
      }
    }

    // Animation logic
    function animate() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      if (Math.random() < 0.1) {
        const x = Math.random() * canvas.width
        const y = canvas.height + 10
        particlesRef.current.push(new SmokeParticle(x, y))
      }

      particlesRef.current.forEach((particle, index) => {
        particle.update()
        particle.draw(ctx)
        
        if (particle.life <= 0 || particle.opacity <= 0) {
          particlesRef.current.splice(index, 1)
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full bg-black -z-10"
    />
  )
}
