import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphVisaulizerComponent } from './core/components/graph-visaulizer/graph-visaulizer.component';
import { NodeComponent } from './core/components/node/node.component';
import { ActionsComponent } from './core/components/actions/actions.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { PayeComponent } from './core/components/paye/paye.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { BarcodeComponent } from './core/components/barcode/barcode.component';
import { AngularFireModule}from '@angular/fire';
import { AngularFireDatabaseModule}from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckOutComponent } from './core/components/check-out/check-out.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphVisaulizerComponent,
    NodeComponent,
    ActionsComponent,
    PayeComponent,
    NavbarComponent,
    BarcodeComponent,
    CheckOutComponent,
   // for database
  ],
  imports: [
     BrowserModule,
     AppRoutingModule, 
     DragDropModule,
     HttpClientModule,
     AngularFireModule.initializeApp(environment.firebase),
     AngularFireDatabaseModule,
     AngularFirestoreModule,
     FormsModule,
     NgbModule,

   ],
  
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
