import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() {}

  public ngOnInit() {
    $(document).ready(function () {
      $("#menu li a").on('click', function (e) {
        e.preventDefault()
        var page = $(this).data('page');
        $("#pages .page:not('.hide')").stop().fadeOut('fast', function () {
          $(this).addClass('hide');
          $('#pages .page[data-page="' + page + '"]').fadeIn('slow').removeClass('hide');
        });
      });
    });

  }
}
