import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {DataparserService} from "../dataparser.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-stack-orders',
  templateUrl: './stack-orders.component.html',
  styleUrls: ['./stack-orders.component.css']
})
export class StackOrdersComponent implements OnInit, AfterViewInit {

  period = 1;
  step = 1;
  isVisible = false;
  data = [];
  validateForm: any = null;


  constructor(private api: ApiService, private dp: DataparserService, private fb: FormBuilder) {
  }

  ngOnInit() {

    this.validateForm = this.fb.group({
      coinName: [null, [Validators.required]],
      timerange: [null, [Validators.required, Validators.pattern('[0-9]+')]],
      step: [null, [Validators.required, Validators.pattern('[0-9]+\.*[0-9]*')]],
      starttime: [null],
      min: [null, [Validators.min(0), Validators.max(1000)]],
    });
  }


  ngAfterViewInit() {
    this.update_chart('eth', 24, 1, null, null);
  }

  update_chart(coin, period, interval, start_date, min) {
    this.api.get_orders(coin, period, interval, start_date, min).subscribe(resp => {
      console.log(resp);
      const result = this.dp.generate_bar_data(resp["price"], resp["buy"], resp["sell"]);
      this.data = result;
    });

  }


  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    console.log(this.validateForm);
    this.isVisible = false;
    this.update_chart(this.validateForm.value.coinName, Number(this.validateForm.value.timerange), Number(this.validateForm.value.step), this.validateForm.value.starttime, this.validateForm.value.min)
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
