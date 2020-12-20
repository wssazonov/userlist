import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '../../users.service';
import { User } from 'src/app/user.model';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  surname: string;
  name: string;
  phoneNumber: any;
  text: string;
  phone: any;
  link: string;

  userAddForm: FormGroup;
  fieldsForm = new FormArray([]);
  isUpdatingUser = false;
  newField = false;
  updateUserId;
  pageState = '';
  fieldType = '';

  private routeSub: Subscription;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private _location: Location,
              private usersService: UsersService,
              private router: Router) { }

  ngOnInit() {
    this.routeSub = this.route.params
      .subscribe(params => {
        this.updateUserId = params['userId'];
        if (this.updateUserId) {
          this.pageState = 'Edit';
        } else {
          this.pageState = 'Add';
        }
      });
    this.initForm();
  }

  addNewField() {
    this.newField = !this.newField;
  }

  onSelectionChange(item) {
    console.log(item);
    this.fieldType = item;
  }

  // addField() {
  //   this.fieldsForm.push(new FormControl(''));
  //   this.fieldsForm.push()
  // }

  initForm() {
    this.userAddForm = this.formBuilder.group({
      userId: [''],
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      phoneNumber: ['', [Validators.pattern(/^\d{10}$/)]],
      fieldType: [''],
      fieldsForm: this.formBuilder.array([])
    });
    // if (this.updateUserId >= 0) {
    //   this.getUserByID();
    // }
  }

  createItem(): FormGroup {
    console.log(this.fieldType);
    switch (this.fieldType) {
      case 'fieldText':
        return this.formBuilder.group({
          text: '',
        });
      case 'fieldNumber':
        return this.formBuilder.group({
          phone: '',
        });
      case 'fieldLink':
        return this.formBuilder.group({
          link: '',
        });
    }
    // return this.formBuilder.group({
    //   text: '',
    //   phone: '',
    //   link: ''
    // });
  }

  newText(): FormGroup {
    return this.formBuilder.group({
      text: '',
    });
  }

  newPhone(): FormGroup {
    return this.formBuilder.group({
      phone: '',
    });
  }

  newLink(): FormGroup {
    return this.formBuilder.group({
      link: '',
    });
  }

  addItem(): void {
    this.fieldsForm = this.userAddForm.get('fieldsForm') as FormArray;
    console.log(this.fieldsForm);
    // switch (this.fieldType) {
    //   case 'text':
    //     this.fieldsForm.push(
    //       this.formBuilder.group({
    //         text: '',
    //       })
    //     );
    //     break;
    //   case 'phone':
    //     this.fieldsForm.push(
    //       this.formBuilder.group({
    //         phone: '',
    //       })
    //     );
    //     break;
    //   case 'link':
    //     this.fieldsForm.push(
    //       this.formBuilder.group({
    //         link: '',
    //       })
    //     );
    // }
    this.newField = !this.newField;
    this.fieldsForm.push(this.createItem());
  }

  removeItem(index: number) {
    this.fieldsForm.removeAt(index);
  }

  patchForm(userToEdit) {
    const formValue = {...userToEdit};
    this.userAddForm.patchValue(formValue);
    this.userAddForm.markAsPristine({onlySelf: true});
  }

  backClicked() {
    this._location.back();
  }

  sendUser() {
    console.log(this.userAddForm.value);

    if (this.userAddForm.valid === true) {
      this.userAddForm.disable();
      const itemUserToAdd: User = {
        name: this.userAddForm.value.name,
        surname: this.userAddForm.value.surname,
        phoneNumber: this.userAddForm.value.phoneNumber,
        id: null
      };
      if (!this.isUpdatingUser) {
        delete itemUserToAdd.id;
        this.usersService.createUser(itemUserToAdd)
          .then(() => {
            this.router.navigate(['/']);
          });
      } else {
        itemUserToAdd.id = this.updateUserId;
        this.usersService.updateUser(itemUserToAdd)
          .then(() => {
            this.router.navigate(['/']);
          }, () => {
            this.userAddForm.enable();
          });
      }
    }
  }

}
