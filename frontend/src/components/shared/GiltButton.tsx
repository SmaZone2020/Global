import { motion } from 'framer-motion'
import type { ReactNode, MouseEventHandler } from 'react'

interface GiltButtonProps {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  variant?: 'primary' | 'outline'
  className?: string
}

export default function GiltButton({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  className = '',
}: GiltButtonProps) {
  if (variant === 'outline') {
    return (
      <motion.button
        onClick={onClick}
        disabled={disabled}
        className={`group relative overflow-hidden cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        whileHover={disabled ? {} : { scale: 1.03 }}
        whileTap={disabled ? {} : { scale: 0.97 }}
      >
        {/* Rotating gilt border */}
        <div className="absolute inset-[-50%] opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0%, #b08d4f 8%, #e8d5a8 16%, #c9a96e 24%, transparent 32%, transparent 50%, #b08d4f 58%, #e8d5a8 66%, #c9a96e 74%, transparent 82%, transparent 100%)',
              animation: 'gilt-rotate 4s linear infinite',
            }}
          />
        </div>
        <div className="absolute inset-[1px] bg-cream-light z-[1]" />

        {/* Inner shimmer on hover */}
        <div
          className="absolute inset-[1px] z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(201,169,110,0.08) 45%, rgba(232,213,168,0.12) 50%, rgba(201,169,110,0.08) 55%, transparent 60%)',
            backgroundSize: '250% 100%',
            animation: 'shimmer 3s ease-in-out infinite',
          }}
        />

        <span className="relative z-[3] flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium text-gold-dark group-hover:text-gold-dark transition-colors">
          {children}
        </span>
      </motion.button>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`group relative overflow-hidden cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
    >
      {/* Rotating gilt border */}
      <div className="absolute inset-[-50%] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0%, #b08d4f 8%, #e8d5a8 16%, #c9a96e 24%, transparent 32%, transparent 50%, #b08d4f 58%, #e8d5a8 66%, #c9a96e 74%, transparent 82%, transparent 100%)',
            animation: 'gilt-rotate 4s linear infinite',
          }}
        />
      </div>

      {/* Inner gold fill */}
      <div className="absolute inset-[1px] bg-gradient-to-r from-gold-dark via-gold to-gold-light z-[1]" />

      {/* Shimmer sweep */}
      <div
        className="absolute inset-[1px] z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.2) 55%, transparent 60%)',
          backgroundSize: '250% 100%',
          animation: 'shimmer 3s ease-in-out infinite',
        }}
      />

      {/* Gilt shadow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          boxShadow: '0 4px 25px rgba(201,169,110,0.25), 0 0 50px rgba(201,169,110,0.1)',
        }}
      />

      <span className="relative z-[3] flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-ink">
        {children}
      </span>
    </motion.button>
  )
}
