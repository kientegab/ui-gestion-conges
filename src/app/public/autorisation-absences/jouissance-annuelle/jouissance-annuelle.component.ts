import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jouissance-annuelle',
  templateUrl: './jouissance-annuelle.component.html',
  styleUrls: ['./jouissance-annuelle.component.scss']
})
export class JouissanceAnnuelleComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  soumettre(){
    this.router.navigate(['/login']);
  }
}
