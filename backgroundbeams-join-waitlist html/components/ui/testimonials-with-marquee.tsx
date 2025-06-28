import { cn } from "@/lib/utils"
import { TestimonialCard, type TestimonialAuthor } from "@/components/ui/testimonial-card"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({ title, description, testimonials, className }: TestimonialsSectionProps) {
  return (
    <section className={cn("text-white", "py-8 sm:py-12 px-4", className)}>
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <h2 className="max-w-[600px] text-2xl font-semibold leading-tight sm:text-3xl">{title}</h2>
          <p className="text-sm max-w-[500px] font-medium text-white/70 sm:text-base">{description}</p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:30s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(3)].map((_, setIndex) =>
                testimonials.map((testimonial, i) => <TestimonialCard key={`${setIndex}-${i}`} {...testimonial} />),
              )}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-neutral-950 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-neutral-950 to-transparent" />
        </div>
      </div>
    </section>
  )
}
