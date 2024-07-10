import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, getDocs, query, orderBy, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { TarjetaCredito } from '../models/TarjetaCredito';
import { Observable, Subject, async } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private tarjeta$= new Subject<any>();

  constructor(private firestore: Firestore) {

  }

  async AgregarTarjeta(tarjeta:TarjetaCredito):Promise<any>{

    return await addDoc( collection(this.firestore, 'tarjetas'), tarjeta);
  }

  obtenerTarjeta():Observable<any>{

    const tarjetaRef= (collection(this.firestore, 'tarjetas'));

    const q = query(tarjetaRef, orderBy ('fechaCreacion', 'desc'));

    return collectionData(q, { idField: 'id' });


}

  deleteTarjeta(id: any):Promise<any> {

      const docRef= doc((collection(this.firestore, 'tarjetas')), id);
      return deleteDoc(docRef);

}

async updateTarjeta(id:string, tarjeta:any):Promise<any>{

  const tarjetaRef= doc((collection(this.firestore, 'tarjetas')), id);

  const data = {
    titular: tarjeta.titular,
    fechaExpiracion:tarjeta.fechaExpiracion,
    numeroTarjeta:tarjeta.numeroTarjeta,
    cvv:tarjeta.cvv,
    fechaActualizacion:tarjeta.fechaActualizacion
  };

  return await updateDoc(tarjetaRef, data);

}

enviarTarjetaEdit(tarjeta:TarjetaCredito){
  this.tarjeta$.next(tarjeta);

}

getTarjetaEdit():Observable<any>{
    return this.tarjeta$.asObservable();

}
}
