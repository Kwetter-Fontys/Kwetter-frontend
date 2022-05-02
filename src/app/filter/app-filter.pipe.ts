import { Pipe, PipeTransform } from '@angular/core';
import {User} from "../interfaces/User";

@Pipe({ name: 'appFilter' })
export class AppFilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} users
   * @param {string} searchText
   * @returns {any[]}
   */
  transform(users: User[], searchText: string): any[] {
    if (!users) {
      return [];
    }
    if (!searchText) {
      return users;
    }
    searchText = searchText.toLocaleLowerCase();

    return users.filter(user =>
      user.firstName.toLocaleLowerCase().includes(searchText) ||
      user.lastName.toLocaleLowerCase().includes(searchText));
  }
}
