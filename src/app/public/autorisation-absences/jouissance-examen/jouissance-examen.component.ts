import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jouissance-examen',
  templateUrl: './jouissance-examen.component.html',
  styleUrls: ['./jouissance-examen.component.scss']
})
export class JouissanceExamenComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  soumettre(){
    this.router.navigate(['/login']);
  }
}
