import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Observable } from 'rxjs';
import { SystemUser } from 'src/app/model/systemUser';

@Component({
  selector: 'app-root',
  templateUrl: './systemUser.component.html',
  styleUrls: ['./systemUser.component.css']
})
export class SystemUserComponent implements OnInit {

  users: Array<SystemUser[]>;
  name: string;
  total: number;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserList().subscribe(data => {
      this.users = data.content;
      this.total = data.totalElements;
    });
  }

  deleteUser(id: number, index) {

    if (confirm('Do you really want to delete?')) {

      this.userService.deleteUser(id).subscribe(data => {

        this.users.splice(index, 1); // Remove from screen

      });
    }
  }

  findUser() {

    if (this.name === '') {
      this.userService.getUserList().subscribe(data => {
        this.users = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.userService.findUser(this.name).subscribe(data => {
        this.users = data.content;
        this.total = data.totalElements;
      });
    }

  }

  chargingPage(page) {

    if (this.name !== '') {
      this.userService.findUserByPage(this.name, (page - 1)).subscribe(data => {
        this.users = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.userService.getUserListPage(page - 1).subscribe(data => {
        this.users = data.content;
        this.total = data.totalElements;
      });
    }

  }

}
