import { Component, OnInit } from '@angular/core';
import { config } from '../shared/config/config';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isHome;
  label = config.AppLabel;

  constructor(private route: ActivatedRoute) {
    route.snapshot.children.map(child => {
      if (child.data['isHome'] === true) {
        this.isHome = true;
      }
    });
  }

  ngOnInit() {
  }

}
