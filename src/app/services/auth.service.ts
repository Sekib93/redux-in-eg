import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Usuario } from '../auth/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth,
    private firestor: AngularFirestore) { }

  initAuthListener() {
    this.auth.authState.subscribe(fUser => {
      console.log(fUser)
      console.log(fUser?.uid)
      console.log(fUser?.email)
    })
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }: any) => {
        const newUser = new Usuario(user?.uid, nombre, email);
        return this.firestor.collection('Usuarios').doc(`${user.uid}`)
          .set({...newUser});
      });
  }

  iniciarSesion(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  cerrarSesion() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }
}
