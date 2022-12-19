import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  @Output() addedIngredient = new EventEmitter<Ingredient>();
  @ViewChild('inputName') inputName: ElementRef;
  @ViewChild('inputAmount') inputAmount: ElementRef;

  addIngr() {
    let ingrName = this.inputName.nativeElement.value;
    let ingrAmount = this.inputAmount.nativeElement.value;
    this.addedIngredient.emit(new Ingredient(ingrName, ingrAmount));
  }
}
