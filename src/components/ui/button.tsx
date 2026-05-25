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
          "border border-primary/60 bg-[linear-gradient(135deg,#0077FF_0%,#00C7E8_55%,#00D7C3_100%)] text-primary-foreground shadow-sm hover:border-primary/80 hover:shadow-[0_10px_18px_-16px_rgba(7,17,31,0.18)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-border bg-background text-foreground shadow-sm hover:border-primary/40 hover:bg-secondary dark:border-[rgba(0,119,255,0.26)] dark:bg-[linear-gradient(180deg,rgba(11,22,40,0.90),rgba(7,17,31,0.82))] dark:text-[#F8FAFC] dark:hover:bg-[linear-gradient(180deg,rgba(11,22,40,0.96),rgba(7,17,31,0.9))]",
        secondary:
          "border border-border bg-white text-foreground shadow-sm hover:border-primary/40 hover:bg-secondary dark:border-[rgba(0,119,255,0.26)] dark:bg-[linear-gradient(180deg,rgba(11,22,40,0.92),rgba(7,17,31,0.88))] dark:text-[#F8FAFC] dark:shadow-[0_12px_24px_-18px_rgba(7,17,31,0.72)] dark:hover:bg-[linear-gradient(180deg,rgba(11,22,40,0.98),rgba(7,17,31,0.94))]",
        ghost:
          "hover:bg-secondary hover:text-foreground dark:hover:bg-[rgba(0,199,232,0.10)]",
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
