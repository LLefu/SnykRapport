import {Pipe, PipeTransform} from '@angular/core';
import {User} from "../app/models/user";
import {UserService} from "../app/services/user.service";

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  constructor(private userService: UserService) {
  }


  transform(items: User[], searchText: string): User[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    return items.filter(it => {
      let user = this.userService.findUserById(it.id);
      return user.firstName.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
    });
  }

}
