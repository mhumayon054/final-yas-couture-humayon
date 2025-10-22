// import { Component, HostListener, Input, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { MainPage } from "../main-page/main-page";
// import { SliderFour } from "../slider-four/slider-four";
// import { Footer } from "../footer/footer";

// @Component({
//   selector: 'app-looksshow',
//   standalone: true,
//   imports: [CommonModule, MainPage, SliderFour, Footer],
//   templateUrl: './looksshow.html',
//   styleUrls: ['./looksshow.scss'],
// })
// export class Looksshow implements OnInit {
//   @Input() item: { allpictures: string[]; pictures: string[]; name: string; text: string } | null = null;

//   receivedImage: string = '';
//   receivedText: string = '';
//   currentIndex = 0;
//   startX = 0;
//   hide: boolean = false;
  
//   // Jin indexes ki images remove karni hain
//   private imagesToRemove = [7, 13];
//   filteredPictures: string[] = [];

//   constructor(private router: Router) {
//     const nav = this.router.getCurrentNavigation();
//     const state = nav?.extras.state as {
//       items?: { allpictures: string[]; pictures: string[]; name: string; text: string }[];
//     };

//     if (state?.items && state.items.length > 0) {
//       this.item = state.items[0];
//       // Pictures array se bhi indexes remove karein
//       if (this.item && this.item.pictures) {
//         this.filteredPictures = this.item.pictures.filter((pic, index) => 
//           !this.imagesToRemove.includes(index)
//         );
//       }
//       console.log(this.item);
//     }
//   }

//   ngOnInit() {
//     // Agar navigation se data nahi aaya to bhi filter karein
//     if (this.item && this.item.pictures) {
//       this.filteredPictures = this.item.pictures.filter((pic, index) => 
//         !this.imagesToRemove.includes(index)
//       );
//     }
//   }

//   handleTrueClick(event: { flag: boolean; message: string }) {
//     debugger;
//     var origval = event.message;
//     this.receivedImage = origval.split(',')[0];
//     this.receivedText = origval.split(',')[1];
//     this.hide = event.flag;
//   }
 
//   receiveValue(value: string) {
//     var origval = value;
//     this.receivedImage = origval.split(',')[0];
//     this.receivedText = value.split(',')[1];
//   }

//   resetSelectedImage() {
//     this.receivedImage = '';
//   }

//   moveSlide(direction: number) {
//     if (!this.filteredPictures || !this.filteredPictures.length) return;
//     const total = this.filteredPictures.length;
//     this.currentIndex = (this.currentIndex + direction + total) % total;
//   }

//   moveNext(id: string) {
//     this.router.navigate([id]);
//   }

//   @HostListener('touchstart', ['$event'])
//   onTouchStart(event: TouchEvent) {
//     this.startX = event.touches[0].clientX;
//   }

//   @HostListener('touchend', ['$event'])
//   onTouchEnd(event: TouchEvent) {
//     const delta = event.changedTouches[0].clientX - this.startX;
//     if (delta < -50) this.moveSlide(1);
//     else if (delta > 50) this.moveSlide(-1);
//   }

//   zoomIn(event: MouseEvent) {
//     const img = (event.currentTarget as HTMLElement).querySelector('img');
//     if (img) {
//       img.style.transform = `scale(1.8)`;
//     }
//   }

//   zoomMove(event: MouseEvent) {
//     const wrapper = event.currentTarget as HTMLElement;
//     const img = wrapper.querySelector('img');
//     if (!img) return;

//     const rect = wrapper.getBoundingClientRect();
//     const offsetX = event.clientX - rect.left;
//     const offsetY = event.clientY - rect.top;

//     const percentX = (offsetX / rect.width) * 100;
//     const percentY = (offsetY / rect.height) * 100;

//     img.style.transformOrigin = `${percentX}% ${percentY}%`;
//   }

//   zoomOut(event: MouseEvent) {
//     const img = (event.currentTarget as HTMLElement).querySelector('img');
//     if (img) {
//       img.style.transform = 'scale(1)';
//     }
//   }
// }


import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MainPage } from '../main-page/main-page';
import { SliderFour } from '../slider-four/slider-four';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-looksshow',
  standalone: true,
  imports: [CommonModule, MainPage, SliderFour, Footer],
  templateUrl: './looksshow.html',
  styleUrls: ['./looksshow.scss'],
})
export class Looksshow implements OnInit {
  @Input() item:
    | { allpictures: string[]; pictures: string[]; name: string; text: string }
    | null = null;

  fullList: any[] = [];
  startIndex = 0;

  receivedImage: string = '';
  receivedText: string = '';
  currentIndex = 0;
  startX = 0;
  hide: boolean = false;

  private imagesToRemove = [7, 13];
  filteredPictures: string[] = [];

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as {
      items?: { allpictures: string[]; pictures: string[]; name: string; text: string }[];
      fullList?: any[];
      startIndex?: number;
    };

    if (state?.items && state.items.length > 0) {
      this.item = state.items[0];
      if (state.fullList) {
        this.fullList = state.fullList;
      }
      this.startIndex = state.startIndex ?? 0;

      if (this.item && this.item.pictures) {
        this.filteredPictures = this.item.pictures.filter(
          (pic, index) => !this.imagesToRemove.includes(index)
        );
      }
    }
  }

  ngOnInit() {
    if (this.item && this.item.pictures) {
      this.filteredPictures = this.item.pictures.filter(
        (pic, index) => !this.imagesToRemove.includes(index)
      );
    }

    this.currentIndex = 0;
    this.receivedImage = '';
  }

  handleTrueClick(event: { flag: boolean; message: string }) {
    const origval = event.message || '';
    this.receivedImage = origval.split(',')[0] || '';
    this.receivedText = origval.split(',').slice(1).join(',') || '';
    this.hide = event.flag;
  }

  receiveValue(value: string) {
    const origval = value || '';
    this.receivedImage = origval.split(',')[0] || '';
    this.receivedText = origval.split(',').slice(1).join(',') || '';
  }

  onSliderIndexChange(index: number) {
    if (!this.fullList || this.fullList.length === 0) {
      return;
    }

    if (index < 0 || index >= this.fullList.length) return;

    const newLook = this.fullList[index];
    if (!newLook) return;

    const pictures = this.getImages(newLook);
    
    const allpictures = this.fullList.map((product: any, idx: number) => {
      if (this.imagesToRemove.includes(idx)) return null;
      return product;
    }).filter(Boolean) as any[];

    this.item = {
      allpictures, 
      pictures,
      name: newLook.name || '',
      text: newLook.text || '',
    };

    this.filteredPictures = this.item.pictures.filter(
      (pic, idx) => !this.imagesToRemove.includes(idx)
    );

    this.receivedImage = '';
    this.receivedText = '';
    this.currentIndex = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  resetSelectedImage() {
    this.receivedImage = '';
  }

  moveSlide(direction: number) {
    if (!this.filteredPictures || !this.filteredPictures.length) return;
    const total = this.filteredPictures.length;
    this.currentIndex = (this.currentIndex + direction + total) % total;
  }

  moveNext(id: string) {
    this.router.navigate([id]);
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    const delta = event.changedTouches[0].clientX - this.startX;
    if (delta < -50) this.moveSlide(1);
    else if (delta > 50) this.moveSlide(-1);
  }

  zoomIn(event: MouseEvent) {
    const img = (event.currentTarget as HTMLElement).querySelector('img');
    if (img) {
      img.style.transform = `scale(1.8)`;
    }
  }

  zoomMove(event: MouseEvent) {
    const wrapper = event.currentTarget as HTMLElement;
    const img = wrapper.querySelector('img');
    if (!img) return;

    const rect = wrapper.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const percentX = (offsetX / rect.width) * 100;
    const percentY = (offsetY / rect.height) * 100;

    img.style.transformOrigin = `${percentX}% ${percentY}%`;
  }

  zoomOut(event: MouseEvent) {
    const img = (event.currentTarget as HTMLElement).querySelector('img');
    if (img) {
      img.style.transform = 'scale(1)';
    }
  }

  getImages(product: { img: string; img2?: string }): string[] {
    const images = [product.img];
    if (product.img2) {
      images.push(product.img2);
    }
    return images;
  }
}