import { Component, OnInit } from '@angular/core';
import {BarcodeService} from '../../services/barcode.service';
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'gv-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss']
})
export class BarcodeComponent implements OnInit {

  title = 'angular9-firebaseapp';

  scan: any;
  idClient:string;
  barcode:string;
  message:string;
  items = [];
  codebar:any;
  
    constructor(public crudservice:BarcodeService,
      private httpClient: HttpClient,
      ){}
  
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
        });
        console.log(this.scan);
  
      });
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
    {
      console.log(record_id.id);
      this.crudservice.delete_Barcode(record_id.id);
      
    }
  
  
  }


