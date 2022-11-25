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
        label: 'Décision de Congés',
        items: [
          {
            label: 'Annuel',
            routerLink: ['/attestation-soumission'],
            routerLinkActiveOptions: {
              exact: true
            }
          },
          {
            separator: true
          },
          {
            label: 'Maternité',
            routerLink: ['/declaration-etablissement'],
            routerLinkActiveOptions: {
              exact: true
            } 
          },
          {
            separator: true
          },
          {
            label: 'Maladie',
            routerLink: ['/declaration-etablissement'],
            routerLinkActiveOptions: {
              exact: true
            } 
          },
          {
            separator: true
          },
          {
            label: 'Fin de service',
            routerLink: ['/declaration-etablissement'],
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
            routerLink: ['/attestation-travail'],
            routerLinkActiveOptions: {
              exact: true
            },
          },
          {
            separator: true
          },
          {
            label: 'Jouissance Examen',
            routerLink: ['/attestation-chomage'],
            routerLinkActiveOptions: {
              exact: true
            },
          },
          {
            separator: true
          },
          {
            label: 'Jouissance SND',
            routerLink: ['/attestation-chomage'],
            routerLinkActiveOptions: {
              exact: true
            },
          },
          {
            separator: true
          },
          {
            label: 'Autres absences',
            routerLink: ['/attestation-chomage'],
            routerLinkActiveOptions: {
              exact: true
            },
          }
        ] 
      },
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

