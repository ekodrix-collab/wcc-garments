'use client'

import { useState, useEffect } from 'react'

export function PreLoader() {
  const [mounted, setMounted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check session storage
    if (sessionStorage.getItem('wcc-has-seen-intro')) {
      setIsDone(true)
      document.body.classList.add('preloader-done')
      return
    }

    document.body.style.overflow = 'hidden'

    // Start progress counter
    const startTime = performance.now()
    const duration = 1800 // 1.8 seconds

    let rafId: number
    
    const updateProgress = (now: number) => {
      const elapsed = now - startTime
      const percent = Math.min(elapsed / duration, 1)
      
      // easeInOutCubic
      const ease = percent < 0.5 
        ? 4 * percent * percent * percent 
        : 1 - Math.pow(-2 * percent + 2, 3) / 2
        
      setProgress(Math.round(ease * 100))

      if (percent < 1) {
        rafId = requestAnimationFrame(updateProgress)
      } else {
        sessionStorage.setItem('wcc-has-seen-intro', 'true')
        setTimeout(() => {
          setIsFading(true)
          setTimeout(() => {
            setIsDone(true)
            document.body.classList.add('preloader-done')
            document.body.style.overflow = ''
          }, 800) // fade transition duration
        }, 300) // pause at 100%
      }
    }

    rafId = requestAnimationFrame(updateProgress)

    return () => {
      cancelAnimationFrame(rafId)
      document.body.style.overflow = ''
    }
  }, [])

  if (!mounted || isDone) return null

  return (
    <div
      id="global-preloader"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#050505',
        opacity: isFading ? 0 : 1,
        transform: isFading ? 'translateY(-100vh)' : 'translateY(0)',
        transition: 'opacity 0.8s cubic-bezier(0.76, 0, 0.24, 1), transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
      }}
    >
      {/* Pulse Logo */}
      <div
        style={{
          position: 'relative',
          marginBottom: '24px',
          width: '112px',
          height: '112px',
          animation: 'preloader-pulse 2s infinite ease-in-out',
        }}
      >
        <img src="/images/wcc-logo.png" alt="WCC Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>

      {/* Brand Text */}
      <div style={{ textAlign: 'center', color: 'white', fontFamily: 'sans-serif' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          WCC <span style={{ fontWeight: 300, color: '#3B82F6' }}>GARMENTS</span>
        </h1>
        <p style={{ margin: '6px 0 0 0', fontSize: '10px', fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
          Western Clothing Co. · Est. 2010
        </p>
      </div>

      {/* Progress Bar Container */}
      <div
        style={{
          marginTop: '48px',
          width: '240px',
          height: '2px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '999px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Progress Fill */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${progress}%`,
            background: '#3B82F6',
            transition: 'width 0.1s ease-out',
          }}
        />
      </div>

      {/* CSS Animation Rule */}
      <style>{`
        @keyframes preloader-pulse {
          0%, 100% { transform: scale(0.95); opacity: 0.8; filter: drop-shadow(0 0 10px rgba(59,130,246,0.1)); }
          50% { transform: scale(1); opacity: 1; filter: drop-shadow(0 0 30px rgba(59,130,246,0.4)); }
        }
      `}</style>
    </div>
  )
}
