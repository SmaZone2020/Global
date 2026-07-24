import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface GiltCardProps {
  children: ReactNode
  className?: string
  hoverY?: number
}

export default function GiltCard({ children, className = '', hoverY = -6 }: GiltCardProps) {
  return (
    <motion.div
      className={`group relative overflow-hidden ${className}`}
      whileHover={{ y: hoverY, transition: { duration: 0.3 } }}
    >
      {/* Gilt shadow on hover */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: '0 8px 40px rgba(201,169,110,0.12), 0 0 60px rgba(139,26,43,0.06)',
        }}
      />

      {/* Rotating conic gradient border */}
      <div className="absolute inset-[-50%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[1]">
        <div
          className="w-full h-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0%, #b08d4f 8%, #e8d5a8 16%, #c9a96e 24%, transparent 32%, transparent 50%, #b08d4f 58%, #e8d5a8 66%, #c9a96e 74%, transparent 82%, transparent 100%)',
            animation: 'gilt-rotate 4s linear infinite',
          }}
        />
      </div>

      {/* Inner fill — cream on cream pages */}
      <div className="absolute inset-[1px] z-[2] bg-cream-light" />

      {/* Inner gilt background glow on hover */}
      <div
        className="absolute inset-[1px] z-[3] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(201,169,110,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(139,26,43,0.04) 0%, transparent 50%)',
        }}
      />

      {/* Animated shimmer sweep on hover */}
      <div
        className="absolute inset-[1px] z-[3] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(201,169,110,0.06) 45%, rgba(232,213,168,0.1) 50%, rgba(201,169,110,0.06) 55%, transparent 60%)',
          backgroundSize: '250% 100%',
          animation: 'shimmer 3s ease-in-out infinite',
        }}
      />

      {/* Static border when not hovered */}
      <div className="absolute inset-0 border border-ink/8 group-hover:border-transparent transition-colors duration-300 z-[4] pointer-events-none" />

      {/* Content */}
      <div className="relative z-[5]">
        {children}
      </div>
    </motion.div>
  )
}
