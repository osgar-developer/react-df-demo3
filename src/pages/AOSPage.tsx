import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { motion } from 'motion/react'

const aosExamples = [
  { title: 'Fade In', animation: 'fade-in', desc: 'Smooth fade in from opacity 0 to 1' },
  { title: 'Fade Up', animation: 'fade-up', desc: 'Fade in while moving from bottom' },
  { title: 'Fade Down', animation: 'fade-down', desc: 'Fade in while moving from top' },
  { title: 'Zoom In', animation: 'zoom-in', desc: 'Scale up from 0 to 1 with fade' },
  { title: 'Slide Left', animation: 'slide-left', desc: 'Slide in from right to left' },
  { title: 'Slide Right', animation: 'slide-right', desc: 'Slide in from left to right' },
  { title: 'Flip Left', animation: 'flip-left', desc: '3D flip from right' },
  { title: 'Flip Right', animation: 'flip-right', desc: '3D flip from left' },
]

export default function AOSPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 50 })
  }, [])

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ marginBottom: '4rem' }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#4a90d9' }}>
          📜 AOS - Animate On Scroll
        </h1>
        <p style={{ color: '#888', fontSize: '1.1rem', maxWidth: '600px' }}>
          AOS is a lightweight, dependency-free library for animate-on-scroll animations.
          Scroll down to see the magic!
        </p>
      </motion.div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem' 
      }}>
        {aosExamples.map((ex) => (
          <motion.div
            key={ex.title}
            data-aos={ex.animation}
            data-aos-offset="100"
            style={{
              background: 'linear-gradient(145deg, #1e2a3a 0%, #1a2535 100%)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid rgba(74, 144, 217, 0.2)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            }}
          >
            <h3 style={{ color: '#4a90d9', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
              {ex.title}
            </h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>{ex.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        data-aos="fade-up"
        data-aos-offset="200"
        style={{ 
          marginTop: '4rem', 
          padding: '2rem', 
          background: 'rgba(74, 144, 217, 0.1)',
          borderRadius: '16px',
          border: '1px solid rgba(74, 144, 217, 0.3)',
        }}
      >
        <h2 style={{ color: '#4a90d9', marginBottom: '1rem' }}>Installation</h2>
        <code style={{ 
          display: 'block',
          background: '#0a0a0f', 
          padding: '1rem', 
          borderRadius: '8px',
          color: '#0f0',
          fontSize: '0.9rem'
        }}>
          npm install aos
        </code>
      </motion.div>
    </div>
  )
}
