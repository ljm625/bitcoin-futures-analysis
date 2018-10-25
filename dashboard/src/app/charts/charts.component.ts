import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewChildren} from '@angular/core';
import { Chart } from 'chart.js';

import {ElementRef} from '@angular/core';



@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {

  totalCount = 0;
  @Input() data = [
    {
      "name": "18:00",
      "series": [
        {
          "name": "up",
          "value": 0
        },
        {
          "name": "down",
          "value": 100
        },
      ]
    },
    {
      "name": "19:00",
      "series": [
        {
          "name": "down",
          "value": 400
        },
      ]
    },
    {
      "name": "20:00",
      "series": [
        {
          "name": "up",
          "value": 300
        },
      ]
    },

  ]



  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454','#cf141d']
  };
  colorScheme2 = 'vivid';


  constructor() {
    // Object.assign(this, { this.single });
  }

  onSelect(event) {
    console.log(event);
  }

}
