import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Photo, PhotoCategory, GalleryFilter } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private photos: Photo[] = [];
  private filteredPhotos$ = new BehaviorSubject<Photo[]>([]);
  private currentFilter$ = new BehaviorSubject<GalleryFilter>({});
  private categories = Object.values(PhotoCategory);

  constructor() {
    this.loadPhotos();
  }

  /**
   * Carga las fotos disponibles
   * En un proyecto real, esto vendría de un backend
   */
  private loadPhotos(): void {
    // Generar 100 fotos automáticamente
    this.photos = [];
    
    const categoriesArray = Object.values(PhotoCategory);
    
    for (let i = 1; i <= 100; i++) {
      const categoryIndex = (i - 1) % categoriesArray.length;
      const category = categoriesArray[categoryIndex];
      
      this.photos.push({
        id: i,
        title: `Fotografía ${i}`,
        description: `Descripción de la fotografía ${i}`,
        imageUrl: `assets/images/photo-${((i - 1) % 10) + 1}.jpg`,
        thumbnailUrl: `assets/images/photo-${((i - 1) % 10) + 1}.jpg`,
        category: category,
        tags: [`foto-${i}`, 'portafolio'],
        date: new Date(2024, 0, 1 + i)
      });
    }

    this.filteredPhotos$.next(this.photos);
  }

  /**
   * Obtiene todas las fotos
   */
  getPhotos(): Observable<Photo[]> {
    return this.filteredPhotos$.asObservable();
  }

  /**
   * Obtiene las fotos filtradas
   */
  getFilteredPhotos(filter: GalleryFilter): Observable<Photo[]> {
    this.currentFilter$.next(filter);
    let filtered = this.photos;

    if (filter.category) {
      filtered = filtered.filter(p => p.category === filter.category);
    }

    if (filter.searchTerm) {
      const term = filter.searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    if (filter.tags && filter.tags.length > 0) {
      filtered = filtered.filter(p =>
        filter.tags!.some(tag => p.tags.includes(tag))
      );
    }

    this.filteredPhotos$.next(filtered);
    return this.filteredPhotos$.asObservable();
  }

  /**
   * Obtiene una foto por ID
   */
  getPhotoById(id: number): Photo | undefined {
    return this.photos.find(p => p.id === id);
  }

  /**
   * Obtiene todas las categorías
   */
  getCategories(): PhotoCategory[] {
    return this.categories;
  }

  /**
   * Obtiene todas las etiquetas únicas
   */
  getAllTags(): string[] {
    const tags = new Set<string>();
    this.photos.forEach(p => p.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }

  /**
   * Obtiene fotos por categoría
   */
  getPhotosByCategory(category: PhotoCategory): Photo[] {
    return this.photos.filter(p => p.category === category);
  }

  /**
   * Obtiene la siguiente foto
   */
  getNextPhoto(currentId: number): Photo | undefined {
    const currentIndex = this.photos.findIndex(p => p.id === currentId);
    if (currentIndex === -1) return undefined;
    return this.photos[(currentIndex + 1) % this.photos.length];
  }

  /**
   * Obtiene la foto anterior
   */
  getPreviousPhoto(currentId: number): Photo | undefined {
    const currentIndex = this.photos.findIndex(p => p.id === currentId);
    if (currentIndex === -1) return undefined;
    return this.photos[(currentIndex - 1 + this.photos.length) % this.photos.length];
  }

  /**
   * Getter para acceder a todas las fotos
   */
  get allPhotos(): Photo[] {
    return this.photos;
  }
}
