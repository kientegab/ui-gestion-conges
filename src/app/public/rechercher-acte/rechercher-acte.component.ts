import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-rechercher-acte',
  templateUrl: './rechercher-acte.component.html',
  styleUrls: ['./rechercher-acte.component.scss']
})
export class RechercherActeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  search(event?: LazyLoadEvent){}
}
