import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.scss']
})

export class ProfilUserComponent implements OnInit {
  showProfil?:boolean=false;

  constructor(
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
  }

  cancel(){
    this.router.navigate(['/workspace'])
      .then(() => {
        window.location.reload();
      });
  }
}
