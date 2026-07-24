export default function GiltRibbons() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Xuan (玄色) ribbon — large, slow, upper area */}
      <div
        className="absolute w-[900px] h-[140px] opacity-[0.06]"
        style={{
          top: '12%',
          left: '-10%',
          background: 'linear-gradient(90deg, transparent, rgba(10,10,18,0.5), rgba(26,26,46,0.7), rgba(10,10,18,0.5), transparent)',
          filter: 'blur(50px)',
          borderRadius: '50%',
          animation: 'ribbon-drift 22s ease-in-out infinite',
        }}
      />

      {/* Chi (赤色) ribbon — medium, opposite direction */}
      <div
        className="absolute w-[700px] h-[100px] opacity-[0.05]"
        style={{
          top: '40%',
          right: '-5%',
          background: 'linear-gradient(90deg, transparent, rgba(139,26,43,0.4), rgba(196,30,58,0.6), rgba(139,26,43,0.4), transparent)',
          filter: 'blur(45px)',
          borderRadius: '50%',
          animation: 'ribbon-drift-2 26s ease-in-out infinite',
        }}
      />

      {/* Xuan ribbon — thin, lower area */}
      <div
        className="absolute w-[600px] h-[80px] opacity-[0.05]"
        style={{
          bottom: '18%',
          left: '5%',
          background: 'linear-gradient(90deg, transparent, rgba(26,26,46,0.4), rgba(45,45,68,0.6), rgba(26,26,46,0.4), transparent)',
          filter: 'blur(40px)',
          borderRadius: '50%',
          animation: 'ribbon-drift-3 19s ease-in-out infinite',
        }}
      />

      {/* Chi accent — vertical, subtle */}
      <div
        className="absolute w-[120px] h-[600px] opacity-[0.035]"
        style={{
          top: '8%',
          right: '12%',
          background: 'linear-gradient(180deg, transparent, rgba(139,26,43,0.3), rgba(196,30,58,0.4), rgba(139,26,43,0.3), transparent)',
          filter: 'blur(50px)',
          borderRadius: '50%',
          animation: 'ribbon-drift 24s ease-in-out infinite 3s',
        }}
      />

      {/* Mixed xuan+chi ribbon — crossing */}
      <div
        className="absolute w-[500px] h-[70px] opacity-[0.04]"
        style={{
          top: '65%',
          left: '20%',
          background: 'linear-gradient(90deg, transparent, rgba(10,10,18,0.3), rgba(139,26,43,0.4), rgba(10,10,18,0.3), transparent)',
          filter: 'blur(45px)',
          borderRadius: '50%',
          animation: 'ribbon-drift-2 20s ease-in-out infinite 2s',
        }}
      />
    </div>
  )
}
