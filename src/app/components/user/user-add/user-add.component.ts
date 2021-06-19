import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SystemUser } from 'src/app/model/systemUser';
import { UserService } from 'src/app/service/user.service';
import { Telephone } from 'src/app/model/telephone';
import { NgbDateParserFormatter, NgbDateStruct, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string> {

readonly DELIMITER = '/';
    fromModel(value: string | null): NgbDateStruct | null {
        if (value) {
            const date = value.split(this.DELIMITER);
            return {
                day: parseInt(date[0], 10),
                month: parseInt(date[1], 10),
                year: parseInt(date[2], 10)
            };
        }
        return null;
    }
    toModel(date: NgbDateStruct | null): string | null {
        return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
    }

}

@Injectable()
export class FormatDate extends NgbDateParserFormatter {

    readonly DELIMITER = '/'; // 09/10/1980
    parse(value: string): NgbDateStruct | null {
        if (value) {
            const date = value.split(this.DELIMITER);
            return {
                day: parseInt(date[0], 10),
                month: parseInt(date[1], 10),
                year: parseInt(date[2], 10)
            };
        }
        return null;
    }

    format(date: NgbDateStruct): string | null {
        return date ? validateDay(date.day) + this.DELIMITER + validateDay(date.month) + this.DELIMITER + date.year : '';
    }

    toModel(date: NgbDateStruct | null): string | null {
        return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
    }

}
function validateDay(value) {
       // tslint:disable-next-line: radix
       if (value.toString !== '' && parseInt(value) <= 9) {
            return '0' + value;
        }
       return value;
    }

@Component({
  selector: 'app-root',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass: FormatDate } ,
              {provide: NgbDateAdapter, useClass: FormatDateAdapter}]
})
export class UserAddComponent implements OnInit {

  user = new SystemUser();

  telephone = new Telephone();

  constructor(private routeActive: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    const id = this.routeActive.snapshot.paramMap.get('id');

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
       // console.info("Updated user: " + data);
      });
    } else {
      this.userService.saveUser(this.user).subscribe(data => { /* Saving new user */
        this.newUser();
     //   console.info("Saved user: " + data);
      });
    }
  }

  deleteTelephone(id, i) {

    if (id == null) {
      this.user.telephones.splice(i, 1);
      return;
    }

    if (id !== null && confirm('Do you want to remove?')) {
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


















