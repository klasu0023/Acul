// Testimonials data
const testimonials = [
  {
    author: {
      name: "Emma Thompson",
      handle: "@emmaai",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    text: "ACULESS Studios transformed our creative vision into reality. The attention to detail is unmatched.",
  },
  {
    author: {
      name: "David Park",
      handle: "@davidtech",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    text: "Working with ACULESS Studios was seamless. They delivered beyond our expectations every time.",
  },
  {
    author: {
      name: "Sofia Rodriguez",
      handle: "@sofiaml",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
    text: "Finally, a studio that understands creative vision! The results speak for themselves.",
  },
  {
    author: {
      name: "Michael Chen",
      handle: "@mikedev",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    text: "The best creative studio we've worked with. Professional, innovative, and reliable.",
  },
  {
    author: {
      name: "Sarah Wilson",
      handle: "@sarahdesign",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    text: "Their innovative approach to design thinking revolutionized our entire product strategy.",
  },
  {
    author: {
      name: "Alex Kumar",
      handle: "@alexkumar",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
    text: "ACULESS Studios doesn't just deliver projects, they deliver experiences that resonate.",
  },
]

// Background beams animation
class BeamsBackground {
  constructor(canvasId, intensity = "strong") {
    this.canvas = document.getElementById(canvasId)
    this.ctx = this.canvas.getContext("2d")
    this.beams = []
    this.animationFrame = null
    this.MINIMUM_BEAMS = 20

    this.opacityMap = {
      subtle: 0.7,
      medium: 0.85,
      strong: 1,
    }

    this.intensity = intensity

    this.init()
  }

  init() {
    this.updateCanvasSize()
    window.addEventListener("resize", () => this.updateCanvasSize())
    this.animate()
  }

  updateCanvasSize() {
    const dpr = window.devicePixelRatio || 1
    this.canvas.width = window.innerWidth * dpr
    this.canvas.height = window.innerHeight * dpr
    this.canvas.style.width = `${window.innerWidth}px`
    this.canvas.style.height = `${window.innerHeight}px`
    this.ctx.scale(dpr, dpr)

    const totalBeams = this.MINIMUM_BEAMS * 1.5
    this.beams = Array.from({ length: totalBeams }, (_, index) =>
      this.createBeam(this.canvas.width, this.canvas.height, index, totalBeams),
    )
  }

  createBeam(width, height, index, totalBeams) {
    const angle = -35 + Math.random() * 10
    const column = index % 3
    const spacing = width / 3

    return {
      x: column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5,
      y: height + 100,
      width: 100 + Math.random() * 100,
      length: height * 2.5,
      angle: angle,
      speed: 0.5 + Math.random() * 0.4,
      opacity: 0.2 + Math.random() * 0.1,
      hue: 190 + (index * 70) / totalBeams,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.03,
    }
  }

  resetBeam(beam, index, totalBeams) {
    const column = index % 3
    const spacing = this.canvas.width / 3

    beam.y = this.canvas.height + 100
    beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5
    beam.width = 100 + Math.random() * 100
    beam.speed = 0.5 + Math.random() * 0.4
    beam.hue = 190 + (index * 70) / totalBeams
    beam.opacity = 0.2 + Math.random() * 0.1
    return beam
  }

  drawBeam(beam) {
    this.ctx.save()
    this.ctx.translate(beam.x, beam.y)
    this.ctx.rotate((beam.angle * Math.PI) / 180)

    const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2) * this.opacityMap[this.intensity]

    const gradient = this.ctx.createLinearGradient(0, 0, 0, beam.length)
    gradient.addColorStop(0, `hsla(${beam.hue}, 85%, 65%, 0)`)
    gradient.addColorStop(0.1, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`)
    gradient.addColorStop(0.4, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`)
    gradient.addColorStop(0.6, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`)
    gradient.addColorStop(0.9, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`)
    gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 65%, 0)`)

    this.ctx.fillStyle = gradient
    this.ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length)
    this.ctx.restore()
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.filter = "blur(35px)"

    const totalBeams = this.beams.length
    this.beams.forEach((beam, index) => {
      beam.y -= beam.speed
      beam.pulse += beam.pulseSpeed

      if (beam.y + beam.length < -100) {
        this.resetBeam(beam, index, totalBeams)
      }

      this.drawBeam(beam)
    })

    this.animationFrame = requestAnimationFrame(() => this.animate())
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }
    window.removeEventListener("resize", () => this.updateCanvasSize())
  }
}

// Testimonials functionality
function createTestimonialCard(testimonial) {
  const card = document.createElement("div")
  card.className = "testimonial-card"

  const initials = testimonial.author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  card.innerHTML = `
        <div class="testimonial-header">
            <div class="testimonial-avatar">
                <img src="${testimonial.author.avatar}" alt="${testimonial.author.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <span style="display: none;">${initials}</span>
            </div>
            <div class="testimonial-author">
                <h3 class="testimonial-name">${testimonial.author.name}</h3>
                <p class="testimonial-handle">${testimonial.author.handle}</p>
            </div>
        </div>
        <p class="testimonial-text">${testimonial.text}</p>
    `

  return card
}

function populateTestimonials() {
  const track = document.getElementById("testimonialsTrack")

  // Create multiple sets for seamless scrolling
  for (let set = 0; set < 3; set++) {
    testimonials.forEach((testimonial) => {
      const card = createTestimonialCard(testimonial)
      track.appendChild(card)
    })
  }
}

// Waitlist form functionality
async function joinWaitlist(email) {
  // Basic email validation
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!isValidEmail) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    }
  }

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log("New wait-list signup:", email)

  return {
    success: true,
    message: "Welcome to the wait-list! We'll notify you when ACULESS Studios launches.",
  }
}

function showMessage(message, isSuccess) {
  const messageEl = document.getElementById("message")
  messageEl.textContent = message
  messageEl.className = `message ${isSuccess ? "success" : "error"}`
  messageEl.classList.remove("hidden")
}

function hideMessage() {
  const messageEl = document.getElementById("message")
  messageEl.classList.add("hidden")
}

function setupWaitlistForm() {
  const form = document.getElementById("waitlistForm")
  const submitBtn = document.getElementById("submitBtn")
  const emailInput = document.getElementById("email")

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const email = emailInput.value.trim()
    if (!email) return

    // Update UI to loading state
    submitBtn.disabled = true
    submitBtn.textContent = "Joining…"
    emailInput.disabled = true
    hideMessage()

    try {
      const result = await joinWaitlist(email)
      showMessage(result.message, result.success)

      if (result.success) {
        form.reset()
      }
    } catch (error) {
      showMessage("Something went wrong. Please try again.", false)
    } finally {
      // Reset UI
      submitBtn.disabled = false
      submitBtn.textContent = "Join Waitlist"
      emailInput.disabled = false
    }
  })
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize background beams
  new BeamsBackground("beamsCanvas", "strong")

  // Populate testimonials
  populateTestimonials()

  // Setup waitlist form
  setupWaitlistForm()
})
