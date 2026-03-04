import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  title: string;
  description: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  services: Service[] = [
    {
      title: 'Fotografía de Naturaleza',
      description: 'Captura de paisajes, flora, fauna y momentos naturales en su máxima expresión.'
    },
    {
      title: 'Sesiones Personalizadas',
      description: 'Experiencias fotográficas únicas adaptadas a tus intereses y estilo.'
    },
    {
      title: 'Impresiones de Galería',
      description: 'Fotografías editadas profesionalmente, lista para decorar tu espacio.'
    },
    {
      title: 'Archivos Digitales',
      description: 'Entrega de archivos en alta resolución para uso personal y comercial.'
    }
  ];
}
