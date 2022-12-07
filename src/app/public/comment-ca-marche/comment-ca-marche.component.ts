import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-ca-marche',
  templateUrl: './comment-ca-marche.component.html',
  styleUrls: ['./comment-ca-marche.component.scss']
})
export class CommentCaMarcheComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function() {
      $("#menu li a").on('click', function(e) {
          e.preventDefault()
          var page = $(this).data('page');
          $("#pages .page:not('.hide')").stop().fadeOut('fast', function() {
              $(this).addClass('hide');
              $('#pages .page[data-page="'+page+'"]').fadeIn('slow').removeClass('hide');
          });
      });
  });
  }

}
