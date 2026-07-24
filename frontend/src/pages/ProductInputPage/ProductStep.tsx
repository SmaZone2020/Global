import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ProductData {
  productName: string
  productCategory: string
  productSku: string
  productSpecs: string
  productIngredients: string
  productProcess: string
  productPrice: number | undefined
  productImageUrl: string
}

interface ProductStepProps {
  data: ProductData
  onChange: (field: string, value: string | number | undefined) => void
  imageFile: File | null
  onImageFileChange: (file: File | null) => void
}

const inputClass =
  'w-full bg-cream-dark/40 border border-ink/8 px-4 py-3 text-ink placeholder-ink/25 ' +
  'focus:outline-none focus:ring-2 focus:ring-gold/50 transition-shadow'

export default function ProductStep({ data, onChange, imageFile, onImageFileChange }: ProductStepProps) {
  const [imageMode, setImageMode] = useState<'url' | 'upload'>(data.productImageUrl ? 'url' : 'upload')
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileSelect = useCallback((file: File | null) => {
    if (!file) {
      onImageFileChange(null)
      setPreviewUrl(null)
      return
    }
    if (!file.type.startsWith('image/')) return
    onImageFileChange(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    onChange('productImageUrl', '')
  }, [onImageFileChange, onChange])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const clearImage = () => {
    handleFileSelect(null)
    onChange('productImageUrl', '')
  }

  const displayImage = imageMode === 'upload' ? previewUrl : data.productImageUrl

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-semibold text-ink">产品信息</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm text-ink/60 mb-1.5">
            产品名称 <span className="text-unverified">*</span>
          </label>
          <input
            className={inputClass}
            placeholder="请输入产品名称"
            value={data.productName}
            onChange={(e) => onChange('productName', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-ink/60 mb-1.5">
            品类 <span className="text-unverified">*</span>
          </label>
          <input
            className={inputClass}
            placeholder="例如 黄酒/发酵酒"
            value={data.productCategory}
            onChange={(e) => onChange('productCategory', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-ink/60 mb-1.5">SKU编号</label>
          <input
            className={inputClass}
            placeholder="例如 FJL-500-13"
            value={data.productSku}
            onChange={(e) => onChange('productSku', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-ink/60 mb-1.5">规格</label>
          <input
            className={inputClass}
            placeholder="例如 500mL, 13度"
            value={data.productSpecs}
            onChange={(e) => onChange('productSpecs', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-ink/60 mb-1.5">原料</label>
          <input
            className={inputClass}
            placeholder="例如 糯米、红曲、水"
            value={data.productIngredients}
            onChange={(e) => onChange('productIngredients', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-ink/60 mb-1.5">工艺</label>
          <input
            className={inputClass}
            placeholder="例如 红曲酿造、传统发酵"
            value={data.productProcess}
            onChange={(e) => onChange('productProcess', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-ink/60 mb-1.5">国内价格 (元)</label>
          <input
            className={inputClass}
            type="number"
            placeholder="例如 25"
            value={data.productPrice ?? ''}
            onChange={(e) =>
              onChange('productPrice', e.target.value ? Number(e.target.value) : undefined)
            }
          />
        </div>
      </div>

      {/* Image upload / URL section */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm text-ink/60">产品图片</label>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setImageMode('upload')}
              className={`px-3 py-1 text-xs cursor-pointer transition-colors ${
                imageMode === 'upload'
                  ? 'bg-chi/10 text-chi border border-chi/20'
                  : 'text-ink/40 border border-ink/8 hover:text-ink/60'
              }`}
            >
              上传图片
            </button>
            <button
              type="button"
              onClick={() => setImageMode('url')}
              className={`px-3 py-1 text-xs cursor-pointer transition-colors ${
                imageMode === 'url'
                  ? 'bg-chi/10 text-chi border border-chi/20'
                  : 'text-ink/40 border border-ink/8 hover:text-ink/60'
              }`}
            >
              图片URL
            </button>
          </div>
        </div>

        {imageMode === 'url' ? (
          <input
            className={inputClass}
            placeholder="https://..."
            value={data.productImageUrl}
            onChange={(e) => onChange('productImageUrl', e.target.value)}
          />
        ) : (
          <div>
            {!displayImage ? (
              <div
                className={`border-2 border-dashed p-6 text-center transition-colors cursor-pointer ${
                  isDragging
                    ? 'border-gold bg-gold/5'
                    : 'border-ink/15 hover:border-gold/40'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('productImageInput')?.click()}
              >
                <Upload className="w-8 h-8 text-ink/25 mx-auto mb-2" />
                <p className="text-ink/50 text-sm">拖拽图片到此处，或点击上传</p>
                <p className="text-ink/30 text-xs mt-1">支持 JPG / PNG / WebP</p>
                <input
                  id="productImageInput"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null
                    handleFileSelect(file)
                  }}
                />
              </div>
            ) : (
              <div className="relative group">
                <div className="border border-ink/8 p-2 bg-cream-dark/20">
                  <img
                    src={displayImage}
                    alt="产品图片预览"
                    className="w-full h-48 object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-3 right-3 w-7 h-7 bg-cream/90 border border-ink/10
                             flex items-center justify-center text-ink/50 hover:text-unverified
                             transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {imageMode === 'url' && data.productImageUrl && (
          <div className="mt-3 border border-ink/8 p-2 bg-cream-dark/20">
            <img
              src={data.productImageUrl}
              alt="产品图片预览"
              className="w-full h-48 object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}
