import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { AddIngredient, DeleteIngredient, UpdateIngredient } from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shForm: NgForm;

  editMode: boolean;
  editIndex: number;
  editedIngredient: Ingredient;
  subscriptionEditIndex: Subscription;

  constructor(private slService: ShoppingListService, private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) { }

  ngOnInit(): void {
    this.subscriptionEditIndex = this.slService.startEdit.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editIndex = index;
        this.editedIngredient = this.slService.getIngredient(index);

        this.shForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount,
        });
      }
    );
  }

  onSubmit() {
    const values = this.shForm.value;
    const newIngredient = new Ingredient(values.name, values.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editIndex, newIngredient);
      this.store.dispatch(new UpdateIngredient({ ingredient: newIngredient, index: this.editIndex }))
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new AddIngredient(newIngredient))
    }
    this.onClear();
  }

  onDeleteIngredient() {
    // this.slService.deleteIngredient(this.editIndex);
    this.store.dispatch(new DeleteIngredient(this.editIndex))
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.shForm.reset();
  }

  ngOnDestroy(): void {
    this.subscriptionEditIndex.unsubscribe();
  }
}
