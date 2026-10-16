import { useState } from 'react'
import { cn } from '@/lib/utils'
import { sized, srcSet } from '@/lib/site'

type Props = {
  src: string
  alt: string
  /** CSS aspect-ratio, e.g. "4 / 5". Omit when the parent sets the size. */
  ratio?: string
  /** Shown while loading and kept if the image fails. */
  color?: string
  sizes?: string
  priority?: boolean
  className?: string
  imgClassName?: string
}

/** Fixed-ratio photo that never shows a blank or broken tile. */
export function Img({ src, alt, ratio, color, sizes = '100vw', priority, className, imgClassName }: Props) {
  const [state, setState] = useState<'loading' | 'loaded' | 'failed'>('loading')
  return (
    <div
      className={cn('relative overflow-hidden', state === 'failed' ? 'bg-deep' : '', className)}
      style={{ aspectRatio: ratio, backgroundColor: state === 'failed' ? undefined : color }}
    >
      {state !== 'failed' && (
        <img
          src={sized(src, 1200)}
          srcSet={srcSet(src)}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={() => setState('loaded')}
          onError={() => setState('failed')}
          className={cn(
            'absolute inset-0 size-full object-cover transition-opacity duration-500',
            state === 'loaded' || priority ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      )}
    </div>
  )
}
