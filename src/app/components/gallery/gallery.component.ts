import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Photo, PhotoCategory } from '../../models/photo.model';
import { PhotoService } from '../../services/photo.service';
import { PhotoCardComponent } from '../photo-card/photo-card.component';
import { FullscreenModalComponent } from '../fullscreen-modal/fullscreen-modal.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatPaginatorModule,
    PhotoCardComponent,
    FullscreenModalComponent
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
  allPhotos: Photo[] = [];
  photos: Photo[] = [];
  displayedPhotos: Photo[] = [];
  categories: PhotoCategory[] = [];
  selectedCategory: PhotoCategory | null = null;
  searchTerm: string = '';
  currentPage: number = 0;
  itemsPerPage: number = 12;
  totalPages: number = 0;

  selectedPhoto: Photo | null = null;
  showFullscreen: boolean = false;
  Math = Math;

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.categories = this.photoService.getCategories();
    this.allPhotos = this.photoService.allPhotos;
    this.photos = [...this.allPhotos];
    this.loadPhotos();
  }

  loadPhotos(): void {
    let filtered = [...this.allPhotos];

    if (this.selectedCategory) {
      filtered = filtered.filter((p: Photo) => p.category === this.selectedCategory);
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter((p: Photo) =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    this.photos = filtered;
    this.totalPages = Math.ceil(this.photos.length / this.itemsPerPage);
    this.currentPage = 0;
    this.updateDisplayedPhotos();
  }

  filterByCategory(category: PhotoCategory | null): void {
    this.selectedCategory = this.selectedCategory === category ? null : category;
    this.loadPhotos();
  }

  onSearchChange(): void {
    this.loadPhotos();
  }

  onPhotoSelected(photo: Photo): void {
    this.selectedPhoto = photo;
    this.showFullscreen = true;
  }

  closeFullscreen(): void {
    this.showFullscreen = false;
  }

  onNextPhoto(): void {
    if (this.selectedPhoto) {
      const currentIndex = this.photos.findIndex(p => p.id === this.selectedPhoto!.id);
      if (currentIndex !== -1) {
        const nextIndex = (currentIndex + 1) % this.photos.length;
        this.selectedPhoto = this.photos[nextIndex];
      }
    }
  }

  onPrevPhoto(): void {
    if (this.selectedPhoto) {
      const currentIndex = this.photos.findIndex(p => p.id === this.selectedPhoto!.id);
      if (currentIndex !== -1) {
        const prevIndex = (currentIndex - 1 + this.photos.length) % this.photos.length;
        this.selectedPhoto = this.photos[prevIndex];
      }
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.updateDisplayedPhotos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateDisplayedPhotos(): void {
    const startIdx = this.currentPage * this.itemsPerPage;
    const endIdx = startIdx + this.itemsPerPage;
    this.displayedPhotos = this.photos.slice(startIdx, endIdx);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get isFirstPage(): boolean {
    return this.currentPage === 0;
  }

  get isLastPage(): boolean {
    return this.currentPage === this.totalPages - 1;
  }
}
