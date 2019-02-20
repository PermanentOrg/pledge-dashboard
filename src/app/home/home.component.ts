import { Component, OnInit, NgZone } from '@angular/core';
import Plotly from 'plotly.js-dist';
import { AngularFireDatabase } from '@angular/fire/database';
import { debounce } from 'lodash';
import * as moment from 'moment';

export interface ProgressData {
  activePhase?: string;
  goalDollarAmount: number;
  totalDollarAmount: number;
  timestamp: number;
  totalPledges: number;
  totalStorageAmount: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public progressData: ProgressData[] = [];

  public pledgesTodayCount = 0;
  public pledgesTodayDollarAmount = 0;

  public pledgesWeekCount = 0;
  public pledgesWeekDollarAmount = 0;

  public debouncedRecalculate = debounce(() => {
    this.recalculateCharts();
  }, 100);

  constructor(
    private db: AngularFireDatabase,
    private zone: NgZone
  ) {
    this.db.database.ref('/progress').on('child_added', snapshot => {
      const progress = snapshot.val() as ProgressData;

      this.zone.run(() => {
          this.progressData.push(progress);
          this.debouncedRecalculate();
      });
    });
  }

  ngOnInit() {

  }

  recalculateCharts() {
    this.countPledgesToday();
  }

  countPledgesToday() {
    const minus24h = moment().subtract(24, 'hours');
    const minus7d = moment().subtract(7, 'days');
    const pledgesToday = [];
    const pledgesWeek = [];
    this.progressData.map(progress => {
      const pledgeDate = moment(progress.timestamp)
      if (pledgeDate.isAfter(minus24h)) {
        pledgesToday.push(progress);
        pledgesWeek.push(progress);
      } else if (pledgeDate.isAfter(minus7d) ) {
        pledgesWeek.push(progress);
      }
    });

    for (const list of [pledgesToday, pledgesWeek]) {
      const dollarAmounts = list.map(progress => progress.totalDollarAmount);
      const totalDollarAmount = Math.max(...dollarAmounts) - Math.min(...dollarAmounts);
      const count = list.length;

      if (list === pledgesToday) {
        this.pledgesTodayCount = count;
        this.pledgesTodayDollarAmount = totalDollarAmount;
      } else {
        this.pledgesWeekCount = count;
        this.pledgesWeekDollarAmount = totalDollarAmount;
      }
    }
  }
}
