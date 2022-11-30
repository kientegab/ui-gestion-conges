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
        routerLink: ['/public'] 
      },
      { 
        label: 'Décision de Congés',
        items: [
          {
            label: 'Annuel',
            routerLink: ['/public/congeAnnuel'],
            routerLinkActiveOptions: {
              exact: true
            }
          },
          {
            separator: true
          },
          {
            label: 'Maternité',
            routerLink: ['/public/congeMaternite'],
            routerLinkActiveOptions: {
              exact: true
            } 
          },
          {
            separator: true
          },
          {
            label: 'Maladie',
            routerLink: ['/public/congeMaladie'],
            routerLinkActiveOptions: {
              exact: true
            } 
          },
          {
            separator: true
          },
          {
            label: 'Fin de service',
            routerLink: ['/public/congeFinservice'],
            routerLinkActiveOptions: {
              exact: true
            } 
          },
          
        ]
      },
      {
        label: 'Autorisations',
        items: [  
          {
            label: 'Jouissance Annuelle',
            routerLink: ['/public/jouissAnnuelle'],
            routerLinkActiveOptions: {
              exact: true
            },
          },
          {
            separator: true
          },
          {
            label: 'Jouissance Examen',
            routerLink: ['/public/jouissExamen'],
            routerLinkActiveOptions: {
              exact: true
            },
          },
          {
            separator: true
          },
          {
            label: 'Jouissance SND',
            routerLink: ['/public/jouissSND'],
            routerLinkActiveOptions: {
              exact: true
            },
          },
          {
            separator: true
          },
          {
            label: 'Autres absences',
            routerLink: ['/public/jouissAutre'],
            routerLinkActiveOptions: {
              exact: true
            },
          }
        ] 
      },
      {
        label: 'Comment ça marche ?',
        routerLink: ['/public/commment-ca-marche'] 
      },
      {
        label: 'Rechercher un agent',
        routerLink: ['/public/verifier-acte'] 
      },
      {
        label: 'Nous contacter',
        routerLink: ['/public/contact'] 
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

