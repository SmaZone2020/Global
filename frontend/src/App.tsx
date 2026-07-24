import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import HomePage from '@/pages/HomePage'
import ProductInputPage from '@/pages/ProductInputPage'
import AnalysisPage from '@/pages/AnalysisPage'
import StrategyPage from '@/pages/StrategyPage'
import MarketingPage from '@/pages/MarketingPage'
import ReportPage from '@/pages/ReportPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="new" element={<ProductInputPage />} />
          <Route path="project/:id/analysis" element={<AnalysisPage />} />
          <Route path="project/:id/strategy" element={<StrategyPage />} />
          <Route path="project/:id/marketing" element={<MarketingPage />} />
          <Route path="project/:id/report" element={<ReportPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
