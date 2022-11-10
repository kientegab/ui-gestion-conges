import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Galleria } from 'primeng/galleria';
import {ContextMenuModule} from 'primeng/contextmenu';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-galerie',
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.css']
})
export class GalerieComponent implements OnInit {

  images: any[]=[];

    responsiveOptions:any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    constructor() { }

    ngOnInit() {
       
    }
}