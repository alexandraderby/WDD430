import {Injectable} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   contacts: Contact[] = [];
   constructor() {
      this.contacts = MOCKCONTACTS;
   }

   getContacts(id: string) {
       return this.contacts.slice();
   }

   getContact(id: string) {
       for (let contact of this.contacts) {
           if(id = contact.id) {
            return contact;
           } 
       }
   }


//    getIngredients() {
//     return this.ingredients.slice();
// }

// addIngredient(ingredient: Ingredient) {
//     this.ingredients.push(ingredient);
//     this.ingredientsChanged.emit(this.ingredients.slice());
// }

// addIngredients(ingredients: Ingredient[]) {
//     // for (let ingredient of ingredients) {
//     //     this.addIngredient(ingredient);
//     // }
//     this.ingredients.push(...ingredients);
//     this.ingredientsChanged.emit(this.ingredients.slice());

// }
}