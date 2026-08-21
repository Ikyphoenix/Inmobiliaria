import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';

export interface PropertyImage {
  src: string;
  alt: string;
}

export interface PropertyDetailData {
  category: string;
  title: string;
  description: string;
  imageClass: string;
  imageAlt: string;
  location: string;
  fullDescription: string;
  features: string[];
  images: PropertyImage[];
}

@Component({
  selector: 'app-property-detail',
  imports: [],
  templateUrl: './property-detail.html',
  styleUrl: './property-detail.scss',
})
export class PropertyDetail {
  @Input({ required: true }) property!: PropertyDetailData;
  @Output() readonly closeRequested = new EventEmitter<void>();
  @ViewChildren('thumbnailButton') private thumbnailButtons!: QueryList<
    ElementRef<HTMLButtonElement>
  >;

  currentImageIndex = 0;
  zoomLevel = 1;
  panX = 0;
  panY = 0;
  isDragging = false;

  private readonly maximumZoom = 4;
  private readonly zoomStep = 0.5;
  private dragStartX = 0;
  private dragStartY = 0;
  private panStartX = 0;
  private panStartY = 0;

  get activeImage(): PropertyImage {
    return this.property.images[this.currentImageIndex];
  }

  get imageTransform(): string {
    return `translate3d(${this.panX}px, ${this.panY}px, 0) scale(${this.zoomLevel})`;
  }

  get zoomPercentage(): number {
    return Math.round(this.zoomLevel * 100);
  }

  selectImage(index: number): void {
    this.currentImageIndex = index;
    this.resetZoom();
    this.centerActiveThumbnail();
  }

  showPreviousImage(): void {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.property.images.length) % this.property.images.length;
    this.resetZoom();
    this.centerActiveThumbnail();
  }

  showNextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.property.images.length;
    this.resetZoom();
    this.centerActiveThumbnail();
  }

  zoomIn(): void {
    this.setZoom(this.zoomLevel + this.zoomStep);
  }

  zoomOut(): void {
    this.setZoom(this.zoomLevel - this.zoomStep);
  }

  toggleZoom(): void {
    if (this.zoomLevel > 1) {
      this.resetZoom();
      return;
    }

    this.setZoom(2);
  }

  resetZoom(): void {
    this.zoomLevel = 1;
    this.panX = 0;
    this.panY = 0;
    this.isDragging = false;
  }

  handleWheel(event: WheelEvent): void {
    event.preventDefault();
    this.setZoom(this.zoomLevel + (event.deltaY < 0 ? this.zoomStep : -this.zoomStep));
  }

  startPan(event: PointerEvent): void {
    if (this.zoomLevel <= 1 || (event.pointerType === 'mouse' && event.button !== 0)) {
      return;
    }

    const image = event.currentTarget as HTMLElement;
    image.setPointerCapture(event.pointerId);
    this.isDragging = true;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.panStartX = this.panX;
    this.panStartY = this.panY;
    event.preventDefault();
  }

  movePan(event: PointerEvent): void {
    if (!this.isDragging) {
      return;
    }

    const image = event.currentTarget as HTMLElement;
    const maximumX = (image.clientWidth * (this.zoomLevel - 1)) / 2;
    const maximumY = (image.clientHeight * (this.zoomLevel - 1)) / 2;

    this.panX = this.clamp(this.panStartX + event.clientX - this.dragStartX, -maximumX, maximumX);
    this.panY = this.clamp(this.panStartY + event.clientY - this.dragStartY, -maximumY, maximumY);
  }

  endPan(event: PointerEvent): void {
    const image = event.currentTarget as HTMLElement;

    if (image.hasPointerCapture(event.pointerId)) {
      image.releasePointerCapture(event.pointerId);
    }

    this.isDragging = false;
  }

  requestClose(): void {
    this.closeRequested.emit();
  }

  @HostListener('document:keydown.escape')
  closeWithEscape(): void {
    this.requestClose();
  }

  private setZoom(nextZoom: number): void {
    const previousZoom = this.zoomLevel;
    const boundedZoom = this.clamp(nextZoom, 1, this.maximumZoom);

    if (boundedZoom === 1) {
      this.resetZoom();
      return;
    }

    if (boundedZoom < previousZoom && previousZoom > 1) {
      const panRatio = (boundedZoom - 1) / (previousZoom - 1);
      this.panX *= panRatio;
      this.panY *= panRatio;
    }

    this.zoomLevel = boundedZoom;
  }

  private clamp(value: number, minimum: number, maximum: number): number {
    return Math.min(Math.max(value, minimum), maximum);
  }

  private centerActiveThumbnail(): void {
    queueMicrotask(() => {
      this.thumbnailButtons
        .get(this.currentImageIndex)
        ?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  }
}
