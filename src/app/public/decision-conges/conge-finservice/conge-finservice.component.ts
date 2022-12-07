import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conge-finservice',
  templateUrl: './conge-finservice.component.html',
  styleUrls: ['./conge-finservice.component.scss']
})
export class CongeFinserviceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  soumettre(){
    this.router.navigate(['/login']);
  }
}
