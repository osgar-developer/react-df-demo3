import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

const frameworks = [
  { 
    path: '/aos', 
    label: 'AOS', 
    desc: 'Animate On Scroll - Lightweight scroll animations',
    icon: '📜',
    color: '#4a90d9'
  },
  { 
    path: '/particles', 
    label: 'tsParticles', 
    desc: 'Beautiful particle effects and animations',
    icon: '✨',
    color: '#f0db4f'
  },
  { 
    path: '/framer', 
    label: 'Framer Motion+', 
    desc: 'Advanced scroll-triggered animations',
    icon: '🎬',
    color: '#ff6b6b'
  },
  { 
    path: '/intersection', 
    label: 'Intersection', 
    desc: 'Intersection Observer based reveals',
    icon: '👁️',
    color: '#9b59b6'
  },
]

export default function Home() {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          React Motion & Style
        </h1>
        <p style={{ 
          textAlign: 'center', 
          color: '#888', 
          fontSize: '1.2rem',
          marginBottom: '4rem' 
        }}>
          Showcase of scroll animations and stylish component frameworks
        </p>
      </motion.div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem' 
      }}>
        {frameworks.map((fw, i) => (
          <Link key={fw.path} to={fw.path} style={{ textDecoration: 'none' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              style={{
                background: 'linear-gradient(145deg, #1a1a2e 0%, #16162a 100%)',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 60px ${fw.color}15`,
                cursor: 'pointer',
                transition: 'box-shadow 0.3s ease',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{fw.icon}</div>
              <h3 style={{ color: fw.color, fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                {fw.label}
              </h3>
              <p style={{ color: '#888', lineHeight: 1.6 }}>{fw.desc}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}
