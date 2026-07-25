import { motion } from 'framer-motion'

interface Props {
  content: any
}

export default function MarkdownReport({ content }: Props) {
  const markdown = typeof content === 'string'
    ? content
    : content?.markdown ?? ''

  if (!markdown) return null

  const sections = parseSections(markdown)

  return (
    <div className="space-y-6">
      {sections.map((section, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
        >
          {section.title && (
            <h4 className="text-base font-semibold text-chi mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-gold inline-block" />
              {section.title}
            </h4>
          )}
          <div className="space-y-2 pl-3">
            {section.lines.map((line, j) => renderLine(line, j))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function renderLine(line: string, key: number) {
  // Sub-heading (### level)
  if (line.startsWith('### ')) {
    return (
      <h5 key={key} className="text-sm font-semibold text-ink mt-3 mb-1">
        {line.slice(4)}
      </h5>
    )
  }

  // Bold text pattern: **text**
  const hasBold = line.includes('**')

  // Bullet point
  if (line.startsWith('- ')) {
    const text = line.slice(2)
    return (
      <div key={key} className="flex gap-2 items-start">
        <span className="w-1.5 h-1.5 mt-2 bg-gold/60 shrink-0" />
        <span className="text-sm text-ink/70 leading-relaxed">
          {hasBold ? renderBoldText(text) : text}
        </span>
      </div>
    )
  }

  // Numbered list
  const numMatch = line.match(/^(\d+)\.\s+(.+)/)
  if (numMatch) {
    return (
      <div key={key} className="flex gap-2 items-start">
        <span className="text-xs text-gold font-semibold mt-0.5 w-5 shrink-0">
          {numMatch[1]}.
        </span>
        <span className="text-sm text-ink/70 leading-relaxed">
          {hasBold ? renderBoldText(numMatch[2]) : numMatch[2]}
        </span>
      </div>
    )
  }

  // Table row (simple | delimited)
  if (line.includes('|') && !line.startsWith('|--')) {
    const cells = line.split('|').map(c => c.trim()).filter(Boolean)
    if (cells.length >= 2) {
      return (
        <div key={key} className="grid grid-cols-[auto_1fr] gap-x-4 text-sm py-1">
          <span className="text-gold font-medium">{cells[0]}</span>
          <span className="text-ink/70">{cells.slice(1).join(' | ')}</span>
        </div>
      )
    }
  }

  // Separator line
  if (line.startsWith('---') || line.startsWith('|--')) return null

  // Regular paragraph
  return (
    <p key={key} className="text-sm text-ink/70 leading-relaxed">
      {hasBold ? renderBoldText(line) : line}
    </p>
  )
}

function renderBoldText(text: string) {
  const parts = text.split(/\*\*/)
  return parts.map((part, i) =>
    i % 2 === 1
      ? <span key={i} className="font-medium text-ink">{part}</span>
      : <span key={i}>{part}</span>
  )
}

function parseSections(markdown: string): { title: string; lines: string[] }[] {
  const sections: { title: string; lines: string[] }[] = []
  let current: { title: string; lines: string[] } = { title: '', lines: [] }

  for (const line of markdown.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed) continue

    const h2Match = trimmed.match(/^#{1,2}\s+(.+)/)
    if (h2Match) {
      if (current.title || current.lines.length > 0) {
        sections.push(current)
      }
      current = { title: h2Match[1], lines: [] }
    } else {
      current.lines.push(trimmed)
    }
  }

  if (current.title || current.lines.length > 0) {
    sections.push(current)
  }

  return sections
}
