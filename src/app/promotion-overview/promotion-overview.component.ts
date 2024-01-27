import { Component, Input, forwardRef, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';

export const CUSTOM_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PromotionOverviewComponent),
  multi: true,
};

@Component({
  selector: 'app-promotion-overview',
  standalone: true,
  imports: [
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CheckboxModule,
  ],
  templateUrl: './promotion-overview.component.html',
  styleUrl: './promotion-overview.component.scss',
  providers: [CUSTOM_CONTROL_VALUE_ACCESSOR],
})
export class PromotionOverviewComponent implements ControlValueAccessor {
  @Input() disabled = false;

  private fb = inject(FormBuilder);

  customerType = [
    { name: 'Commercial', key: 'commercial' },
    { name: 'Consumers', key: 'consumers' },
  ];
  channels = [
    { name: 'Commerical Web', key: 'commerical' },
    { name: 'Consumer web', key: 'consumer' },
    { name: 'CRES', key: 'cres' },
  ];
  promptionTypes = [
    {
      name: 'Auto Apply',
      key: 'autoApply',
    },
    {
      name: 'Explicit Code',
      key: 'explicitCode',
    },
  ];

  overviewForm = this.fb.group({
    customerType: ['', Validators.required],
    channels: [''],
    promotionType: [''],
  });

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (value) {
      this.overviewForm.setValue(value, { emitEvent: false });
    }
  }

  // registerOnChange(fn: any): void {
  //   this.overviewForm.valueChanges.subscribe(fn);
  // }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
    this.overviewForm.valueChanges.subscribe((value) => this.onChange(value));
  }
  registerOnTouched(fn: any): void {
    this.overviewForm.valueChanges.subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    // isDisabled ? this.overviewForm.disable() : this.overviewForm.enable();
  }
}
