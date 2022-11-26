import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conge-maladie',
  templateUrl: './conge-maladie.component.html',
  styleUrls: ['./conge-maladie.component.scss']
})
export class CongeMaladieComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  soumettre(){
    this.router.navigate(['/login']);
  }

}
