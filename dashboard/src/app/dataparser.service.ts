import {Injectable} from '@angular/core';
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DataparserService {

  constructor() {
  }


  public generate_bar_data(x_axis, buy_axis, sell_axis, time_axis = false) {
    // The data looks like this : [100,-200,500,300,-400]
    let result = [];
    const datePipe = new DatePipe('en-US');
    let formatted_name = "";
    for (let i = 0; i < x_axis.length; i++) {
      if (time_axis) {
        formatted_name = datePipe.transform(x_axis[i], 'h:mm a');

      } else {
        formatted_name = x_axis[i];

      }


      const data = {
        'name': formatted_name,
        'series': [
          {
            'name': 'buy',
            'value': buy_axis[i]
          },
          {
            'name': 'sell',
            'value': sell_axis[i]
          },
        ]
      };
      result.push(data);
    }
    console.log(result);
    return result;

  }
}
