import { Outlet } from 'react-router-dom'
import Header from './Header'
import GiltRibbons from '@/components/shared/GiltRibbons'
import ProjectProgressBar from '@/components/shared/ProjectProgressBar'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-cream relative">
      <GiltRibbons />
      <Header />
      <ProjectProgressBar />
      <main className="relative z-10 mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
