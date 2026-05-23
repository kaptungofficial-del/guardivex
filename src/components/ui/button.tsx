import { ComponentProps } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[2px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "border border-slate-700 bg-slate-900 text-slate-100 shadow-none hover:border-slate-600 hover:bg-slate-800 dark:border-slate-400 dark:bg-slate-100 dark:text-slate-900 dark:hover:border-slate-300 dark:hover:bg-white",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "glass-outline text-foreground shadow-none hover:border-slate-500/50 hover:bg-slate-100/70 dark:border-slate-600 dark:bg-slate-900/65 dark:text-slate-50 dark:hover:border-slate-500 dark:hover:bg-slate-800/80",
        secondary:
          "border border-border/80 bg-secondary/75 text-secondary-foreground shadow-none hover:border-slate-400/50 hover:bg-secondary/95 dark:border-slate-600 dark:bg-slate-900/65 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-800/80",
        ghost:
          "hover:bg-accent/70 hover:text-accent-foreground dark:hover:bg-cyan-500/10",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8.5 px-3.5 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-2.5 has-[>svg]:px-2.5",
        lg: "h-9.5 px-5 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
