import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BarcodeService } from '../../services/barcode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'gv-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  total= [];
  somme: any =0;
  scan: any;
  idClient:string;
  barcode:string;
  message:string;
  items = [];
  codebar:any;
  cart: any;
  constructor(public crudservice:BarcodeService,
    private httpClient: HttpClient,
    private router:Router
        ) { }

  ngOnInit() {
    this.crudservice.get_AllBarcode().subscribe(data => {

      this.scan = data.map(e => {
        let codebar=e.payload.doc.data()['barcode'];
        console.log(codebar);


       this.items.push(codebar);
  
       console.log("data",this.items);

        return {
          id: e.payload.doc.id,
          isedit: false,
          idClient: e.payload.doc.data()['idClient'],
          barcode: e.payload.doc.data()['barcode'],
          
        };
      })
      console.log(this.items);
      this.crudservice.postproduit(this.items)
      .subscribe( (data : Array<any>) =>{
        console.log("alllproduits",data);
        
        this.codebar = data;
        for (let i = 0; i < data.length ; i++) {
          this.total[i]=data[i].price;
          this.somme+=this.total[i];
        }
        

      }
);





    });
  }
  onChange(qte:number, price:number,i:number){
    console.log(qte);
    console.log(price);
      this.total[i]=qte*price;
      this.somme+=this.total[i];
      localStorage.setItem("total",this.somme);

  }

  DeleteBarcode(record_id)
  {
    this.crudservice.delete_Barcode(record_id.id);
    
  }
  clickpaye(data){
    console.log("ckfkgf",data);
    var idclient= localStorage.getItem("client");
    var product= [];
    for (let i = 0; i < data.length ; i++) {
      console.log("dddddd",data[i]._id);
      
     /* {"products":[
        "idproducts":data[i]._id,
        "idclient":localStorage.getItem('client')
      }*/
      product.push({"idproducts":data[i]._id});

    }
  this.cart={
    "idclients":idclient,
    "products":product
  }
     ///this.cart ={"idclient":localStorage.getItem('client')};
    console.log("cart",this.cart);
    this.crudservice.cartAdd(this.cart);
    this.router.navigate(['/paye']);
  }

}
