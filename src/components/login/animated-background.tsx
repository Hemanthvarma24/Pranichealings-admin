"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    particlesJS: any
    pJSDom: any
  }
}

export default function AnimatedBackground() {
  const particlesRef = useRef<HTMLDivElement>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  useEffect(() => {
    // Check if particles.js is already loaded
    if (window.particlesJS) {
      initializeParticles()
      return
    }

    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
    script.onload = () => {
      initializeParticles()
    }
    script.onerror = () => {
      console.warn("Failed to load particles.js")
    }

    document.head.appendChild(script)
    scriptRef.current = script

    return () => {
      // Cleanup particles
      if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS()
        window.pJSDom = []
      }

      // Remove script if it exists
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current)
      }
    }
  }, [])

  const initializeParticles = () => {
    if (window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: 80,
            density: { enable: true, value_area: 800 },
          },
          color: { value: "#ffffff" },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
          },
          opacity: {
            value: 0.4,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.1 },
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: true, speed: 2, size_min: 0.5 },
          },
          line_linked: {
            enable: true,
            distance: 120,
            color: "#ffffff",
            opacity: 0.15,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: { opacity: 0.3 },
            },
            push: { particles_nb: 4 },
          },
        },
        retina_detect: true,
      })
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div id="particles-js" ref={particlesRef} className="absolute inset-0" />

      {/* Additional floating elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-white/10 animate-float-${i + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
