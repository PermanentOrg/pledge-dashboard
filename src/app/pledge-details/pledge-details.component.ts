import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FirebasePledge } from 'app/tables/tables.component';
@Component({
  selector: 'app-pledge-details',
  templateUrl: './pledge-details.component.html',
  styleUrls: ['./pledge-details.component.scss']
})
export class PledgeDetailsComponent implements OnInit {
  public pledge: FirebasePledge
  constructor(
    private route: ActivatedRoute
  ) { 
    this.pledge = route.snapshot.data.pledge;
  }

  ngOnInit() {
  }

}
