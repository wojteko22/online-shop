import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UpdateUserPassword} from '../password/updateUserPassword';
import {User} from '../-models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get<User[]>(this.url);
  }

  getCurrentUserInfo() {
    return this.http.get<User>(this.url + '/me');
  }

  getUser(id: number) {
    const url = `${this.url}/${id}`;
    return this.http.get<User>(url);
  }

  changeUserPassword(id: number, updateUserPassword: UpdateUserPassword) {
    const url = `${this.url}/${id}/password`;
    return this.http.put(url, updateUserPassword);
  }

  deleteUser(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  isAccountActivated(email: string) {
    const url = `${this.url}/${email}/isActivated`;
    return this.http.get<Boolean>(url)
  }

  activateUser(token: string) {
    const url = environment.apiUrl+"/user/activate/"+token;
    console.log("Activate user url:"+url);
    return this.http.get(url)
  }
}
