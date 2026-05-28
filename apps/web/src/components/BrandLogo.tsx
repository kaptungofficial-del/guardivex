import { useState } from "react"
import { ShieldCheck } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const DEFAULT_BRAND_NAME = "Guardivex"
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
    <div className={cn("relative shrink-0 overflow-hidden", className)}>
      {!imageFailed ? (
        <img
          src={src}
          alt={alt}
          className={cn("block h-full w-full max-h-full max-w-full object-contain brightness-75 contrast-105 dark:brightness-100 dark:contrast-100", imgClassName)}
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
    <div className={cn("flex min-w-0 items-center gap-0.5", className)}>
      <BrandMark src={src} className={cn("h-11 w-11 sm:h-12 sm:w-12", markClassName)} imgClassName={imgClassName} />
      <div className={cn("flex min-w-0 flex-col", textContainerClassName)}>
        <span className={cn("brand-gradient-text font-heading font-bold text-[1.1rem] sm:text-[1.2rem] leading-none tracking-normal", titleClassName)}>{title}</span>
        {subtitle ? (
          <span className={cn("brand-muted-text text-[9.5px] font-semibold tracking-[0.1em] mt-1 uppercase", subtitleClassName)}>{subtitle}</span>
        ) : null}
      </div>
    </div>
  )
}

