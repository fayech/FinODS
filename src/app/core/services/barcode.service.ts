import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {
  endpoint = 'http://localhost:3000/';

  constructor(public fireservices:AngularFirestore,
    private http: HttpClient) { }

  create_NewBarcode(Record)
  {
    return this.fireservices.collection('scan').add(Record);
  }

  get_AllBarcode()
  {
    return this.fireservices.collection('scan').snapshotChanges();
  }

  update_Barcode(recordid, record)
  {
    this.fireservices.doc('scan/' + recordid).update(record);
  }

  delete_Barcode(record_id)
  {
    this.fireservices.doc('scan/' + record_id).delete();

    
     // return this.fireservices.collection('scan/').doc(record_id).delete();
    
  }
  get_Barcode(record_id)
  {
   //console.log("test webservice",record_id);
    //return this.fireservices.doc('scan/' + record_id).snapshotChanges();
    //return this.fireservices.collection('scan', ref => ref.where('barcode', '==', record_id)).valueChanges();
    const tutorialsRef = this.fireservices.collection('scan', ref => ref.where('barcode', '==', record_id));
   // this.fireservices.collection("scan").FieldValue.delete();

   // this.fireservices.collection('scan').doc(record_id);

     // return this.fireservices.collection('scan/').doc(record_id).delete();
    
  }
  postproduit(data){
    return this.http.post(this.endpoint + 'Getbarcode/',data);

  }
  verification(data){
    return this.http.post(this.endpoint+ 'Barcode',data);
  }
  cartAdd(data){
    return this.http.post(this.endpoint+'addCart',data).subscribe(
      data => console.log('success', data),
      error => console.log('oops', error)
    );

  }
  test(data){
    return this.http.post(this.endpoint+ 'test',data);

  }
}
