import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-carrito',
  imports: [
    FormsModule
  ],
  templateUrl: './carrito.component.html',
  standalone: true,
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{
  paginaNombre: string = 'GameStorm';
  Name: string;
  Surname: string;
  email: string;
  address: string;
  address2: string;
  country: string;
  Postcode: number;
  paymentMethod: string;
  cc_number: number;
  cc_expiration: number;
  cc_Titular: string;
  cc_cvv: number;
  id_compra: number;
  producto: string;
  discount_code:number;
  importe_total: number;

  constructor(private router: Router, private titleService: Title, private http: HttpClient) {
    this.Name = '';
    this.Surname = '';
    this.email = '';
    this.address = '';
    this.address2 = '';
    this.country = '';
    this.Postcode = 0;
    this.paymentMethod = '';
    this.cc_number = 0;
    this.cc_expiration = 0;
    this.cc_Titular = '';
    this.cc_cvv = 0;
    this.id_compra = 0;
    this.producto = '';
    this.discount_code = 0;
    this.importe_total = 0;

  }

  ngOnInit() {
    this.setTitle();
  }

  setTitle() {
    this.titleService.setTitle(`${this.paginaNombre} - Carrito`);
  }
  onsubmit() {
    console.log("Compra enviada")
    this.http.post<any>("http://192.168.19.45:3090/CompraUsuariFitxer",
      { Name:this.Name,
        Surname:this.Surname,
        email:this.email,
        address:this.address,
        address2:this.address2,
        country:this.country,
        Postcode:this.Postcode,
        paymentMethod:this.paymentMethod,
        cc_number:this.cc_number,
        cc_expiration:this.cc_expiration,
        cc_Titular:this.cc_Titular,
        cc_cvv:this.cc_cvv,
        id_compra:this.id_compra,
        producto:this.producto,
        discount_code:this.discount_code,
        importe_total:this.importe_total})
      .subscribe(data => {
        console.log(data);
      });
    this.router.navigate(["/catalogo"]);

  }

}
