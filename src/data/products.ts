import type { Product } from '../types';
import tortaMama from '../assets/images/torta-flores-mama.jpg';
import tortaBautizo from '../assets/images/torta-bautizo.jpg';
import tortaNovios from '../assets/images/torta-novios.jpg';
import tortaTematica from '../assets/images/torta-futbol.jpg';
import pieManzana from '../assets/images/kuchen-manzana.jpg';
import galletas from '../assets/images/galletas-navidad.jpg';
import cupcakes from '../assets/images/cupcakes.jpg';
import kuchengriego from '../assets/images/kuchengriego.jpeg';
import cheesecake from '../assets/images/cheesecake.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Torta Flores de Buttercream',
    category: 'Tortas',
    description:
      'Bizcocho de vainilla relleno de crema, decorado a mano con flores de buttercream y ramas doradas. Ideal para cumpleaños, día de la madre o cualquier celebración especial. Incluye mensaje personalizado sin costo adicional.',
    price: 30000,
    offerPrice: 23000,
    stock: 6,
    image: tortaMama,
  },
  {
    id: 'p2',
    name: 'Torta Acuarela Bautizo',
    category: 'Tortas',
    description:
      'Torta con efecto acuarela en tonos lila y blanco, terminada con perlas comestibles, detalles en dorado y nombre personalizado. Perfecta para bautizos, primeras comuniones y celebraciones religiosas.',
    price: 45000,
    stock: 3,
    image: tortaBautizo,
  },
  {
    id: 'p3',
    name: 'Torta de Novios Dos Pisos',
    category: 'Tortas',
    description:
      'Torta de dos pisos en tonos crema y dorado, decorada con flores naturales e iniciales metalizadas. Diseñada especialmente para matrimonios y aniversarios. Tamaño y flores personalizables según la paleta de tu evento.',
    price: 95000,
    offerPrice: 85000,
    stock: 2,
    image: tortaNovios,
  },
  {
    id: 'p4',
    name: 'Torta Temática Personalizada',
    category: 'Tortas',
    description:
      'Bizcocho de vainilla relleno de crema chantilly de lúcuma, manjar y nueces, decorado con la temática que elijas (deportes, personajes, colores favoritos). Ideal para cumpleaños infantiles y juveniles.',
    price: 60000,
    stock: 4,
    image: tortaTematica,
  },
  {
    id: 'p5',
    name: 'Kuchen de Manzana Artesanal',
    category: 'Kuchen',
    description:
      'Masa quebrada horneada con relleno de manzanas frescas, un toque de canela y nueces picadas, terminado con enrejado clásico. Formato familiar de 10 porciones, perfecto para compartir.',
    price: 12000,
    stock: 10,
    image: pieManzana,
  },
  {
    id: 'p6',
    name: 'Caja de Galletas Decoradas',
    category: 'Galletas',
    description:
      'Set de 6 galletas de mantequilla decoradas a mano con royal icing, diseños de temporada personalizables. Se entregan en caja individual, ideales para regalar o como detalle en eventos.',
    price: 15000,
    offerPrice: 12900,
    stock: 12,
    image: galletas,
  },
  {
  id: 'p7',
  name: 'Cupcakes Vainilla',
  category: 'Cupcakes',
  description:
    'Caja de 6 cupcakes de vainilla y chocolate decorados con con frutillas naturales bañadas en chocolate. Ideales para regalar o sorprender en cumpleaños, aniversarios y ocasiones especiales.',
  price: 18000,
  offerPrice: 15900,
  stock: 8,
  image: cupcakes,
},
{
  id: 'p8',
  name: 'Kuchen Griego',
  category: 'Kuchen',
  description:
    'Kuchen esponjoso a base de yogurt griego, con un suave sabor cítrico y una textura húmeda y liviana. Cubierto con un toque de azúcar flor, es ideal para acompañar el café o el té de la tarde. Formato familiar de 10 porciones, perfecto para compartir.',
  price: 22000,
  offerPrice: 19900,
  stock: 5,
  image: kuchengriego,
},
{
  id: 'p9',
  name: 'Cheesecakes',
  category: 'Cheesecakes',
  description:
    'Cheesecake artesanal sobre base de galleta de mantequilla, cubierto con una selección de frutos rojos frescos y salsa de frambuesa. Suave, cremoso y perfecto para cualquier celebración.',
  price: 22000,
  offerPrice: 19900,
  stock: 5,
  image: cheesecake,
}
];
