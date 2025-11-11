import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router } from "@angular/router"

@Component({
  selector: "app-winterlook",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./winterlook.html",
  styleUrls: ["./winterlook.scss"],
})
export class WinterLook {
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

    console.log("[v0] Winter Look - Navigating to /winterlooksshow")

    this.router.navigate(["/winterlooksshow"], {
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
