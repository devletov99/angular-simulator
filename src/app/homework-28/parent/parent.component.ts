import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { IUser } from '../IUser';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent {

  user: IUser = {
    name: 'Alex',
    age: 20,
  };

  changeName() {
  // в данном случае мы не обновляем ссылку на объект, поэтому angular не видит изменений и не запускает change detection, так как мы используем стратегию on push. При ее использовании change detection не обновляет интеерфейс, если для этого нет конкретной причины. 
  // this.user.name = 'Eugene';

  this.user = { name: 'Eugene', age: 20 };
  this.user = { ...this.user, name: 'Eugene' };
  }

}
