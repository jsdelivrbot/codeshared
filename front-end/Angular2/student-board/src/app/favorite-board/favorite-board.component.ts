import { Component, Input, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver , ComponentFactory} from '@angular/core';
import { ItemComponent } from './../item/item.component';

@Component({
  selector: 'app-favorite-board',
  templateUrl: './favorite-board.component.html',
  styleUrls: ['./favorite-board.component.css']
})
export class FavoriteBoardComponent implements OnInit {
  @Input() set item(value: ItemComponent) {
    if (value) {
      this.selectFavItem(value);
    }
  }
  @ViewChild('favBoard', { read: ViewContainerRef }) favBoard: ViewContainerRef;
  constructor(private cfr: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  private selectFavItem(item: ItemComponent) {
    this.favBoard.clear();
    const componentFactory: ComponentFactory<ItemComponent> = this.cfr.resolveComponentFactory(ItemComponent);
    let itemRef = this.favBoard.createComponent(componentFactory);
    Object.assign(itemRef.instance, item);
  }

}
