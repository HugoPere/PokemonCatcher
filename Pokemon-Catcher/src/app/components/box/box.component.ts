import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon'
import { PokemonCaptureServiceService } from 'src/app/services/pokemon-capture-service.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-box-',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  pokemons: Pokemon[];
  
  constructor(
    private pokemonService: PokemonCaptureServiceService,
    private router: Router
  ) {
    this.pokemons = [{
      captureTime: new Date,
      pokemonID: "000",
      pokemonImageURL: ".",
      pokemonName: "Loading",
      pokemonType_1: "Loading",
      pokemonType_2: "Loading",
      userID: "Loading"
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

    })
  }

  public goCatch(){
    this.router.navigate(['./main']);
  }

  async onClickDelete(pokemon: Pokemon) {
    const response = await this.pokemonService.deletePokemon(pokemon);
    console.log(response);
  }
}
