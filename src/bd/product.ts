export class Product {
  idProducto: string;
  nombreProducto: string;
  imagen: string;
  descripcionProducto: string;
  categoriaProducto: string;
  precioProducto: number;
  stockProducto: number;
  cantidadCarrito: number;
  video: string;
  porcentajeDescuentoProducto?: number;

  constructor(
    idProducto: string,
    nombreProducto: string,
    imagen: string,
    descripcionProducto: string,
    categoriaProducto: string,
    precioProducto: number,
    stockProducto: number,
    video: string,
    porcentajeDescuentoProducto?: number
  ) {
    this.idProducto = idProducto;
    this.nombreProducto = nombreProducto;
    this.imagen = imagen;
    this.descripcionProducto = descripcionProducto;
    this.categoriaProducto = categoriaProducto;
    this.precioProducto = precioProducto;
    this.stockProducto = stockProducto;
    this.cantidadCarrito = 0;
    this.video = video;
    this.porcentajeDescuentoProducto = porcentajeDescuentoProducto;
  }
}
