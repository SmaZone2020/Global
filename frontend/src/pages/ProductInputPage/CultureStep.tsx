import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, X } from 'lucide-react'

interface CultureStepProps {
  cultureDescription: string
  onDescriptionChange: (value: string) => void
  files: File[]
  onFilesChange: (files: File[]) => void
}

const inputClass =
  'w-full bg-ink-lighter border-none rounded-lg px-4 py-3 text-snow placeholder-snow/30 ' +
  'focus:outline-none focus:ring-2 focus:ring-gold/50 transition-shadow'

const acceptedTypes = [
  'application/pdf',
  'text/markdown',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export default function CultureStep({
  cultureDescription,
  onDescriptionChange,
  files,
  onFilesChange,
}: CultureStepProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return
      const validFiles = Array.from(newFiles).filter((f) =>
        acceptedTypes.includes(f.type) || f.name.endsWith('.md')
      )
      onFilesChange([...files, ...validFiles])
    },
    [files, onFilesChange]
  )

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-semibold text-snow">文化与历史</h3>

      <div>
        <label className="block text-sm text-snow/60 mb-1.5">文化历史描述</label>
        <textarea
          className={`${inputClass} min-h-[140px] resize-y`}
          placeholder="描述品牌和产品的文化背景、历史渊源、工艺传承等..."
          value={cultureDescription}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm text-snow/60 mb-1.5">上传资料文件</label>
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
            isDragging
              ? 'border-gold bg-gold/5'
              : 'border-ink-lighter hover:border-gold/40'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <Upload className="w-8 h-8 text-snow/30 mx-auto mb-3" />
          <p className="text-snow/50 text-sm">
            拖拽文件到此处，或点击上传
          </p>
          <p className="text-snow/30 text-xs mt-1">支持 PDF / MD / DOC / DOCX</p>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            accept=".pdf,.md,.doc,.docx"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 bg-ink-lighter rounded-lg px-4 py-3"
            >
              <FileText className="w-5 h-5 text-gold shrink-0" />
              <span className="text-snow text-sm flex-1 truncate">{file.name}</span>
              <span className="text-snow/30 text-xs">
                {(file.size / 1024).toFixed(1)} KB
              </span>
              <button
                onClick={() => removeFile(index)}
                className="text-snow/30 hover:text-unverified transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
