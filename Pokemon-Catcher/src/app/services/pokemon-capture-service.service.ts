import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonCaptureServiceService {

  constructor(private firestore: Firestore) { }
  
  public capturePokemon(pokemon: Pokemon){
    console.log("Estoy en el servicio");
    
    console.log("Desde el servicio el id es " + pokemon.pokemonID);
    console.log("Desde el servicio el nombre es " + pokemon.pokemonName);
    console.log("Desde el servicio el tipo es " + pokemon.pokemonTypo);
    console.log("Desde el servicio el sprite es " + pokemon.pokemonImageURL);
    const pokemonRef = collection(this.firestore, 'Pokemon');
    return addDoc(pokemonRef, pokemon);
  }
}
