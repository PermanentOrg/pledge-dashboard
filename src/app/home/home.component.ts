import { Component, OnInit, NgZone, ViewChild, ElementRef, ContentChild, AfterViewInit } from '@angular/core';
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
export class HomeComponent implements OnInit, AfterViewInit {
  public progressData: ProgressData[] = [];

  public pledgesTodayCount = 0;
  public pledgesTodayDollarAmount = 0;

  public pledgesWeekCount = 0;
  public pledgesWeekDollarAmount = 0;

  public pledgesChartData = {
    x: [],
    y: [],
    type: 'scatter'
  };
  public pledgesChartLayout = {
    xaxis: {
      autorange: false,
      range: [moment().subtract('3', 'd').toDate(), moment().toDate()]
    },
    yaxis: {
      autorange: false,
      range: [25000, 50000]
    },
    margin: {
      l: 80,
      r: 80,
      t: 10,
      b: 50
    }
  }
  public pledgesChartConfig = {
    displayModeBar: false
  };

  public debouncedRecalculate = debounce(() => {
    this.zone.run(() => {
      this.recalculateCharts();
    })
  }, 100);

  constructor(
    private db: AngularFireDatabase,
    private zone: NgZone
  ) {
  }

  ngOnInit() {
    this.db.database.ref('/progress').on('child_added', snapshot => {
      const progress = snapshot.val() as ProgressData;

      this.zone.run(() => {
          this.progressData.push(progress);
          this.debouncedRecalculate();
      });
    });
  }

  ngAfterViewInit() {
  }

  recalculateCharts() {
    this.countPledges();
    this.updateCharts();
  }

  updateCharts() {
    this.pledgesChartData.x = this.progressData.map(progress => moment(progress.timestamp).toISOString());
    this.pledgesChartData.y = this.progressData.map(progress => progress.totalDollarAmount);

    const latest = this.progressData[this.progressData.length - 1];
    this.pledgesChartLayout.yaxis.range = [latest.totalDollarAmount - 1000, latest.totalDollarAmount + 1000];
  }

  countPledges() {
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
      const count = list.length;

      if (list.length === 1) {
        list.unshift(this.progressData[this.progressData.length - 2]);
      }
      const dollarAmounts = list.map(progress => progress.totalDollarAmount);
      const totalDollarAmount = Math.max(...dollarAmounts) - Math.min(...dollarAmounts);

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
