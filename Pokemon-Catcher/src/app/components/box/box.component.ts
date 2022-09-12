import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon'
import { PokemonCaptureServiceService } from 'src/app/services/pokemon-capture-service.service'
import { getAuth } from "firebase/auth";
import { UserService } from 'src/app/services/user.service';
import { collection, addDoc, where } from 'firebase/firestore';
@Component({
  selector: 'app-box-',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  pokemons: Pokemon[];
  
  constructor(
    private pokemonService: PokemonCaptureServiceService
  ) {
    this.pokemons = [{
      captureTime: new Date(),
      pokemonID: "000",
      pokemonImageURL: ".",
      pokemonName: "test",
      pokemonType_1: "test",
      pokemonType_2: "test",
      userID: "test"
    }];
  }
  pokemon_Name: any;
  pokemon_Sprite: any;
  user_Name: any
  pokemon_Type_1: any;
  pokemon_Type_2: any;
  
  ngOnInit(): void {
    var i = 0;
    this.pokemonService.getPokemon().subscribe(pokemons =>  {
      
      this.pokemons = pokemons;

      while(i <= pokemons.length){
        this.pokemon_Name = this.pokemons[i].pokemonName;
        console.log("name in box is " + this.pokemons[i].pokemonName);
        this.pokemon_Sprite = this.pokemons[i].pokemonImageURL;
        console.log("sprite in box is " + this.pokemons[i].pokemonImageURL)
        this.pokemon_Type_1 = this.pokemons[i].pokemonType_1;
        console.log("type in box is " + this.pokemons[i].pokemonType_1)
        this.pokemon_Type_2 = this.pokemons[i].pokemonType_2;
        console.log("type in box is " + this.pokemons[i].pokemonType_2)
        i = i+1;
      }
    })
  }

}
