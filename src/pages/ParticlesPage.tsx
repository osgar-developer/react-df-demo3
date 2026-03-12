import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
}

const colors = ['#ffffff', '#ffe4b5', '#87ceeb', '#dda0dd', '#ffd700', '#ff6b6b', '#4ecdc4', '#00ffff', '#90ee90']

function createSparkles(count: number): Sparkle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
  }))
}

function SparkleEffect({ count = 50, style = 'sparkle' }: { count?: number; style?: string }) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  
  useEffect(() => {
    setSparkles(createSparkles(count))
  }, [count, style])

  const getAnimation = () => {
    switch(style) {
      case 'fireflies':
        return 'firefly 4s ease-in-out infinite'
      case 'stardust':
        return 'stardust 6s linear infinite'
      case 'magic':
        return 'magic 3s ease-in-out infinite'
      default:
        return 'sparkle 2s ease-in-out infinite'
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 0.9; transform: scale(1); }
        }
        @keyframes firefly {
          0%, 100% { opacity: 0; transform: translateY(0) scale(0.5); }
          25% { opacity: 1; transform: translateY(-20px) scale(1); }
          50% { opacity: 0.6; transform: translateY(-40px) scale(0.8); }
          75% { opacity: 1; transform: translateY(-60px) scale(1); }
        }
        @keyframes stardust {
          0% { opacity: 0; transform: translateY(100vh) rotate(0deg); }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-100vh) rotate(720deg); }
        }
        @keyframes magic {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
        }
      `}</style>
      {sparkles.map((s) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            backgroundColor: s.color,
            boxShadow: `0 0 ${s.size * 3}px ${s.color}, 0 0 ${s.size * 6}px ${s.color}`,
            animation: getAnimation(),
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            willChange: 'opacity, transform',
          }}
        />
      ))}
    </div>
  )
}

const presets = [
  { 
    id: 'sparkle', 
    label: '✨ Sparkle', 
    desc: 'Classic twinkling sparkles',
    count: 100,
  },
  { 
    id: 'fireflies', 
    label: '🔥 Fireflies', 
    desc: 'Magical floating fireflies',
    count: 60,
  },
  { 
    id: 'stardust', 
    label: '🌟 Stardust', 
    desc: 'Cosmic falling stars',
    count: 80,
  },
  { 
    id: 'magic', 
    label: '🔮 Magic', 
    desc: 'Enchanted magical particles',
    count: 50,
  },
]

export default function ParticlesPage() {
  const [activePreset, setActivePreset] = useState(presets[0])

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
      {/* Background sparkles - zIndex 0 so visible through transparent cards */}
      <SparkleEffect count={activePreset.count} style={activePreset.id} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ marginBottom: '4rem', padding: '2rem', borderRadius: '16px' }}
        >
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#f0db4f', textShadow: '0 0 20px rgba(240,219,79,0.5)' }}>
            ✨ Sparkle Particles
          </h1>
          <p style={{ color: '#ccc', fontSize: '1.1rem', maxWidth: '600px' }}>
            Beautiful sparkle particles in the background. Click different presets to see animations!
          </p>
        </motion.div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {presets.map((preset) => (
            <motion.button
              key={preset.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActivePreset(preset)}
              style={{
                padding: '1rem 2rem',
                background: activePreset.id === preset.id 
                  ? 'rgba(240, 219, 79, 0.3)'
                  : 'rgba(255,255,255,0.05)',
                border: `1px solid ${activePreset.id === preset.id ? 'rgba(240, 219, 79, 0.6)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '12px',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {preset.label}
            </motion.button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {presets.map((preset, i) => (
            <motion.div
              key={preset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActivePreset(preset)}
              style={{
                background: activePreset.id === preset.id 
                  ? 'rgba(240, 219, 79, 0.08)'
                  : 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                padding: '2rem',
                border: `1px solid ${activePreset.id === preset.id ? 'rgba(240, 219, 79, 0.2)' : 'rgba(255,255,255,0.05)'}`,
                cursor: 'pointer',
              }}
            >
              <h3 style={{ color: '#f0db4f', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                {preset.label}
              </h3>
              <p style={{ color: '#bbb', fontSize: '0.9rem' }}>{preset.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Demo cards - very transparent so sparkles show through */}
        <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 }}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
              <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Card {i}</h4>
              <p style={{ color: '#bbb', fontSize: '0.85rem' }}>Particles sparkle behind me!</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
