import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Photo } from '../../models/photo.model';

@Component({
  selector: 'app-photo-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-card.component.html',
  styleUrl: './photo-card.component.css'
})
export class PhotoCardComponent {
  @Input() photo!: Photo;
  @Output() photoClicked = new EventEmitter<Photo>();

  onCardClick(): void {
    this.photoClicked.emit(this.photo);
  }
}
