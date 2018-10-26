import {AfterViewInit, Component} from '@angular/core';
import {ApiService} from "./api.service";
import {DataparserService} from "./dataparser.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  data = [];

  constructor(private api: ApiService, private dp: DataparserService) {
  }


}
