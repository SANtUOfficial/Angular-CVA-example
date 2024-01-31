import { Component, forwardRef, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';

export const CUSTOM_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PromotionDiscountComponent),
  multi: true,
};

export const CUSTOM_CONTROL_VALUE_VALIDATOR = {
  provide: NG_VALIDATORS,
  multi: true,
  useExisting: forwardRef(() => PromotionDiscountComponent),
};
@Component({
  selector: 'app-promotion-discount',
  standalone: true,
  imports: [DropdownModule, FormsModule, ReactiveFormsModule],
  templateUrl: './promotion-discount.component.html',
  styleUrl: './promotion-discount.component.scss',
  providers: [CUSTOM_CONTROL_VALUE_ACCESSOR, CUSTOM_CONTROL_VALUE_VALIDATOR],
})
export class PromotionDiscountComponent implements ControlValueAccessor {
  // Injecting Services and Tokens
  private fb = inject(FormBuilder);

  marketTypes = [
    { name: 'Domestic', code: 'DO' },
    { name: 'International', code: 'IN' },
  ];

  // Form initialization
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

  validate(): ValidationErrors | null {
    const code: string = this.codeAndDescriptionForm.get('code')?.value!;
    const marketingType =
      this.codeAndDescriptionForm.get('marketingType')?.value!;

    if (code.trim() === '' || marketingType === '') {
      return { required: true, message: 'fields are required.' };
    }

    return null; // Validation passed
  }
}
