import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  PropertyDetail,
  PropertyDetailData,
  PropertyImage,
} from './property-detail/property-detail';
import {
  PropertyFilters,
  PropertyFilterSelection,
  PropertyOperation,
  PropertyType,
} from './property-filters/property-filters';

type GalleryPosition = 'previous' | 'active' | 'next' | 'hidden';

interface GalleryItem extends PropertyDetailData {
  id: string;
  operation: PropertyOperation;
  propertyType: PropertyType;
}

const propertyImages: PropertyImage[] = [
  { src: '/Images/properties/Propiedad1/4.webp', alt: 'Interior de departamento amueblado con sala, comedor, cocina con barra y acabados contemporáneos' },
  { src: '/Images/properties/Prueba1.webp', alt: 'Escalera interior con iluminación cálida' },
  { src: '/Images/properties/Prueba2.webp', alt: 'Interior minimalista con detalles decorativos' },
  { src: '/Images/properties/Prueba3.webp', alt: 'Área social y arquitectura de la propiedad' },
  { src: '/Images/properties/Prueba4.webp', alt: 'Fachada y detalle urbano de la propiedad' },
];

const propertyOneImages: PropertyImage[] = [
  { src: '/Images/properties/Propiedad1/4.webp', alt: 'Sala-comedor amueblada con ventanales hacia el patio interior' },
  { src: '/Images/properties/Propiedad1/1.webp', alt: 'Sala con sillón beige junto a un ventanal y patio interior verde' },
  { src: '/Images/properties/Propiedad1/2.webp', alt: 'Cocina con barra y comedor amueblado' },
  { src: '/Images/properties/Propiedad1/3.webp', alt: 'Vista amplia de la sala, el comedor y la cocina con barra' },
  { src: '/Images/properties/Propiedad1/5.webp', alt: 'Recámara con clóset de puertas corredizas y aire acondicionado' },
  { src: '/Images/properties/Propiedad1/6.webp', alt: 'Recámara con muro de acabado aparente y escritorio flotante' },
  { src: '/Images/properties/Propiedad1/7.webp', alt: 'Baño con lavabo sobre cubierta y espejo iluminado' },
  { src: '/Images/properties/Propiedad1/8.webp', alt: 'Recámara amueblada con baño integrado y aire acondicionado' },
  { src: '/Images/properties/Propiedad1/9.webp', alt: 'Patio interior con muro verde, barandal de cristal y ventanales' },
  { src: '/Images/properties/Propiedad1/10.webp', alt: 'Baño con lavabo y espejo iluminado visto desde otro ángulo' },
  { src: '/Images/properties/Propiedad1/11.webp', alt: 'Comedor y cocina con barra en un espacio abierto' },
];

function imagesStartingWith(src: string): PropertyImage[] {
  const coverImage = propertyImages.find((image) => image.src === src);

  if (!coverImage) {
    return propertyImages;
  }

  return [coverImage, ...propertyImages.filter((image) => image !== coverImage)];
}

@Component({
  selector: 'app-properties',
  imports: [PropertyDetail, PropertyFilters, RouterLink],
  templateUrl: './properties.html',
  styleUrl: './properties.scss',
})
export class Properties {
  readonly galleryItems: GalleryItem[] = [
    {
      id: 'departamento-contemporaneo-amueblado',
      operation: 'renta',
      propertyType: 'departamento',
      category: 'Departamento amueblado',
      title: 'Departamento amueblado con diseño contemporáneo',
      description: 'Departamento amueblado con espacios modernos, una distribución funcional y un agradable patio interior que aporta iluminación natural.',
      imageClass: 'property-image--merida',
      imageAlt:   'Interior de departamento amueblado con sala, comedor, cocina con barra y acabados contemporáneos',
      location: 'Mérida, Yucatán',
      fullDescription: `
      Vive con comodidad y estilo en este departamento amueblado, diseñado para aprovechar cada espacio y ofrecer un ambiente moderno y acogedor.
      Cuenta con sala, comedor, cocina con barra, una recámara con aire
      acondicionado y clóset, baño con acabados contemporáneos y un patio interior que aporta luz natural y una agradable sensación de amplitud.
      Ideal para una persona o pareja que busca un hogar práctico, elegante y listo para habitar en Mérida.`,
      features: ['Departamento amueblado', 'Una recámara', 'Un baño', 'Sala y comedor', 'Cocina con barra', 'Clóset',
      'Aire acondicionado', 'Ventilador de techo', 'Patio interior', 'Ventanales de piso a techo', 'Iluminación empotrada',
      'Acabados contemporáneos',],
      images: propertyOneImages,
    },
    {
      id: 'calidez-caracter',
      operation: 'renta',
      propertyType: 'casa',
      category: 'Interior',
      title: 'Calidez y carácter',
      description: 'Espacios con materiales naturales y una atmósfera serena.',
      imageClass: 'property-image--warm',
      imageAlt: 'Interior cálido con escaleras y detalles arquitectónicos',
      location: 'Temozón Norte, Mérida',
      fullDescription:
        'Una propiedad de carácter sereno que combina acabados cálidos, iluminación natural y áreas diseñadas para convivir. La distribución prioriza comodidad, privacidad y una experiencia residencial refinada.',
      features: ['4 recámaras', '4 baños', 'Terraza', 'Cuarto de servicio', 'Área familiar', 'Cochera techada'],
      images: imagesStartingWith('/Images/properties/Prueba1.webp'),
    },
    {
      id: 'detalles-permanecen',
      operation: 'venta',
      propertyType: 'oficina',
      category: 'Diseño',
      title: 'Detalles que permanecen',
      description: 'Una composición limpia para destacar la identidad de cada inmueble.',
      imageClass: 'property-image--interior',
      imageAlt: 'Interior minimalista con nichos decorativos y vegetación',
      location: 'Cholul, Mérida',
      fullDescription:
        'Arquitectura limpia y funcional con detalles que aportan personalidad sin perder serenidad. Cada ambiente fue pensado para ofrecer amplitud visual, circulación natural y una relación equilibrada con el entorno.',
      features: ['3 recámaras', '3 baños', 'Sala a doble altura', 'Jardín', 'Bodega', 'Estacionamiento'],
      images: imagesStartingWith('/Images/properties/Prueba2.webp'),
    },
    {
      id: 'departamento-amueblado',
      operation: 'renta',
      propertyType: 'departamento',
      category: 'Departamento',
      title: 'Detalles que permanecen',
      description: 'Departamento amueblado, con toques frescos y de confort para vivir',
      imageClass: 'property-image--departamento',
      imageAlt: 'Departamento amueblado con espacios frescos y confortables',
      location: 'Zona norte, Mérida',
      fullDescription:
        'Un departamento amueblado pensado para disfrutar una vida práctica y confortable. La propuesta combina ambientes frescos, acabados contemporáneos y espacios funcionales para vivir o invertir en Mérida.',
      features: ['2 recámaras', '2 baños', 'Amueblado', 'Área social', 'Cocina equipada', 'Estacionamiento'],
      images: imagesStartingWith('/Images/properties/Prueba4.webp'),
    },
  ];

  filteredGalleryItems: GalleryItem[] = this.galleryItems;
  activeIndex = 0;
  selectedProperty: GalleryItem | null = null;

  applyFilters(selection: PropertyFilterSelection): void {
    this.filteredGalleryItems = this.galleryItems.filter((property) => {
      const matchesOperation =
        selection.operation === null || property.operation === selection.operation;
      const matchesPropertyType =
        selection.propertyTypes.length === 0 ||
        selection.propertyTypes.includes(property.propertyType);

      return matchesOperation && matchesPropertyType;
    });

    this.activeIndex = 0;
    this.selectedProperty = null;
  }

  openProperty(property: GalleryItem): void {
    this.selectedProperty = property;
  }

  closeProperty(): void {
    this.selectedProperty = null;
  }

  showPrevious(): void {
    if (this.filteredGalleryItems.length === 0) {
      return;
    }

    this.activeIndex =
      (this.activeIndex - 1 + this.filteredGalleryItems.length) %
      this.filteredGalleryItems.length;
  }

  showNext(): void {
    if (this.filteredGalleryItems.length === 0) {
      return;
    }

    this.activeIndex = (this.activeIndex + 1) % this.filteredGalleryItems.length;
  }

  positionFor(index: number): GalleryPosition {
    const relativePosition =
      (index - this.activeIndex + this.filteredGalleryItems.length) %
      this.filteredGalleryItems.length;

    if (relativePosition === 0) {
      return 'active';
    }

    if (relativePosition === 1) {
      return 'next';
    }

    return relativePosition === this.filteredGalleryItems.length - 1 ? 'previous' : 'hidden';
  }
}
