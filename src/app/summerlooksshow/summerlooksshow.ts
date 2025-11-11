import { Component, HostListener, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router } from "@angular/router"
import { MainPage } from "../main-page/main-page"
import { SliderFour } from "../slider-four/slider-four"
import { Footer } from "../footer/footer"
import { PageEight } from "../page-eight/page-eight"

@Component({
  selector: "app-summerlooksshow",
  standalone: true,
  imports: [CommonModule, MainPage, SliderFour, Footer],
  templateUrl: "./summerlooksshow.html",
  styleUrls: ["../looksshow/looksshow.scss"],
})
export class SummerLooksshow implements OnInit {
  item: {
    allpictures: any[]
    pictures: string[]
    name: string
    text: string
  } | null = null

  fullList: any[] = []
  startIndex = 0

  receivedImage = ""
  receivedText = ""
  currentIndex = 0
  startX = 0
  hide = false

  heroVideoUrl = "https://res.cloudinary.com/dzit141xn/video/upload/v1758738419/4_FINAL_uk46le.mp4"

  private imagesToRemove = [7, 13]
  filteredPictures: string[] = []

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation()
    const state = nav?.extras.state as {
      items?: { allpictures: string[]; pictures: string[]; name: string; text: string }[]
      fullList?: any[]
      startIndex?: number
    }

    if (state?.items && state.items.length > 0) {
      this.item = state.items[0]
      if (state.fullList) {
        this.fullList = state.fullList
      }
      this.startIndex = state.startIndex ?? 0

      if (this.item && this.item.pictures) {
        this.filteredPictures = this.item.pictures.filter((pic, index) => !this.imagesToRemove.includes(index))
      }
    }
  }

  ngOnInit() {
    if (!this.item) {
      const pageEight = new PageEight()
      this.fullList = pageEight.lookDatas

      if (this.fullList.length > 0) {
        const firstLook = this.fullList[0]
        this.item = {
          allpictures: this.fullList,
          pictures: this.getImages(firstLook),
          name: firstLook.name,
          text: firstLook.text || "",
        }
      }
    }

    if (this.item && this.item.pictures) {
      this.filteredPictures = this.item.pictures.filter((pic, index) => !this.imagesToRemove.includes(index))
    }

    this.currentIndex = 0
    this.receivedImage = ""
  }

  handleTrueClick(event: { flag: boolean; message: string }) {
    const origval = event.message || ""
    this.receivedImage = origval.split(",")[0] || ""
    this.receivedText = origval.split(",").slice(1).join(",") || ""
    this.hide = event.flag
  }

  receiveValue(value: string) {
    const origval = value || ""
    this.receivedImage = origval.split(",")[0] || ""
    this.receivedText = origval.split(",").slice(1).join(",") || ""
  }

  onSliderIndexChange(index: number) {
    if (!this.fullList || this.fullList.length === 0) {
      return
    }

    if (index < 0 || index >= this.fullList.length) return

    const newLook = this.fullList[index]
    if (!newLook) return

    const pictures = this.getImages(newLook)

    const allpictures = this.fullList
      .map((product: any, idx: number) => {
        if (this.imagesToRemove.includes(idx)) return null
        return product
      })
      .filter(Boolean) as any[]

    this.item = {
      allpictures,
      pictures,
      name: newLook.name || "",
      text: newLook.text || "",
    }

    this.filteredPictures = this.item.pictures.filter((pic, idx) => !this.imagesToRemove.includes(idx))

    this.receivedImage = ""
    this.receivedText = ""
    this.currentIndex = 0
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  resetSelectedImage() {
    this.receivedImage = ""
  }

  moveSlide(direction: number) {
    if (!this.filteredPictures || !this.filteredPictures.length) return
    const total = this.filteredPictures.length
    this.currentIndex = (this.currentIndex + direction + total) % total
  }

  moveNext(id: string) {
    this.router.navigate([id])
  }

  @HostListener("touchstart", ["$event"])
  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX
  }

  @HostListener("touchend", ["$event"])
  onTouchEnd(event: TouchEvent) {
    const delta = event.changedTouches[0].clientX - this.startX
    if (delta < -50) this.moveSlide(1)
    else if (delta > 50) this.moveSlide(-1)
  }

  zoomIn(event: MouseEvent) {
    const img = (event.currentTarget as HTMLElement).querySelector("img")
    if (img) {
      img.style.transform = `scale(1.8)`
    }
  }

  zoomMove(event: MouseEvent) {
    const wrapper = event.currentTarget as HTMLElement
    const img = wrapper.querySelector("img")
    if (!img) return

    const rect = wrapper.getBoundingClientRect()
    const offsetX = event.clientX - rect.left
    const offsetY = event.clientY - rect.top

    const percentX = (offsetX / rect.width) * 100
    const percentY = (offsetY / rect.height) * 100

    img.style.transformOrigin = `${percentX}% ${percentY}%`
  }

  zoomOut(event: MouseEvent) {
    const img = (event.currentTarget as HTMLElement).querySelector("img")
    if (img) {
      img.style.transform = "scale(1)"
    }
  }

  getImages(product: { img: string; img2?: string }): string[] {
    const images = [product.img]
    if (product.img2) {
      images.push(product.img2)
    }
    return images
  }
}
