import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2, Sparkles } from 'lucide-react'
import { projectApi } from '@/services/api'
import { useProjectStore } from '@/stores/projectStore'
import type { CreateProjectRequest } from '@/types'
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
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-snow">产品录入</h2>
        {currentStep === 0 && (
          <motion.button
            onClick={fillDemo}
            className="flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-lg
                       text-sm hover:bg-gold/20 transition-colors cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Sparkles className="w-4 h-4" />
            示例填充
          </motion.button>
        )}
      </div>

      <StepIndicator currentStep={currentStep} />

      <div className="bg-ink-light rounded-xl p-8">
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
          <p className="text-unverified text-sm mt-4">{error}</p>
        )}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-ink-lighter">
          <button
            onClick={() => setCurrentStep((s) => s - 1)}
            disabled={currentStep === 0}
            className="px-6 py-2.5 text-snow/60 hover:text-snow rounded-lg transition-colors
                       disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            上一步
          </button>

          {currentStep < 3 ? (
            <motion.button
              onClick={() => setCurrentStep((s) => s + 1)}
              disabled={!canNext()}
              className="px-6 py-2.5 bg-gold text-ink font-semibold rounded-lg text-sm
                         hover:bg-gold-light transition-colors disabled:opacity-40
                         disabled:cursor-not-allowed cursor-pointer"
              whileHover={canNext() ? { scale: 1.03 } : {}}
              whileTap={canNext() ? { scale: 0.97 } : {}}
            >
              下一步
            </motion.button>
          ) : (
            <motion.button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-8 py-2.5 bg-gold text-ink font-semibold rounded-lg text-sm
                         hover:bg-gold-light transition-colors disabled:opacity-60
                         disabled:cursor-not-allowed cursor-pointer"
              whileHover={!submitting ? { scale: 1.03 } : {}}
              whileTap={!submitting ? { scale: 0.97 } : {}}
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  提交中...
                </span>
              ) : (
                '开始分析'
              )}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}
