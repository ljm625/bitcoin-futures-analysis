import {Injectable} from '@angular/core';
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DataparserService {

  constructor() {
  }


  generate_bar_data(x_axis, buy_axis, sell_axis) {
    // The data looks like this : [100,-200,500,300,-400]
    let result = [];
    const datePipe = new DatePipe('en-US');

    for (let i = 0; i < x_axis.length; i++) {

      const myFormattedDate = datePipe.transform(x_axis[i], 'h:mm a');

      let data = {
        "name": myFormattedDate,
        "series": [
          {
            "name": "buy",
            "value": buy_axis[i]
          },
          {
            "name": "sell",
            "value": sell_axis[i]
          },
        ]
      }
      result.append(data)
    }
    return result;

  }
}
