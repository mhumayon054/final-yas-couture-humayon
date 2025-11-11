import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router } from "@angular/router"

@Component({
  selector: "app-summerlook",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./summerlook.html",
  styleUrls: ["./summerlook.scss"],
})
export class SummerLook {
  constructor(private router: Router) {}

  @Input() lookData: {
    name: string
    img: string
    img2?: string
    text?: string
    showSecondImage?: boolean
  }[] = []

  allPictures: any[] = []

  ngOnInit() {
    this.allPictures = []
    this.lookData.forEach((product, index) => {
      if (index !== 7 && index !== 13) {
        this.allPictures.push({
          img: product.img,
          img2: product.img2,
          name: product.name,
          text: product.text,
        })
      }
    })
  }

  showLookDetails(item: { img: string; img2?: string; name: string; text?: string }, index: number) {
    const itemToSend = {
      allpictures: this.allPictures,
      pictures: this.getImages(item),
      name: item.name,
      text: item.text || "",
    }

    console.log("[v0] Summer Look - Navigating to /summerlooksshow")

    this.router.navigate(["/summerlooksshow"], {
      state: {
        items: [itemToSend],
        fullList: this.lookData,
        startIndex: index,
      },
    })
  }

  getImages(product: { img: string; img2?: string }): string[] {
    const images = [product.img]
    if (product.img2) {
      images.push(product.img2)
    }
    return images
  }
}
