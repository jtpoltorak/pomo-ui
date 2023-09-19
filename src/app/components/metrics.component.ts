import { Component, OnInit } from '@angular/core';

import * as Chart from 'chart.js';
Chart.defaults.font.family = 'comfortaa';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
})
export class MetricsComponent implements OnInit {
  data: any;
  options: any;

  ngOnInit(): void {
    this.data = {
      labels: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      datasets: [
        {
          label: 'Pomos This Week',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgb(153, 102, 255)',
          borderWidth: 1,
          data: [5, 5, 3, 8, 6, 0, 0],
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: '#000',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#000',
            font: {
              weight: 500,
            },
          },
          grid: {
            color: '#cecec3',
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: '#000',
          },
          grid: {
            color: '#cecec3',
            drawBorder: false,
          },
        },
      },
    };
  }
}
