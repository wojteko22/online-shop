import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PasswordReminderService} from '../password-reminder.service';
import {UpdateUserPasswordUsingTokenDto, UserTokenDto} from '../UserTokenDto';
import {SnackBarService} from '../../snack-bar.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-password-reminder',
  templateUrl: './password-reminder.component.html',
  styleUrls: ['./password-reminder.component.css'],
  providers: [PasswordReminderService]
})
export class PasswordReminderComponent implements OnInit {

  formEmail: FormGroup;
  formToken: FormGroup;
  formPassword: FormGroup;
  stepOne: string = "visible";
  stepTwo: string = "hidden";
  stepThree: string = "hidden";

  userTokenDto: UserTokenDto;

  constructor(private fb: FormBuilder,
              private reminderService: PasswordReminderService,
              private snackBar: SnackBarService,
              private router: Router) {
    this.formEmail = this.fb.group({email: ['']});
    this.formToken = this.fb.group({token: ['']});
    this.formPassword = this.fb.group({
      password: [''],
      passwordConfirmation: ['']
    });
  }

  ngOnInit() {
  }

  onTokenRequestSubmit() {
    this.reminderService.sendReminderToken(this.formEmail.get('email').value).subscribe((userTokenDto) => {
      this.stepOne="hidden";
      this.stepTwo="visible";
      this.userTokenDto=userTokenDto;
      this.snackBar.show("Na podany adres email został wysłany token przypominający!")
    })
  }

  tokenSubmit(){
    let token = this.formToken.get("token").value;
    if(token===this.userTokenDto.token){
      this.stepTwo="hidden";
      this.stepThree="visible";
    } else {
      this.snackBar.show("Token niepoprawny!");
    }
  }

  changePassword(){
    let password = this.formPassword.get("password").value;
    let passwordConfirmation = this.formPassword.get("passwordConfirmation").value;
    if(password===passwordConfirmation){
      let dto: UpdateUserPasswordUsingTokenDto = new UpdateUserPasswordUsingTokenDto();
      dto.email=this.userTokenDto.email;
      dto.token=this.userTokenDto.token;
      dto.password=password;
      console.log("UpdateUserPasswordDto:");
      console.log(dto);
      this.reminderService.changePasswordUsingToken(dto).subscribe(() => {
        this.snackBar.show("Hasło zostało zmienione!");
        setInterval(() => {
          this.router.navigate(["/login"]);
        }, 1000)
      })
    }
  }
}
