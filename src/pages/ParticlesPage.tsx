import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

const particlePresets: { id: string; label: string; desc: string; options: any }[] = [
  { 
    id: 'default', 
    label: 'Default', 
    desc: 'Classic particle network',
    options: {
      background: { color: { value: 'transparent' } },
      particles: {
        color: { value: '#ffffff' },
        links: { color: '#ffffff', distance: 150, enable: true, opacity: 0.3 },
        move: { enable: true, speed: 2 },
        number: { value: 80 },
        opacity: { value: 0.5 },
        size: { value: { min: 1, max: 3 } },
      },
    }
  },
  { 
    id: 'snow', 
    label: 'Snow', 
    desc: 'Falling snow particles',
    options: {
      background: { color: { value: 'transparent' } },
      particles: {
        color: { value: '#fff' },
        move: { direction: 'bottom', enable: true, speed: 2, straight: true },
        number: { value: 100 },
        opacity: { value: 0.8 },
        size: { value: { min: 1, max: 4 } },
        shape: { type: 'circle' },
      },
    }
  },
  { 
    id: 'stars', 
    label: 'Stars', 
    desc: 'Twinkling star field',
    options: {
      background: { color: { value: 'transparent' } },
      particles: {
        color: { value: ['#ffd700', '#ff6b6b', '#4ecdc4'] },
        move: { enable: true, speed: 0.5 },
        number: { value: 50 },
        opacity: { value: { min: 0.1, max: 1 }, animation: { enable: true, speed: 1, minimumValue: 0.1 } },
        size: { value: { min: 2, max: 5 } },
        shape: { type: 'star' },
      },
    }
  },
  { 
    id: 'bubbles', 
    label: 'Bubbles', 
    desc: 'Rising bubble effects',
    options: {
      background: { color: { value: 'transparent' } },
      particles: {
        color: { value: ['#00ffff', '#ff00ff', '#ffff00'] },
        move: { direction: 'top' as const, enable: true, speed: 2, straight: false },
        number: { value: 30 },
        opacity: { value: 0.4 },
        size: { value: { min: 5, max: 15 } },
        shape: { type: 'circle' },
      },
    }
  },
]

export default function ParticlesPage() {
  const [init, setInit] = useState(false)
  const [activePreset, setActivePreset] = useState(particlePresets[0])

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
      <div style={{ position: 'fixed', top: 100, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: 'none' }}>
        {init && (
          <Particles
            id="tsparticles"
            options={activePreset.options}
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        )}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ marginBottom: '4rem' }}
        >
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#f0db4f' }}>
            ✨ tsParticles
          </h1>
          <p style={{ color: '#888', fontSize: '1.1rem', maxWidth: '600px' }}>
            Beautiful, lightweight particles library. Click different presets to see animations!
          </p>
        </motion.div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {particlePresets.map((preset) => (
            <motion.button
              key={preset.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActivePreset(preset)}
              style={{
                padding: '1rem 2rem',
                background: activePreset.id === preset.id 
                  ? 'linear-gradient(135deg, #f0db4f 0%, #daa520 100%)'
                  : 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '12px',
                color: activePreset.id === preset.id ? '#000' : '#fff',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: activePreset.id === preset.id 
                  ? '0 10px 30px rgba(240, 219, 79, 0.3)'
                  : 'none',
              }}
            >
              {preset.label}
            </motion.button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {particlePresets.map((preset, i) => (
            <motion.div
              key={preset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActivePreset(preset)}
              style={{
                background: activePreset.id === preset.id 
                  ? 'rgba(240, 219, 79, 0.15)'
                  : 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '2rem',
                border: `1px solid ${activePreset.id === preset.id ? 'rgba(240, 219, 79, 0.5)' : 'rgba(255,255,255,0.1)'}`,
                cursor: 'pointer',
              }}
            >
              <h3 style={{ color: '#f0db4f', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                {preset.label}
              </h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>{preset.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
