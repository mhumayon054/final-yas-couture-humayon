import { Component, type ElementRef, Input, ViewChild } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  standalone: true,
  selector: "app-silder",
  imports: [CommonModule],
  templateUrl: "./silder.html",
  styleUrl: "./silder.scss",
})
export class Silder {
  @Input() images: string[] = []

  activeIndex = 1

  private dragStartX: number | null = null
  private dragStartY: number | null = null
  private dragDeltaX = 0
  private isDragging = false

  @ViewChild("sliderTrack", { static: true }) sliderTrack!: ElementRef<HTMLDivElement>

  prevSlide() {
    this.activeIndex = (this.activeIndex - 1 + this.images.length) % this.images.length
  }

  nextSlide() {
    this.activeIndex = (this.activeIndex + 1) % this.images.length
  }

  getSlideStyle(i: number) {
    const total = this.images.length
    let offset = i - this.activeIndex
    if (offset > total / 2) offset -= total
    if (offset < -total / 2) offset += total

    let extraTransform = ""
    if (this.isDragging && offset === 0) {
      extraTransform = ` translateX(${this.dragDeltaX}px)`
    }
    if (this.isDragging && Math.abs(offset) === 1) {
      extraTransform = ` translateX(${this.dragDeltaX * 0.7}px)`
    }

    const sideShift = 46 // percent

    // Center slide
    if (offset === 0) {
      return {
        transform: `translateX(-50%) scale(1)${extraTransform}`,
        opacity: 1,
        zIndex: 3,
        left: "50%",
        transition: this.isDragging ? "none" : undefined,
      }
    }

    // Left/Right side slides
    if (offset === -1 || offset === 1) {
      return {
        transform: `translateX(calc(-50% + ${offset * sideShift}%)) scale(0.85)${extraTransform}`,
        opacity: 1,
        zIndex: 2,
        left: "50%",
        transition: this.isDragging ? "none" : undefined,
      }
    }

    // Baqi slides hidden (opacity 0) magar positioning consistent rakhein
    return {
      transform: `translateX(calc(-50% + ${offset * sideShift}%)) scale(0.8)`,
      opacity: 0,
      zIndex: 1,
      left: "50%",
      pointerEvents: "none",
    }
  }

  getSideClass(i: number): string {
    const total = this.images.length
    let offset = i - this.activeIndex
    if (offset > total / 2) offset -= total
    if (offset < -total / 2) offset += total

    if (offset === 0) return "center"
    if (Math.abs(offset) === 1) return "side"
    return ""
  }

  onDragStart(event: MouseEvent | TouchEvent) {
    // Pehle check karo agar vertical scroll ho raha hai to preventDefault na karo
    this.dragStartX = this.getPointerX(event)
    this.dragStartY = this.getPointerY(event)
    
    // Sirf horizontal drag ke liye hi preventDefault karo
    if (Math.abs(this.dragStartX - this.getPointerX(event)) > 5) {
      this.isDragging = true
      event.preventDefault()
    } else {
      this.isDragging = false
    }
    
    this.dragDeltaX = 0
  }

  onDragMove(event: MouseEvent | TouchEvent) {
    if (!this.isDragging || this.dragStartX === null || this.dragStartY === null) return

    const currentX = this.getPointerX(event)
    const currentY = this.getPointerY(event)

    const deltaX = currentX - this.dragStartX
    const deltaY = currentY - this.dragStartY

    // Sirf horizontal movement significant ho to hi drag consider karo
    if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(deltaY)) {
      this.dragDeltaX = deltaX
    } else {
      // Agar vertical movement zyada hai to drag cancel karo
      this.isDragging = false
    }
  }

  onDragEnd(event: MouseEvent | TouchEvent) {
    if (!this.isDragging || this.dragStartX === null) return
    const threshold = 60

    if (this.dragDeltaX < -threshold) {
      this.nextSlide()
    } else if (this.dragDeltaX > threshold) {
      this.prevSlide()
    }

    this.isDragging = false
    this.dragStartX = null
    this.dragStartY = null
    this.dragDeltaX = 0
  }

  getPointerX(event: MouseEvent | TouchEvent): number {
    if (event instanceof TouchEvent) {
      return event.touches[0]?.clientX ?? event.changedTouches[0]?.clientX ?? 0
    }
    return event.clientX
  }

  getPointerY(event: MouseEvent | TouchEvent): number {
    if (event instanceof TouchEvent) {
      return event.touches[0]?.clientY ?? event.changedTouches[0]?.clientY ?? 0
    }
    return event.clientY
  }

  // YEH NAYA METHOD ADD KARO - Touch events ko better handle karne ke liye
  onTouchStart(event: TouchEvent) {
    // Sirf single touch allow karo, multi-touch ko ignore karo
    if (event.touches.length === 1) {
      this.onDragStart(event)
    }
  }

  onTouchMove(event: TouchEvent) {
    if (event.touches.length === 1) {
      this.onDragMove(event)
    }
  }

  onTouchEnd(event: TouchEvent) {
    this.onDragEnd(event)
  }
}