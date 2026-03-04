export interface Photo {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  category: PhotoCategory;
  tags: string[];
  date: Date;
}

export enum PhotoCategory {
  RETRATOS = 'Retratos',
  PAISAJES = 'Paisajes',
  NATURALEZA = 'Naturaleza',
  URBANO = 'Urbano',
  EVENTOS = 'Eventos',
  MACRO = 'Macro',
  ARQUITECTURA = 'Arquitectura',
  BODAS = 'Bodas'
}

export interface GalleryFilter {
  category?: PhotoCategory;
  searchTerm?: string;
  tags?: string[];
}
