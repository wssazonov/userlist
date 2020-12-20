import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  usersCollectionRef: AngularFirestoreCollection<User>;
  user$: Observable<User[]>;
  users;

  constructor(private userService: UsersService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    return this.userService.getUsers().subscribe(res => (this.users = res.map(e => {
      console.log(e);
      const data = e.payload.doc.data() as User;
      data.id = e.payload.doc.id;
      return data;
    }),
    console.log(this.users)));
  }

  create(user: User) {
    this.userService.createUser(user);
  }

  update(user: User) {
    this.userService.updateUser(user);
  }

  delete(userId: string) {
    this.userService.deleteUser(userId);
  }

}
