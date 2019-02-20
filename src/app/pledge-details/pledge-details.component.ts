import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FirebasePledge } from 'app/tables/tables.component';
import { AuthService } from 'app/services/auth.service';
@Component({
  selector: 'app-pledge-details',
  templateUrl: './pledge-details.component.html',
  styleUrls: ['./pledge-details.component.scss']
})
export class PledgeDetailsComponent implements OnInit {
  public pledge: FirebasePledge;
  public editData: any | FirebasePledge = {};
  public currentUser: string;

  constructor(
    private route: ActivatedRoute,
    private zone: NgZone,
    private authService: AuthService
  ) { 
    this.pledge = route.snapshot.data.pledge;
    this.currentUser = this.authService.getCurrentUser().email;
    Object.assign(this.editData, this.pledge);
    console.log(this.pledge, this.editData, this.pledge.ref);

    this.pledge.ref.on('child_changed', (changedChild) => {
      this.zone.run(() => {
          this.pledge[changedChild.key] = changedChild.val();
      })
    });
  }


  startEditing() {
    this.pledge.editing = this.currentUser;
    this.pledge.ref.update({
      editing: this.currentUser
    }).then(() => {
      this.zone.run(() => {
        Object.assign(this.editData, this.pledge);
      })
    });
  }

  stopEditing(save = false) {
    if (!save) {
      this.pledge.ref.update({
        editing: false
      });
    } else {
      this.editData.editing = false;
      delete this.editData.id;
      delete this.editData.ref;
      Object.assign(this.pledge, this.editData);
      this.pledge.ref.update(this.editData).then(() => {
        console.log(`Saved pledge ID ${this.pledge.id}`);
      })
    }
  }

  ngOnInit() {
  }

}
