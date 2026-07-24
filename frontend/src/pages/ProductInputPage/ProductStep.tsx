import { motion } from 'framer-motion'

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
}

const inputClass =
  'w-full bg-ink-lighter border-none rounded-lg px-4 py-3 text-snow placeholder-snow/30 ' +
  'focus:outline-none focus:ring-2 focus:ring-gold/50 transition-shadow'

export default function ProductStep({ data, onChange }: ProductStepProps) {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-semibold text-snow">产品信息</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm text-snow/60 mb-1.5">
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
          <label className="block text-sm text-snow/60 mb-1.5">
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
          <label className="block text-sm text-snow/60 mb-1.5">SKU编号</label>
          <input
            className={inputClass}
            placeholder="例如 FJL-500-13"
            value={data.productSku}
            onChange={(e) => onChange('productSku', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-snow/60 mb-1.5">规格</label>
          <input
            className={inputClass}
            placeholder="例如 500mL, 13度"
            value={data.productSpecs}
            onChange={(e) => onChange('productSpecs', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-snow/60 mb-1.5">原料</label>
          <input
            className={inputClass}
            placeholder="例如 糯米、红曲、水"
            value={data.productIngredients}
            onChange={(e) => onChange('productIngredients', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-snow/60 mb-1.5">工艺</label>
          <input
            className={inputClass}
            placeholder="例如 红曲酿造、传统发酵"
            value={data.productProcess}
            onChange={(e) => onChange('productProcess', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-snow/60 mb-1.5">国内价格 (元)</label>
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

        <div>
          <label className="block text-sm text-snow/60 mb-1.5">产品图片URL</label>
          <input
            className={inputClass}
            placeholder="https://..."
            value={data.productImageUrl}
            onChange={(e) => onChange('productImageUrl', e.target.value)}
          />
        </div>
      </div>
    </motion.div>
  )
}
