import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  @ViewChild('inputName') inputName: ElementRef;
  @ViewChild('inputAmount') inputAmount: ElementRef;

  constructor(private slService: ShoppingListService) {}

  addIngr() {
    let ingrName = this.inputName.nativeElement.value;
    let ingrAmount = this.inputAmount.nativeElement.value;
    this.slService.addIngredient(new Ingredient(ingrName, ingrAmount));
  }
}
