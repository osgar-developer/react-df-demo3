import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import AOSPage from './pages/AOSPage'
import ParticlesPage from './pages/ParticlesPage'
import FramerPage from './pages/FramerPage'
import IntersectionPage from './pages/IntersectionPage'

function App() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/aos', label: 'AOS', icon: '📜' },
    { path: '/particles', label: 'Particles', icon: '✨' },
    { path: '/framer', label: 'Framer+', icon: '🎬' },
    { path: '/intersection', label: 'Intersection', icon: '👁️' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#fff' }}>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(10, 10, 15, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '1rem 2rem',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, background: 'linear-gradient(90deg, #f0f, #0ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            React Motion Demo
          </h1>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  textDecoration: 'none',
                  color: location.pathname === item.path ? '#0ff' : '#888',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  background: location.pathname === item.path ? 'rgba(0,255,255,0.1)' : 'transparent',
                  transition: 'all 0.3s ease',
                  fontSize: '0.9rem',
                }}
              >
                <span style={{ marginRight: '6px' }}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      
      <div style={{ paddingTop: '80px' }}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/aos" element={<AOSPage />} />
          <Route path="/particles" element={<ParticlesPage />} />
          <Route path="/framer" element={<FramerPage />} />
          <Route path="/intersection" element={<IntersectionPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
