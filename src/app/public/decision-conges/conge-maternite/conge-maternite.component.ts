import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conge-maternite',
  templateUrl: './conge-maternite.component.html',
  styleUrls: ['./conge-maternite.component.scss']
})
export class CongeMaterniteComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  soumettre(){
    this.router.navigate(['/login']);
  }

}
