import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string) {
    // localStorage.setItem('token', token);
    setCookie('token-trello', token, { expires: 365, path: '/' }); // nombre de la cookie, valor de la cookie, opciones: expiración y la ruta de la aplicación en la que se quiere dejar disponible (en este caso en todas las rutas)
  }

  getToken() {
    // return localStorage.getItem('token');
    const token = getCookie('token-trello');
    return token;
  }

  removeToken() {
    // localStorage.removeItem('token');
    removeCookie('token-trello');
  }
}
