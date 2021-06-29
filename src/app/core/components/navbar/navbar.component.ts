import { Component, OnInit, TemplateRef } from '@angular/core';
import {BarcodeService} from '../../services/barcode.service';
import { HttpClient } from "@angular/common/http";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'gv-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('content', { static: true }) content: TemplateRef<any>;
  total= [];
  somme: any =0;
  title = 'angular9-firebaseapp';
modalid:any;
  scan: any;
  idClient:string;
  barcode:string;
  message:string;
  items = [];
  codebar:any;
  idClients:any;
  
    constructor(public crudservice:BarcodeService,
      private httpClient: HttpClient,
      private modelService: NgbModal,

      ){}
  
  ngOnInit() {
  console.log("bonjour");
      this.crudservice.get_AllBarcode().subscribe(data => {
        
  console.log("datafirebase"+data);
        this.scan = data.map(e => {
          console.log("codebar"+e);
          let codebar=e.payload.doc.data()['barcode'];
          console.log(codebar);
          localStorage.setItem("client",e.payload.doc.data()['idClient']);
this.crudservice.test(codebar).subscribe(data => {
 console.log(data);
});
         this.items.push(codebar);
    
         console.log("data",this.items);
         this.idClients= e.payload.doc.data()['idClient'];
          return {
            id: e.payload.doc.id,
            isedit: false,
            idClient: e.payload.doc.data()['idClient'],
            barcode: e.payload.doc.data()['barcode'],
            
          };
        })
        console.log(this.items);
        this.crudservice.postproduit(this.items)
        .subscribe((data : Array<any>) =>{
          console.log("alllproduits",data);
          
          this.codebar = data;   
          for (let i = 0; i < data.length ; i++){
            this.total[i]=data[i].price;
            this.somme+=this.total[i];
          }
          localStorage.setItem("total",this.somme);

          let cart:any;

          cart=[data,this.idClients];
          
        }
);
        console.log(this.scan);
  




      });

      this.modelService.open(this.content);
    
    }
  
    CreateRecord()
    {
      let Record = {};
      Record['barcode'] = this.barcode;
      Record['idClient'] = this.idClient;
  
      this.crudservice.create_NewBarcode(Record).then(res => {
  
          this.barcode = "";
          
          this.idClient ="";
          console.log(res);
          this.message = "Barcode data save Done";
      }).catch(error => {
        console.log(error);
      });
      
    }
  
    EditRecord(Record)
    {
      Record.isedit = true;
      Record.barcode = Record.barcode;
      Record.idClient = Record.idClient;
  
    }
  
    Updatarecord(recorddata)
    {
      let record = {};
      record['barcode'] = recorddata.barcode;
      record['idClient'] = recorddata.idClient;
      this.crudservice.update_Barcode(recorddata.id, record);
      recorddata.isedit = false;
    }
  
    DeleteBarcode(record_id)
    {      console.log("rfgfg",record_id.toString());

      ///console.log(record_id.id);


      this.crudservice.get_Barcode(record_id.toString());
    
     
      this.crudservice.delete_Barcode(record_id.id);
      
    }
    open(content) {
      console.log("modelfkfkf",content);
      this.modelService.open(content);
    }
  }

