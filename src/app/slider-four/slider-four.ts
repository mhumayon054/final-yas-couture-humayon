import { Component, EventEmitter, Input, Output, type OnInit, type OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"

interface SlideImage {
  defaultUrl: string
  hoverUrl: string
}

@Component({
  selector: "app-slider-four",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./slider-four.html",
  styleUrls: ["./slider-four.scss"],
})
export class SliderFour implements OnInit, OnDestroy {
  @Input() imagesArry: Array<string | SlideImage> = []
  @Output() valueChange = new EventEmitter<string>()
  @Output() valueChange1 = new EventEmitter<{ flag: boolean; message: string }>()

  images = [
    {
      defaultUrl: 'assets/looks/Look-1.1-scaled.jpeg.webp',
      hoverUrl: 'assets/looks/Look-1.2-600x900.jpeg.webp',
    },
    {
      defaultUrl: 'assets/looks/Look-2.1-scaled.jpeg.webp',
      hoverUrl: 'assets/looks/Look-2.2-600x900.jpeg.webp',
    },
    {
      defaultUrl: 'assets/looks/Look-3.1-scaled.jpeg.webp',
      hoverUrl: 'assets/looks/Look-3.2-600x900.jpeg.webp',
    },
    {
      defaultUrl: 'assets/looks2/Look 8.1.jpg',
      hoverUrl: 'assets/looks2/Look 8.2.jpg',
    },
    {
      defaultUrl: 'assets/looks/Look-4.1-scaled.jpeg.webp',
      hoverUrl: 'assets/looks/look-4.2-600x900.jpeg.webp',
    },
    {
      defaultUrl: 'assets/looks/Look-5.1-1-768x1152.jpeg.webp',
      hoverUrl: 'assets/looks/Look-5.2-1-768x1152.jpeg.webp',
    },
    {
      defaultUrl: 'assets/looks/Look-6.1-scaled.jpeg.webp',
      hoverUrl: 'assets/looks/Look-6.2-600x900.jpeg.webp',
    },
    {
      defaultUrl: 'assets/looks/Look-7.1-768x1152.jpeg.webp',
      hoverUrl: 'assets/looks2/Look 7.2.jpg',
    },
    {
     
      defaultUrl: 'assets/looks/Look-9.1-768x1152.jpeg.webp',
      hoverUrl: 'assets/looks/Look-9.2-600x900.jpeg',
    },
    { 
       defaultUrl: 'assets/looks/Look-10.2-600x900.jpeg.webp',
        hoverUrl: 'assets/looks2/Look 10.1.jpg',
        },
    {
       defaultUrl: 'assets/looks/Look-11.1-768x1152.jpeg.webp', 
       hoverUrl: 'assets/looks/Look-11.2-600x900.jpeg.webp',
      },
    {
      defaultUrl: 'assets/looks/Look-12.1-scaled.jpeg.webp', 
      hoverUrl: 'assets/looks/Look-12.2-600x900.jpeg.webp' ,
    },
    {
      defaultUrl: "../../assets/looks/Look-9.1-768x1152.jpeg.webp",
      hoverUrl: "../../assets/looks/Look-9.2-600x900.jpeg",
    },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733782/fallwinter3_kfb0ee.webp",
    //   hoverUrl: "https://placehold.co/800x1200?text=Hover+Preview",
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733779/fallwinter4_fsdty9.webp",
    //   hoverUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733788/Look_1.2_zhzwe1.jpg",
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733798/Look_2.1_lbvjge.jpg",
    //   hoverUrl: "../../assets/looks/Look-2.2-600x900.jpeg.webp",
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733809/Look_3.1_f6usaw.jpg",
    //   hoverUrl: "../../assets/looks/Look-3.2-600x900.jpeg.webp",
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733800/Look_4.1_cyclai.jpg",
    //   hoverUrl: "../../assets/looks/look-4.2-600x900.jpeg.webp",
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733818/Look_6.1_trwggm.jpg",
    //   hoverUrl: "../../assets/looks/Look-10.1-scaled.jpeg",
    // },
    // {
    //   defaultUrl: 'assets/looks/Look-9.1-768x1152.jpeg.webp',
    //   hoverUrl: 'assets/looks/Look-9.2-600x900.jpeg',
    // },
    // { 
    //    defaultUrl: 'assets/looks/Look-10.2-600x900.jpeg.webp',
    //     hoverUrl: 'assets/looks2/Look 10.1.jpg',
    //    },
    // {
    //    defaultUrl: 'assets/looks/Look-11.1-768x1152.jpeg.webp', 
    //    hoverUrl: 'assets/looks/Look-11.2-600x900.jpeg.webp',
    //   },
    // {
    //   defaultUrl: 'assets/looks/Look-12.1-scaled.jpeg.webp', 
    //   hoverUrl: 'assets/looks/Look-12.2-600x900.jpeg.webp' ,
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733814/Look_7.1_gijgos.jpg",
    //   hoverUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733816/Look_7.2_mtnjli.jpg",
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733807/Look_10.2_kvqz2c.jpg",
    //   hoverUrl: "../../assets/looks/Look-10.1-scaled.jpeg",
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733826/Look_12.2_kcmq9p.jpg",
    //   hoverUrl: "../../assets/looks/Look-12.1-scaled.jpeg.webp",
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733972/Look_13_o93hcp.jpg",
    //   hoverUrl: "https://placehold.co/800x1200?text=Hover+Preview",
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733788/Look_1.2_zhzwe1.jpg",
    //   hoverUrl: "https://placehold.co/800x1200?text=Hover+Preview",
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733824/Look_15_mdndyz.jpg",
    //   hoverUrl: "https://placehold.co/800x1200?text=Hover+Preview",
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733836/Look_16_yz9nyi.jpg",
    //   hoverUrl: "https://placehold.co/800x1200?text=Hover+Preview",
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733838/Look_18_mtnjli.jpg",
    //   hoverUrl: "https://placehold.co/800x1200?text=Hover+Preview",
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733776/Look_19_bagho6.jpg",
    //   hoverUrl: "https://placehold.co/800x1200?text=Hover+Preview",
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733762/Look_20_mnriki.jpg",
    //   hoverUrl: "https://placehold.co/800x1200?text=Hover+Preview",
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733778/Look_21_axtlfh.jpg",
    //   hoverUrl: "https://placehold.co/800x1200?text=Hover+Preview",
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733805/Look_22_izqgno.jpg",
    //   hoverUrl: "https://placehold.co/800x1200?text=Hover+Preview",
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733860/Look_11.2_komkyy.jpg",
    //   hoverUrl: "../../assets/Look-11.1-768x1152.jpeg.webp",
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733814/Look_23_fxawbc.jpg",
    //   hoverUrl: "https://placehold.co/800x1200?text=Hover+Preview",
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733775/Look_24_u3iecq.jpg",
    //   hoverUrl: "https://placehold.co/800x1200?text=Hover+Preview",
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733778/Look_25_ypnyy6.jpg",
    //   hoverUrl: "https://placehold.co/800x1200?text=Hover+Preview",
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733799/Look_26_s20b8i.jpg",
    //   hoverUrl: "https://placehold.co/800x1200?text=Hover+Preview",
    // },
    // {
    //   defaultUrl: "https://res.cloudinary.com/dzit141xn/image/upload/v1758733788/Look_27_exa9vm.jpg",
    //   hoverUrl: "https://placehold.co/800x1200?text=Hover+Preview",
    // },
  ]

  filteredImages: SlideImage[] = []
  currentIndex = 0
  private resizeListener: () => void = () => {}
  slidesToShow = 4

  private imagesToRemove = [6, 7, 11]

  private readonly HOVER_PLACEHOLDER = "https://placehold.co/800x1200?text=Hover+Preview"

  ngOnInit() {
    this.filteredImages = this.images.filter((_, index) => !this.imagesToRemove.includes(index))

    this.updateSlidesToShow()
    this.resizeListener = this.onResize.bind(this)
    window.addEventListener("resize", this.resizeListener)
  }

  ngOnDestroy() {
    if (this.resizeListener) {
      window.removeEventListener("resize", this.resizeListener)
    }
  }

  onResize() {
    this.updateSlidesToShow()
  }

  updateSlidesToShow() {
    const width = window.innerWidth
    if (width <= 480) this.slidesToShow = 1
    else if (width <= 768) this.slidesToShow = 2
    else if (width <= 1024) this.slidesToShow = 3
    else this.slidesToShow = 4
  }

  prepareImages() {
    const filtered = this.imagesArry.filter((_, index) => !this.imagesToRemove.includes(index))

    this.filteredImages = filtered.map((item) => {
      if (typeof item !== "string") {
        return {
          defaultUrl: item.defaultUrl,
          hoverUrl: item.hoverUrl || this.HOVER_PLACEHOLDER,
        }
      }

      if (item.includes(",")) {
        const [def, hov] = item.split(",").map((s) => s.trim())
        return {
          defaultUrl: def || this.HOVER_PLACEHOLDER,
          hoverUrl: hov || this.HOVER_PLACEHOLDER,
        }
      }

      return {
        defaultUrl: item,
        hoverUrl: this.HOVER_PLACEHOLDER,
      }
    })
  }

  buttonClicked(val: string) {
    this.valueChange1.emit({ flag: true, message: val })
  }

  sendValue(val: string) {
    console.log(val)
    this.valueChange.emit(val)
  }

  moveSlide(direction: number) {
    const totalSlides = this.filteredImages.length
    const maxIndex = totalSlides - this.slidesToShow
    if (direction === 1) {
      if (this.currentIndex >= maxIndex) {
        this.currentIndex = 0
      } else {
        this.currentIndex++
      }
    } else if (direction === -1) {
      if (this.currentIndex <= 0) {
        this.currentIndex = maxIndex
      } else {
        this.currentIndex--
      }
    }
  }

  calculateTransform(): string {
    return `translateX(-${this.currentIndex * (100 / this.slidesToShow)}%)`
  }
}
