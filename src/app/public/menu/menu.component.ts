import { Component, OnInit } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem, MegaMenuItem } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  loggedIn = false;

  
  constructor(private router: Router) { }
  
  items: MenuItem[]=[];


 
  ngOnInit() {
   
    this.items = [
      {
        label: 'Accueil',
        icon: 'pi pi-home',
        routerLink: ['/'] 
      },
      { 
        label: 'Congés',
        items: [
          {
            label: 'Autorisation congés',
            routerLink: ['/attestation-soumission'],
            routerLinkActiveOptions: {
              exact: true
            }
          },
          {
            separator: true
          },
          {
            label: 'Aut. absence',
            routerLink: ['/declaration-etablissement'],
            routerLinkActiveOptions: {
              exact: true
            } 
          },
          
        ]
      },
      // {
      //   label: 'Actes individuels',
      //   items: [  
      //     {
      //       label: 'Attestation du travail',
      //       routerLink: ['/attestation-travail'],
      //       routerLinkActiveOptions: {
      //         exact: true
      //       },
      //     },
      //     {
      //       separator: true
      //     },
      //     {
      //       label: 'Attestation du chômage',
      //       routerLink: ['/attestation-chomage'],
      //       routerLinkActiveOptions: {
      //         exact: true
      //       },
      //     }
      //   ] 
      // },
      {
        label: 'Comment ça marche ?',
        routerLink: ['/commment-ca-marche'] 
      },
      {
        label: 'Rechercher un acte',
        routerLink: ['/verifier-acte'] 
      },
      {
        label: 'Nous contacter',
        routerLink: ['/contact'] 
      },
    ];
  }


  logout(): void {
    // this.tokenStorageService.signOut();
     this.router.navigate(['/']);
     window.location.reload();
   }
   login() {
     this.router.navigate(['/login']);
   }
}

