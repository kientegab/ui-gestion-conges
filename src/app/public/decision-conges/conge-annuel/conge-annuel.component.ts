import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conge-annuel',
  templateUrl: './conge-annuel.component.html',
  styleUrls: ['./conge-annuel.component.scss']
})
export class CongeAnnuelComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  soumettre(){
    this.router.navigate(['/login']);
  }
}
