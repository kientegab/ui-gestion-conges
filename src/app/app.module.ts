import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import { FooterComponent } from './public/footer/footer.component';
import { GalerieComponent } from './public/galerie/galerie.component';
import { HeaderComponent } from './public/header/header.component';
import { MenuComponent } from './public/menu/menu.component';
import { PublicDashboardComponent } from './public/public-dashboard/public-dashboard.component';
import { PublicRoutingModule } from './public/public-routing.module';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GalleriaModule } from 'primeng/galleria';


@NgModule({
  declarations: [
    AppComponent,
    PublicDashboardComponent,
    DashboardComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    GalerieComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    ToolbarModule,
    GalleriaModule,
    HttpClientModule,
    MenuModule,
    MenubarModule,
    ButtonModule,
    PublicRoutingModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
