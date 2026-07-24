import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react'
import { projectApi } from '@/services/api'
import { useProjectStore } from '@/stores/projectStore'
import type { CreateProjectRequest } from '@/types'
import GoldParticles from '@/components/shared/GoldParticles'
import StepIndicator from './StepIndicator'
import BrandStep from './BrandStep'
import ProductStep from './ProductStep'
import CultureStep from './CultureStep'
import MarketStep from './MarketStep'
import { demoData } from './demoData'

export default function ProductInputPage() {
  const navigate = useNavigate()
  const { setCurrentProject } = useProjectStore()
  const [currentStep, setCurrentStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [brandName, setBrandName] = useState('')
  const [establishedYear, setEstablishedYear] = useState<number | undefined>()
  const [brandOrigin, setBrandOrigin] = useState('')
  const [brandHistory, setBrandHistory] = useState('')
  const [brandVoice, setBrandVoice] = useState('')
  const [prohibitedClaims, setProhibitedClaims] = useState('')

  const [productName, setProductName] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productSku, setProductSku] = useState('')
  const [productSpecs, setProductSpecs] = useState('')
  const [productIngredients, setProductIngredients] = useState('')
  const [productProcess, setProductProcess] = useState('')
  const [productPrice, setProductPrice] = useState<number | undefined>()
  const [productImageUrl, setProductImageUrl] = useState('')

  const [cultureDescription, setCultureDescription] = useState('')
  const [uploadFiles, setUploadFiles] = useState<File[]>([])

  const [targetCountries, setTargetCountries] = useState<string[]>([])
  const [otherNotes, setOtherNotes] = useState('')

  const fillDemo = () => {
    setBrandName(demoData.brandName)
    setEstablishedYear(demoData.establishedYear)
    setBrandOrigin(demoData.brandOrigin)
    setBrandHistory(demoData.brandHistory)
    setBrandVoice(demoData.brandVoice)
    setProhibitedClaims(demoData.prohibitedClaims)
    setProductName(demoData.productName)
    setProductCategory(demoData.productCategory)
    setProductSku(demoData.productSku)
    setProductSpecs(demoData.productSpecs)
    setProductIngredients(demoData.productIngredients)
    setProductProcess(demoData.productProcess)
    setProductPrice(demoData.productPrice)
    setTargetCountries(demoData.targetCountries)
  }

  const handleFieldChange = (field: string, value: string | number | undefined) => {
    const setters: Record<string, (v: any) => void> = {
      brandName: setBrandName, establishedYear: setEstablishedYear,
      brandOrigin: setBrandOrigin, brandHistory: setBrandHistory,
      brandVoice: setBrandVoice, prohibitedClaims: setProhibitedClaims,
      productName: setProductName, productCategory: setProductCategory,
      productSku: setProductSku, productSpecs: setProductSpecs,
      productIngredients: setProductIngredients, productProcess: setProductProcess,
      productPrice: setProductPrice, productImageUrl: setProductImageUrl,
    }
    setters[field]?.(value)
  }

  const canNext = () => {
    if (currentStep === 0) return brandName.trim() !== ''
    if (currentStep === 1) return productName.trim() !== '' && productCategory.trim() !== ''
    return true
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError(null)
    try {
      const request: CreateProjectRequest = {
        name: `${brandName} 出海项目`,
        brandName, brandOrigin, brandHistory, brandVoice, prohibitedClaims,
        establishedYear,
        products: [{
          name: productName, category: productCategory, sku: productSku,
          specs: productSpecs, ingredients: productIngredients, process: productProcess,
          domesticPrice: productPrice, imageUrl: productImageUrl,
        }],
        targetCountries: targetCountries.length > 0 ? targetCountries : undefined,
      }
      const res = await projectApi.create(request)
      if (!res.success || !res.data) throw new Error(res.message || '创建项目失败')

      const projectId = res.data.id
      setCurrentProject(res.data)

      if (uploadFiles.length > 0) {
        for (const file of uploadFiles) {
          const formData = new FormData()
          formData.append('file', file)
          await projectApi.upload(projectId, formData)
        }
      }

      await projectApi.analyze(projectId)
      navigate(`/project/${projectId}/analysis`)
    } catch (e) {
      setError(e instanceof Error ? e.message : '提交失败，请重试')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="fixed inset-0 pointer-events-none">
        <GoldParticles count={15} />
      </div>

      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="text-2xl font-bold text-ink mb-1 font-serif">产品录入</h2>
          <p className="text-xs text-gold/30 tracking-wider uppercase">Product Registration</p>
        </div>
        {currentStep === 0 && (
          <motion.button
            onClick={fillDemo}
            className="group flex items-center gap-2 px-5 py-2.5 text-sm cursor-pointer
                       border border-gold/20 hover:border-gold/40 bg-gold/[0.05] hover:bg-gold/[0.1]
                       transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold">示例填充</span>
          </motion.button>
        )}
      </motion.div>

      <StepIndicator currentStep={currentStep} />

      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gold/15 via-gold/5 to-gold/10" />
        <div className="absolute inset-[1px] bg-cream-light" />

        <div className="relative p-8">
          {currentStep === 0 && (
            <BrandStep
              data={{ brandName, establishedYear, brandOrigin, brandHistory, brandVoice, prohibitedClaims }}
              onChange={handleFieldChange}
            />
          )}
          {currentStep === 1 && (
            <ProductStep
              data={{
                productName, productCategory, productSku, productSpecs,
                productIngredients, productProcess, productPrice, productImageUrl,
              }}
              onChange={handleFieldChange}
            />
          )}
          {currentStep === 2 && (
            <CultureStep
              cultureDescription={cultureDescription}
              onDescriptionChange={setCultureDescription}
              files={uploadFiles}
              onFilesChange={setUploadFiles}
            />
          )}
          {currentStep === 3 && (
            <MarketStep
              targetCountries={targetCountries}
              otherNotes={otherNotes}
              onCountriesChange={setTargetCountries}
              onNotesChange={setOtherNotes}
            />
          )}

          {error && (
            <motion.p
              className="text-unverified text-sm mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gold/10">
            <motion.button
              onClick={() => setCurrentStep((s) => s - 1)}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-5 py-2.5 text-ink/50 hover:text-ink
                         transition-colors disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
              whileHover={currentStep > 0 ? { x: -3 } : {}}
            >
              <ArrowLeft className="w-4 h-4" />
              上一步
            </motion.button>

            {currentStep < 3 ? (
              <motion.button
                onClick={() => setCurrentStep((s) => s + 1)}
                disabled={!canNext()}
                className="group relative flex items-center gap-2 px-6 py-2.5 text-sm
                           font-semibold overflow-hidden disabled:opacity-30
                           disabled:cursor-not-allowed cursor-pointer"
                whileHover={canNext() ? { scale: 1.03 } : {}}
                whileTap={canNext() ? { scale: 0.97 } : {}}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
                <span className="relative z-10 text-ink flex items-center gap-2">
                  下一步
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </motion.button>
            ) : (
              <motion.button
                onClick={handleSubmit}
                disabled={submitting}
                className="group relative flex items-center gap-2 px-8 py-2.5 text-sm
                           font-semibold overflow-hidden disabled:opacity-50
                           disabled:cursor-not-allowed cursor-pointer"
                whileHover={!submitting ? { scale: 1.03 } : {}}
                whileTap={!submitting ? { scale: 0.97 } : {}}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
                <span className="relative z-10 text-ink flex items-center gap-2">
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      提交中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      开始分析
                    </>
                  )}
                </span>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
