export class Product {
  idProducto: string;
  nombreProducto: string;
  fotoProducto: string;
  descripcionProducto: string;
  categoriaProducto: string;
  precioProducto: number;
  stockProducto: number;
  cantidadCarrito: number;
  videoProducto: string;
  porcentajeDescuentoProducto?: number;

  constructor(idProducto: string, nombreProducto: string, fotoProducto: string, descripcionProducto: string, categoriaProducto: string, precioProducto: number, stockProducto: number, videoProducto: string, porcentajeDescuentoProducto?: number) {
    this.idProducto = idProducto;
    this.nombreProducto = nombreProducto;
    this.fotoProducto = fotoProducto;
    this.descripcionProducto = descripcionProducto;
    this.categoriaProducto = categoriaProducto;
    this.precioProducto = precioProducto;
    this.stockProducto = stockProducto;
    this.cantidadCarrito = 0;
    this.videoProducto = videoProducto;
    this.porcentajeDescuentoProducto = porcentajeDescuentoProducto;
  }


}
