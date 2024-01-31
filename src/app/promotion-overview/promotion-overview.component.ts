import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Component, Input, forwardRef, inject } from '@angular/core';

import { CheckboxModule } from 'primeng/checkbox';
import { NgFor } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';

export const CUSTOM_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PromotionOverviewComponent),
  multi: true,
};

export const CUSTOM_CONTROL_VALUE_VALIDATOR = {
  provide: NG_VALIDATORS,
  multi: true,
  useExisting: forwardRef(() => PromotionOverviewComponent),
};
@Component({
  selector: 'app-promotion-overview',
  standalone: true,
  imports: [
    CheckboxModule,
    FormsModule,
    NgFor,
    RadioButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './promotion-overview.component.html',
  styleUrl: './promotion-overview.component.scss',
  providers: [CUSTOM_CONTROL_VALUE_ACCESSOR, CUSTOM_CONTROL_VALUE_VALIDATOR],
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
    promotionType: ['', Validators.required],
  });

  private onChange(value: any) {}
  private onTouched() {}

  writeValue(value: any): void {
    if (value) {
      this.overviewForm.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.overviewForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.overviewForm.valueChanges.subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    // isDisabled ? this.overviewForm.disable() : this.overviewForm.enable();
  }

  validate(): ValidationErrors | null {
    const customerType: string = this.overviewForm.get('customerType')?.value!;
    const channels: string = this.overviewForm.get('channels')?.value!;
    const promotionType: string =
      this.overviewForm.get('promotionType')?.value!;

    if (customerType.trim() === '' || promotionType.trim() === '') {
      return { required: true, message: 'fields are required.' };
    }

    if (channels.length === 0) {
      return { required: true, message: 'fields are required.' };
    }

    return null; // Validation passed
  }
}
