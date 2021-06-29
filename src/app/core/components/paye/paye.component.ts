import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BarcodeService } from '../../services/barcode.service';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'gv-paye',
  templateUrl: './paye.component.html',
  styleUrls: ['./paye.component.scss']
})
export class PayeComponent implements OnInit {
  scan: any;
  idClient:string;
  barcode:string;
  message:string;
  items = [];
  codebar:any;
  
  somme= localStorage.getItem('total');
  constructor(public crudservice:BarcodeService,
    private httpClient: HttpClient,
    private modelService: NgbModal
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
      .subscribe(data =>{
        console.log("alllproduits",data);
        
        this.codebar = data;    
      }
);
      console.log(this.scan);





    });
  }
  modal(model) {
    this.modelService.open(model).result.then(result => {
    },
    reason => {
    });
  }

}
