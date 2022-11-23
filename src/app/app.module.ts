import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import { FooterComponent } from './public/footer/footer.component';
import { GalerieComponent } from './public/galerie/galerie.component';
import { HeaderComponent } from './public/header/header.component';
import { MenuComponent } from './public/menu/menu.component';
import { PublicDashboardComponent } from './public/public-dashboard/public-dashboard.component';
import { PublicRoutingModule } from './public/public-routing.module';
import { ToolbarModule } from 'primeng/toolbar';
import { GalleriaModule } from 'primeng/galleria';
import { AuthInterceptorProviders } from './_helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbDialogModule, NbIconModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { ThemeRoutingModule } from './theme/theme-routing.module';
import { ThemeModule } from './theme/theme.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AdministrationModule } from './administration/administration.module';
import { AdministrationRoutingModule } from './administration/administration-routing.module';
import { ContextMenuModule } from 'primeng/contextmenu';
import { CongeAnnuelComponent } from './public/decision-conges/conge-annuel/conge-annuel.component';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


@NgModule({
  declarations: [
    AppComponent,
    PublicDashboardComponent,
    DashboardComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    GalerieComponent,
    CongeAnnuelComponent
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
    BrowserAnimationsModule,
    PublicRoutingModule,
    AdministrationRoutingModule,
    AppRoutingModule,
    RouterModule,
    ToastModule,
    NbLayoutModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    ToastModule,
    NbLayoutModule,
    ContextMenuModule,
    ImageModule,
    NbEvaIconsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NbIconModule,               // <---------
    NbSidebarModule.forRoot(),  // <---------
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbThemeModule.forRoot({ name: 'corporate' })
  ],
  // providers: [ConfirmationService,MessageService,AuthInterceptorProviders],
  providers: [ConfirmationService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
