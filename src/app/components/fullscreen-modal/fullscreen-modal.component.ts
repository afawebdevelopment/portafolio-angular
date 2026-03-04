import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Photo } from '../../models/photo.model';

@Component({
  selector: 'app-fullscreen-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fullscreen-modal.component.html',
  styleUrl: './fullscreen-modal.component.css'
})
export class FullscreenModalComponent {
  @Input() photo!: Photo;
  @Output() close = new EventEmitter<void>();
  @Output() nextPhoto = new EventEmitter<void>();
  @Output() prevPhoto = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeModal();
  }

  @HostListener('document:keydown.arrowright')
  onArrowRight(): void {
    this.next();
  }

  @HostListener('document:keydown.arrowleft')
  onArrowLeft(): void {
    this.prev();
  }

  closeModal(): void {
    this.close.emit();
  }

  next(): void {
    this.nextPhoto.emit();
  }

  prev(): void {
    this.prevPhoto.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}
