import { useState } from "react"
import { ShieldCheck } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const DEFAULT_BRAND_NAME = "guardivex"
const DEFAULT_LOGO_URL = import.meta.env.VITE_BRAND_LOGO_URL || "/logo.png"

interface BrandMarkProps {
  src?: string
  alt?: string
  className?: string
  imgClassName?: string
  fallbackIconClassName?: string
}

export function BrandMark({
  src = DEFAULT_LOGO_URL,
  alt = `${DEFAULT_BRAND_NAME} logo`,
  className,
  imgClassName,
  fallbackIconClassName,
}: BrandMarkProps) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <div className={cn("relative", className)}>
      {!imageFailed ? (
        <img
          src={src}
          alt={alt}
          className={cn("h-full w-full object-contain brightness-75 contrast-105 dark:brightness-100 dark:contrast-100", imgClassName)}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <ShieldCheck size={24} weight="fill" className={cn("text-primary", fallbackIconClassName)} />
        </div>
      )}
    </div>
  )
}

interface BrandLogoProps {
  title?: string
  subtitle?: string
  src?: string
  className?: string
  markClassName?: string
  imgClassName?: string
  textContainerClassName?: string
  titleClassName?: string
  subtitleClassName?: string
}

export function BrandLogo({
  title = DEFAULT_BRAND_NAME,
  subtitle,
  src,
  className,
  markClassName,
  imgClassName,
  textContainerClassName,
  titleClassName,
  subtitleClassName,
}: BrandLogoProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <BrandMark src={src} className={markClassName} imgClassName={imgClassName} />
      <div className={cn("flex flex-col", textContainerClassName)}>
        <span className={cn("font-heading font-bold text-lg leading-none tracking-tight", titleClassName)}>{title}</span>
        {subtitle ? (
          <span className={cn("text-[11px] text-muted-foreground font-bold tracking-[0.16em] mt-1 uppercase", subtitleClassName)}>{subtitle}</span>
        ) : null}
      </div>
    </div>
  )
}

