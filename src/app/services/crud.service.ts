import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  getDocs,
  limit,
  orderBy,
  updateDoc,
} from '@angular/fire/firestore';
import { query } from 'express';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private collectionName = 'camisas';

  constructor(private firestore: Firestore) {}

  async createItem(data: any): Promise<void> {
    const itemsCollection = collection(this.firestore, this.collectionName);
    await addDoc(itemsCollection, data);
  }

  // get
  getItems(): Observable<any[]> {
    const itemsCollection = collection(this.firestore, this.collectionName);
    return collectionData(itemsCollection, { idField: 'id' });
  }

  // update
  async updateItem(id: string, data: any): Promise<void> {
    const itemDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    await updateDoc(itemDoc, data);
  }

}
