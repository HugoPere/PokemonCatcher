import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, where, query } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonCaptureServiceService {

  constructor(private firestore: Firestore) { }
  
  public capturePokemon(pokemon: Pokemon){
    const pokemonRef = collection(this.firestore, 'Pokemon');
    return addDoc(pokemonRef, pokemon);
  };

  public getPokemon(): Observable<Pokemon[]>{
    const pokemonRef = collection(this.firestore, 'Pokemon');
    const auth = getAuth();
    const user = auth.currentUser?.email;
    const q = query(pokemonRef, where("userID", "==", user));
    
    return collectionData(q, {idField: 'pokemonID'}) as Observable<Pokemon[]>;
  }
}
