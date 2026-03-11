import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

const particlePresets: { id: string; label: string; desc: string; options: any }[] = [
  { 
    id: 'sparkle', 
    label: '✨ Sparkle', 
    desc: 'Glowing sparkle particles that twinkle',
    options: {
      background: { color: { value: 'transparent' } },
      particles: {
        color: { value: ['#ffffff', '#ffe4b5', '#87ceeb', '#dda0dd'] },
        move: { enable: true, speed: 0.5, direction: 'none', random: true },
        number: { value: 150 },
        opacity: { value: { min: 0.1, max: 0.8 }, animation: { enable: true, speed: 2, minimumValue: 0.1 } },
        size: { value: { min: 1, max: 3 } },
        shape: { type: 'circle' },
        shadow: { enable: true, color: '#ffffff', blur: 10 },
        stroke: { width: 0 },
      },
    }
  },
  { 
    id: 'fireflies', 
    label: '🔥 Fireflies', 
    desc: 'Magical floating firefly particles',
    options: {
      background: { color: { value: 'transparent' } },
      particles: {
        color: { value: ['#ffd700', '#ff8c00', '#ffff00'] },
        move: { enable: true, speed: 0.8, direction: 'none', random: true, straight: false },
        number: { value: 80 },
        opacity: { value: { min: 0.2, max: 1 }, animation: { enable: true, speed: 1.5, minimumValue: 0.2 } },
        size: { value: { min: 2, max: 5 } },
        shape: { type: 'circle' },
        shadow: { enable: true, color: '#ffd700', blur: 15 },
      },
    }
  },
  { 
    id: 'stardust', 
    label: '🌟 Stardust', 
    desc: 'Magical cosmic dust particles',
    options: {
      background: { color: { value: 'transparent' } },
      particles: {
        color: { value: ['#ffd700', '#ff6b6b', '#4ecdc4', '#c0c0c0'] },
        move: { enable: true, speed: 0.3, direction: 'top', straight: false },
        number: { value: 100 },
        opacity: { value: { min: 0.3, max: 1 }, animation: { enable: true, speed: 0.5, minimumValue: 0.3 } },
        size: { value: { min: 1, max: 4 } },
        shape: { type: 'star' },
        shadow: { enable: true, color: '#ffffff', blur: 8 },
      },
    }
  },
  { 
    id: 'magic', 
    label: '🔮 Magic', 
    desc: 'Enchanted magical particles',
    options: {
      background: { color: { value: 'transparent' } },
      particles: {
        color: { value: ['#ff00ff', '#00ffff', '#ffff00', '#ff6b6b'] },
        move: { enable: true, speed: 1, direction: 'none', random: true },
        number: { value: 120 },
        opacity: { value: { min: 0.2, max: 0.9 }, animation: { enable: true, speed: 2, minimumValue: 0.2 } },
        size: { value: { min: 1, max: 3 } },
        shape: { type: 'circle' },
        shadow: { enable: true, color: '#ff00ff', blur: 20 },
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
      {/* Background particles - behind everything */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        zIndex: -1, 
        pointerEvents: 'none',
        overflow: 'hidden'
      }}>
        {init && (
          <Particles
            id="tsparticles"
            options={activePreset.options}
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0,
              width: '100%',
              height: '100%'
            }}
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
            Beautiful sparkle particles in the background. Click different presets to see animations!
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
                backdropFilter: 'blur(10px)',
              }}
            >
              <h3 style={{ color: '#f0db4f', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                {preset.label}
              </h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>{preset.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Demo cards to show particles behind */}
        <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
              <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Card {i}</h4>
              <p style={{ color: '#888', fontSize: '0.85rem' }}>Particles sparkle behind me!</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
