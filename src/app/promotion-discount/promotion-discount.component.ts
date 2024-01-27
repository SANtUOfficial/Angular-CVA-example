import { Component, forwardRef, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';

export const CUSTOM_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PromotionDiscountComponent),
  multi: true,
};
@Component({
  selector: 'app-promotion-discount',
  standalone: true,
  imports: [DropdownModule, FormsModule, ReactiveFormsModule],
  templateUrl: './promotion-discount.component.html',
  styleUrl: './promotion-discount.component.scss',
  providers: [CUSTOM_CONTROL_VALUE_ACCESSOR],
})
export class PromotionDiscountComponent implements ControlValueAccessor {
  // Injecting Services and Tokens
  private fb = inject(FormBuilder);

  marketTypes = [
    { name: 'Domestic', code: 'DO' },
    { name: 'International', code: 'IN' },
  ];

  // Form Group init
  codeAndDescriptionForm = this.fb.group({
    code: ['', Validators.required],
    marketingType: ['', Validators.required],
  });

  writeValue(value: any): void {
    if (value) {
      this.codeAndDescriptionForm.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.codeAndDescriptionForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.codeAndDescriptionForm.valueChanges.subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    // isDisabled ? this.overviewForm.disable() : this.overviewForm.enable();
  }
}
