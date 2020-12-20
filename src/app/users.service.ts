import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../app/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersCollectionRef: AngularFirestoreCollection<User>;
  user$: Observable<User[]>;

  constructor(private firestore: AngularFirestore) { }

  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

  createUser(user: User) {
    console.log(user);
    return this.firestore.collection('users').add(user);
  }

  updateUser(user: User) {
    delete user.id;
    return this.firestore.doc('users/' + user.id).update(user);
  }

  deleteUser(userId: string) {
    this.firestore.doc('users/' + userId).delete();
  }

}
