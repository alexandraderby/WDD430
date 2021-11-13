import { Component} from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
// import { EventEmitter } from "stream";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    //dataStorageService: any;

    constructor(private dataStorageService: DataStorageService) {}

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }
}