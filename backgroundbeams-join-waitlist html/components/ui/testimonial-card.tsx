import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ author, text, href, className }: TestimonialCardProps) {
  const Card = href ? "a" : "div"

  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-lg border-t",
        "bg-gradient-to-b from-white/10 to-white/5",
        "p-3 text-start sm:p-4",
        "hover:from-white/15 hover:to-white/10",
        "max-w-[280px] sm:max-w-[300px]",
        "transition-colors duration-300",
        "backdrop-blur-sm border-white/20",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
          <AvatarFallback className="bg-white/20 text-white text-xs">
            {author.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-sm font-semibold leading-none text-white">{author.name}</h3>
          <p className="text-xs text-white/60">{author.handle}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-white/80">{text}</p>
    </Card>
  )
}
