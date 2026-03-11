import { useInView } from 'react-intersection-observer'
import { motion } from 'motion/react'

const RevealCard = ({ 
  title, 
  desc, 
  color, 
  delay = 0,
  direction = 'up'
}: { 
  title: string, 
  desc: string, 
  color: string, 
  delay?: number,
  direction?: 'up' | 'down' | 'left' | 'right'
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  })

  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      style={{
        background: `linear-gradient(145deg, ${color}22 0%, ${color}11 100%)`,
        borderRadius: '20px',
        padding: '2rem',
        border: `1px solid ${color}44`,
        boxShadow: `0 15px 40px ${color}15`,
      }}
    >
      <h3 style={{ color, fontSize: '1.4rem', marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ color: '#888', lineHeight: 1.6 }}>{desc}</p>
    </motion.div>
  )
}

function CounterSection() {
  const [ref, inView] = useInView({ threshold: 0.5 })
  
  return (
    <div 
      ref={ref}
      style={{
        background: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
        borderRadius: '24px',
        padding: '3rem',
        textAlign: 'center',
        margin: '3rem 0',
      }}
    >
      <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Scroll Triggered Reveal</h3>
      {inView && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          style={{ fontSize: '4rem', fontWeight: 'bold' }}
        >
          👁️
        </motion.div>
      )}
      <p style={{ marginTop: '1rem', opacity: 0.8 }}>
        {inView ? 'I appeared!' : 'Scroll to reveal...'}
      </p>
    </div>
  )
}

function ProgressDemo() {
  const sections = 5
  
  return (
    <div style={{ marginTop: '4rem' }}>
      <h2 style={{ color: '#9b59b6', fontSize: '1.8rem', marginBottom: '2rem' }}>Scroll Progress</h2>
      {[...Array(sections)].map((_, i) => (
        <SectionWithProgress key={i} index={i} />
      ))}
    </div>
  )
}

function SectionWithProgress({ index }: { index: number }) {
  const [ref, inView] = useInView({ threshold: 0.3 })
  const colors = ['#9b59b6', '#e74c3c', '#3498db', '#2ecc71', '#f39c12']
  
  return (
    <div ref={ref} style={{ marginBottom: '2rem' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: '100%' } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          height: '8px',
          background: colors[index],
          borderRadius: '4px',
          marginBottom: '1rem',
        }}
      />
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.3 }}
        style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '16px',
          padding: '2rem',
          border: `1px solid ${colors[index]}44`,
        }}
      >
        <h4 style={{ color: colors[index], fontSize: '1.3rem' }}>Section {index + 1}</h4>
        <p style={{ color: '#888' }}>Progress bar fills as you scroll past</p>
      </motion.div>
    </div>
  )
}

export default function IntersectionPage() {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ marginBottom: '4rem' }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#9b59b6' }}>
          👁️ Intersection Observer
        </h1>
        <p style={{ color: '#888', fontSize: '1.1rem', maxWidth: '600px' }}>
          React Intersection Observer for custom scroll-triggered reveals.
          Elements animate when they enter the viewport!
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        <RevealCard 
          title="Fade Up" 
          desc="Elements fade in while moving upward" 
          color="#9b59b6" 
          delay={0}
          direction="up"
        />
        <RevealCard 
          title="Fade Down" 
          desc="Elements fade in while moving downward" 
          color="#e74c3c" 
          delay={0.1}
          direction="down"
        />
        <RevealCard 
          title="Fade Left" 
          desc="Elements slide in from the right" 
          color="#3498db" 
          delay={0.2}
          direction="left"
        />
        <RevealCard 
          title="Fade Right" 
          desc="Elements slide in from the left" 
          color="#2ecc71" 
          delay={0.3}
          direction="right"
        />
      </div>

      <CounterSection />

      <ProgressDemo />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          background: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
          borderRadius: '20px',
          padding: '2rem',
          textAlign: 'center',
          marginTop: '4rem',
        }}
      >
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Installation</h3>
        <code style={{ 
          display: 'block',
          background: 'rgba(0,0,0,0.3)', 
          padding: '1rem', 
          borderRadius: '8px',
          color: '#fff',
          fontSize: '0.9rem'
        }}>
          npm install react-intersection-observer
        </code>
      </motion.div>
    </div>
  )
}
