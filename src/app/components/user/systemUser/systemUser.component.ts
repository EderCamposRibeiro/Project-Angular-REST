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

  users: Observable<SystemUser[]>;
  name: String;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getUserList().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(id: Number) {
    this.userService.deleteUser(id).subscribe(data => {
      console.log('Return from delete method: ' + data);
      this.userService.getUserList().subscribe(data => {
        this.users = data;
      });
    });
  }

  findUser() {
    this.userService.findUser(this.name).subscribe(data => {
      this.users = data;
    })
  }

}
