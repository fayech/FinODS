import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarcodeComponent } from './core/components/barcode/barcode.component';
import { CheckOutComponent } from './core/components/check-out/check-out.component';
import { GraphVisaulizerComponent } from './core/components/graph-visaulizer/graph-visaulizer.component';
import { PayeComponent } from './core/components/paye/paye.component';

const routes: Routes = [

  {
    path:'clients',
 component:GraphVisaulizerComponent
  },
  {
    path:'paye',
 component:PayeComponent
  },
  {
    path:'barcode',
    component:BarcodeComponent
  },
  
  {
    path:'',
 component:GraphVisaulizerComponent
  },
  {
    path:'checkout',
    component:CheckOutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
