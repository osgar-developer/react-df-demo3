import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

const scrollExamples = [
  {
    title: 'Parallax Card',
    description: 'Cards that move at different speeds while scrolling',
    component: 'parallax'
  },
  {
    title: 'Scale on Scroll',
    description: 'Elements that scale up/down as you scroll',
    component: 'scale'
  },
  {
    title: 'Rotate on Scroll',
    description: 'Elements that rotate based on scroll position',
    component: 'rotate'
  },
  {
    title: 'Opacity Reveal',
    description: 'Fade in/out based on scroll position',
    component: 'opacity'
  },
  {
    title: 'Horizontal Scroll',
    description: 'Vertical scroll triggers horizontal movement',
    component: 'horizontal'
  },
]

const cardColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7']

function ParallaxCard({ i }: { i: number }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100 * (i % 2 === 0 ? 1 : -1), -100 * (i % 2 === 0 ? 1 : -1)])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15 * (i % 2 === 0 ? 1 : -1)])
  
  return (
    <motion.div
      ref={ref}
      style={{
        y,
        rotate,
        background: `linear-gradient(145deg, ${cardColors[i]}22 0%, ${cardColors[i]}11 100%)`,
        borderRadius: '24px',
        padding: '2.5rem',
        border: `1px solid ${cardColors[i]}44`,
        boxShadow: `0 20px 60px ${cardColors[i]}22`,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
    >
      <h3 style={{ color: cardColors[i], fontSize: '1.5rem', marginBottom: '1rem' }}>
        Card {i + 1}
      </h3>
      <p style={{ color: '#888' }}>Scroll to see parallax effect</p>
    </motion.div>
  )
}

function ScaleSection() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.5, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  
  return (
    <motion.div
      style={{
        scale,
        opacity,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '24px',
        padding: '4rem',
        textAlign: 'center',
        margin: '2rem 0',
      }}
    >
      <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Scaling Section</h3>
      <p>Watch me scale as you scroll!</p>
    </motion.div>
  )
}

function StaggerDemo() {
  const items = [1, 2, 3, 4, 5]
  
  return (
    <motion.div 
      style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginTop: '2rem' }}
    >
      {items.map((item, i) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
          style={{
            height: '100px',
            background: `linear-gradient(180deg, ${cardColors[i]} 0%, ${cardColors[i]}44 100%)`,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function FramerPage() {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ marginBottom: '4rem' }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#ff6b6b' }}>
          🎬 Framer Motion Advanced
        </h1>
        <p style={{ color: '#888', fontSize: '1.1rem', maxWidth: '600px' }}>
          Advanced scroll-triggered animations with Framer Motion.
          Scroll down to experience the magic!
        </p>
      </motion.div>

      <section style={{ marginBottom: '6rem' }}>
        <h2 style={{ color: '#ff6b6b', fontSize: '1.8rem', marginBottom: '2rem' }}>Parallax Cards</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {scrollExamples.map((_, i) => (
            <ParallaxCard key={i} i={i} />
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '6rem' }}>
        <h2 style={{ color: '#ff6b6b', fontSize: '1.8rem', marginBottom: '2rem' }}>Scale on Scroll</h2>
        <ScaleSection />
      </section>

      <section style={{ marginBottom: '6rem' }}>
        <h2 style={{ color: '#ff6b6b', fontSize: '1.8rem', marginBottom: '2rem' }}>Stagger Animation</h2>
        <p style={{ color: '#888', marginBottom: '1rem' }}>Elements animate in sequence with spring physics</p>
        <StaggerDemo />
      </section>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%)',
          borderRadius: '20px',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <h3 style={{ fontSize: '1.5rem' }}>Installation</h3>
        <code style={{ 
          display: 'block',
          background: 'rgba(0,0,0,0.3)', 
          padding: '1rem', 
          borderRadius: '8px',
          color: '#fff',
          marginTop: '1rem',
          fontSize: '0.9rem'
        }}>
          npm install motion
        </code>
      </motion.div>
    </div>
  )
}
