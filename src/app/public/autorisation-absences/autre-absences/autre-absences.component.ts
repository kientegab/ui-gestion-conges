import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autre-absences',
  templateUrl: './autre-absences.component.html',
  styleUrls: ['./autre-absences.component.scss']
})
export class AutreAbsencesComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  soumettre(){
    this.router.navigate(['/login']);
  }
}
