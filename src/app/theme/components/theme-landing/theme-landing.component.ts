import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '../theme-menu';
import { NbMenuItem } from '@nebular/theme';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-theme-landing',
  templateUrl: './theme-landing.component.html',
  styleUrls: ['./theme-landing.component.scss'],
})
export class ThemeLandingComponent implements OnInit {
  permissions: any;
  user: any;
  menus: NbMenuItem[] = [];
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
    this.user = this.authService.tokenDecode();
  }

  ngOnInit(): void {
  
    this.permissions = this.authService.getPrivilege();
  

  }
   menu = MENU_ITEMS;


  setRoute(profil: any[]) {


    if (this.permissions == 'ROLE_ADMIN'|| this.permissions =='ROLE_DIR_DGESS' ||this.permissions == 'ROLE_RESP_DD') {

      this.menu.forEach(men => {

        if (men.title="mes Parametres"){

           this.menus.push(men);
        }

      })
      return this.menus;
    }
     if (this.permissions == 'ROLE_ADMIN'|| this.permissions =='ROLE_FS'||this.permissions == 'ROLE_RESP_STRUCT' ||this.permissions == 'ROLE_RESP_DGESS') {
     this.menus=[];
      this.menu.forEach(men => {

        if (men.title="Programmation Activité"){

           this.menus.push(men);
        }

      })
      return this.menus;
    }

    return this.menus;
  }

  reloadPage(): void {
    window.location.reload();
  }
}
