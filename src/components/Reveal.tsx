import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  delay?: number
  y?: number
}

/** Fades and lifts content in once when it scrolls into view. */
export function Reveal({ children, delay = 0, y = 40, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Splits a headline into lines that slide up from a mask. */
export function MaskLines({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
}: {
  lines: ReactNode[]
  className?: string
  lineClassName?: string
  delay?: number
}) {
  // The in-view trigger sits on the visible wrapper: the lines themselves start
  // clipped outside their masks, so an observer on them would never fire.
  return (
    <motion.span
      className={className}
      style={{ display: 'block' }}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {lines.map((line, i) => (
        // top padding keeps accents and umlauts on capitals (Ö, É, À) inside the mask
        <span key={i} style={{ display: 'block', overflow: 'hidden', paddingTop: '0.12em', marginTop: '-0.12em', paddingBottom: '0.06em' }}>
          <motion.span
            className={lineClassName}
            style={{ display: 'block' }}
            variants={{ hidden: { y: '105%' }, shown: { y: '0%' } }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
