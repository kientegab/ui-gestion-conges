import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jouissance-snd',
  templateUrl: './jouissance-snd.component.html',
  styleUrls: ['./jouissance-snd.component.scss']
})
export class JouissanceSNDComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  soumettre(){
    this.router.navigate(['/login']);
  }
}
