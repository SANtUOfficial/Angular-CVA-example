import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PromotionDiscountComponent } from './promotion-discount/promotion-discount.component';
import { PromotionOverviewComponent } from './promotion-overview/promotion-overview.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    DropdownModule,
    CommonModule,
    CardModule,
    PromotionOverviewComponent,
    PromotionDiscountComponent,
    ButtonModule,
    InputTextModule,
    AccordionModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-cva';
  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];

  formGroup!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      promotionOverview: this.fb.group({
        customerType: ['', Validators.required],
        channels: [''],
        promotionType: [''],
      }),
      // marketTypes: this.fb.group({
      //   code: ['', Validators.required],
      //   marketingType: ['', Validators.required],
      // }),
    });
  }
}
