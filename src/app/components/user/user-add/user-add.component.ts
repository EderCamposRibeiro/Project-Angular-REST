import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SystemUser } from 'src/app/model/systemUser';
import { UserService } from 'src/app/service/user.service';
import { Telephone } from 'src/app/model/telephone';

@Component({
  selector: 'app-root',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  user = new SystemUser();

  telephone = new Telephone();

  constructor(private routeActive: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.userService.getUser(id).subscribe(data => {
        this.user = data;
      });
    }
  }

  saveUser() {
    if (this.user.id != null && this.user.id.toString().trim() != null) { /* Updating/Editing */
      this.userService.updateUser(this.user).subscribe(data => {
        this.newUser();
        console.info("Updated user: " + data);
      });
    } else {
      this.userService.saveUser(this.user).subscribe(data => { /* Saving new user */
        this.newUser();
        console.info("Saved user: " + data);
      });
    }
  }

  deleteTelephone(id, i) {

    if (id == null) {
      this.user.telephones.splice(i, 1);
      return;
    }

    if(id !== null && confirm("Deseja remover?")){
      this.userService.removeTelephone(id).subscribe(data => {
        this.user.telephones.splice(i, 1);
      });
    }
  }

  addPhone() {
    if (this.user.telephones === undefined) {
      this.user.telephones = new Array<Telephone>();
    }
    this.user.telephones.push(this.telephone);
    this.telephone = new Telephone(); 
  }

  newUser() {
    this.user = new SystemUser();
    this.telephone = new Telephone();
  }

}


















