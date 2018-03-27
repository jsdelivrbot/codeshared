import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StudentService } from './services/student.service';
import { OrderByPipe } from './pipe/order-by.pipe';
import { ItemComponent } from './item/item.component';



@NgModule({
  declarations: [
    AppComponent,
    OrderByPipe,
    ItemComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
