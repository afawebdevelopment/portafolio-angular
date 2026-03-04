import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoService } from './services/photo.service';
import { Photo, PhotoCategory } from './models/photo.model';

interface ServiceInfo {
  category: PhotoCategory;
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  photos: Photo[] = [];
  filteredPhotos: Photo[] = [];
  selectedCategory: PhotoCategory | null = null;
  selectedPhoto: Photo | null = null;
  currentPhotoIndex: number = 0;
  isZoomed: boolean = false;
  darkMode: boolean = true;
  categories = Object.values(PhotoCategory);

  services: ServiceInfo[] = [
    {
      category: PhotoCategory.RETRATOS,
      title: 'Retratos',
      description: 'Fotografía profesional de personas con luz y composición perfectas.'
    },
    {
      category: PhotoCategory.PAISAJES,
      title: 'Paisajes',
      description: 'Captura de paisajes naturales con colores y perspectivas impresionantes.'
    },
    {
      category: PhotoCategory.EVENTOS,
      title: 'Eventos',
      description: 'Cobertura completa de tu evento especial con momentos únicos.'
    },
    {
      category: PhotoCategory.BODAS,
      title: 'Bodas',
      description: 'Historias de amor capturadas con elegancia y profesionalismo.'
    },
    {
      category: PhotoCategory.NATURALEZA,
      title: 'Naturaleza',
      description: 'Detalles fascinantes de la flora y fauna en su estado natural.'
    },
    {
      category: PhotoCategory.ARQUITECTURA,
      title: 'Arquitectura',
      description: 'Fotografía de estructuras y diseños arquitectónicos contemporáneos.'
    }
  ];

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.photos = this.photoService.allPhotos;
    this.filteredPhotos = this.photos;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.darkMode = false;
    }
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
  }

  filterByCategory(category: PhotoCategory | null): void {
    this.selectedCategory = category;
    if (category === null) {
      this.filteredPhotos = this.photos;
    } else {
      this.filteredPhotos = this.photos.filter(photo => photo.category === category);
    }
  }

  openPhoto(photo: Photo): void {
    this.selectedPhoto = photo;
    this.currentPhotoIndex = this.filteredPhotos.findIndex(p => p.id === photo.id);
  }

  closePhoto(): void {
    this.selectedPhoto = null;
    this.isZoomed = false;
  }

  toggleZoom(): void {
    this.isZoomed = !this.isZoomed;
  }

  nextPhoto(): void {
    if (this.currentPhotoIndex < this.filteredPhotos.length - 1) {
      this.currentPhotoIndex++;
      this.selectedPhoto = this.filteredPhotos[this.currentPhotoIndex];
      this.isZoomed = false;
    }
  }

  previousPhoto(): void {
    if (this.currentPhotoIndex > 0) {
      this.currentPhotoIndex--;
      this.selectedPhoto = this.filteredPhotos[this.currentPhotoIndex];
      this.isZoomed = false;
    }
  }
}
