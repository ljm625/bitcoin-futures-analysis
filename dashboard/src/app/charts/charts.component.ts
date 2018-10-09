import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Chart } from 'chart.js';




@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit, AfterViewInit {
  @ViewChild('lineChart') private chartRef;
  chart: any;

  dataPoints = [{
    x: 1,
    y: 10
  }, {
    x: 2,
    y: 20
  }];

  dataPoints_old = [1,2];


  labels = ["old","new"];

  constructor() { }

  ngOnInit() {
    const ctx = this.chartRef.nativeElement.getContext("2d");
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labels, // your labels array
        datasets: [
          {
            data: this.dataPoints_old, // your data array
            borderColor: '#00AEFF',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });

  }

  ngAfterViewInit() {

  }

}
