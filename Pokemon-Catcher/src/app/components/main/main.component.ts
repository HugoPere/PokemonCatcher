import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/AuthService.service';
import {FormControl, FormGroup} from '@angular/forms';
import { PokemonCaptureServiceService } from 'src/app/services/pokemon-capture-service.service'
import { Pokemon } from '../../interfaces/pokemon'
import { Value } from 'firebase/remote-config';
import { getAuth } from "firebase/auth";
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import { NgModule } from '@angular/core';

declare var $: any;


//obtenemos la data del pokemon
function fetchPokemon(id: number){
    
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(res =>{
          if(!res.ok){
            if (res.status !== 404)
            throw new Error(
              `Error with fetch petition, status code: ${res.status}`
            );
          throw new Error("Upppsss, Your Pokemon could not be Found");
          }
          return res.json()
          
        })
        .then((res)=> {
          console.log("EL POKE ES " + res.name);
          //return res;
          return createPokemon(res);
          }
        )
        
}

//obtenemos el nombre del pokemon
function createPokemon(pokemon: any){
    
    const poke = pokemon;
    return poke;
}


//declare var pokename: any;
var pokeID: any;
var pokemonName: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

//en el export se pone las funciones que usa el usuario
export class MainComponent implements OnInit {

  formulario: FormGroup;
  capturedPokemon: Pokemon;
  constructor(
    private userService: UserService,
    private router: Router,
    private pokemonCapturseService: PokemonCaptureServiceService
    
  ) { 
    this.formulario = new FormGroup({
      captureTime: new FormControl(),
      pokemonID: new FormControl(),
      pokemonImageURL: new FormControl(),
      pokemonName: new FormControl(),
      pokemonTypo: new FormControl(),
      userID: new FormControl()
    })

  }

  title= 'Pokemon-Catcher';
  pokemon_Name: any;
  pokemon_Sprite: any;
  pokemon_type_1: any;
  pokemon_type_2: any;
  user_Name: any
  Poke: Pokemon;
  items: MenuItem[];
  //CUANDO EL SITIO INICIA, SE DECLARA UN POKEMON NUEVO
  ngOnInit(): void {
    $(document).ready(async () => {
      
      this.items = [
        {label: 'New', icon: 'pi pi-fw pi-plus'},
        {label: 'Open', icon: 'pi pi-fw pi-download'},
        {label: 'Undo', icon: 'pi pi-fw pi-refresh'}
    ];

      const auth = getAuth();
      const user = auth.currentUser?.displayName;
      //console.log(user?.displayName);

      pokeID = Math.floor(Math.random() * 802);
      var pokename =  fetchPokemon(pokeID);
      
      pokename.then((value) => {
        this.user_Name = user
        this.pokemon_Name = value.name;
        this.pokemon_Sprite = value.sprites.front_default;
        
        if (value.types.length > 1){
          console.log("entre al if del tipo 2");
          this.pokemon_type_1 = value.types[0].type.name;
          this.pokemon_type_2= value.types[1].type.name;
        }
        else{
          console.log("entre al else");
          console.log("el leng es " + value.types.lenght);
          console.log("value.types da " + value.types.length)
          this.pokemon_type_1 = value.types[0].type.name;
          this.pokemon_type_2 = " ";
        }
      }).catch((err) => {
        console.log(err);
      });
      
  });
  }
  //FUNCION PARA CAPTURAR POKEMON
  public async capturePokemon(ball: number){
    var captureChance: any;
    var captured= 0;
    if(ball == 1){ //pokeball, 25%
      captureChance = Math.floor(Math.random() * 100);
      if (captureChance > 75){
        captured = 1;
      }
      else{
        alert("Pokemón huyo!");
        window.location.reload();
      }
    }
    else if(ball == 2){ //ultraball, 70%
      captureChance = Math.floor(Math.random() * 100);
      if (captureChance > 30){
        captured = 1;
      }
      else{
        alert("Pokemón huyo!");
        window.location.reload();
      }
    }
    else{ //masterball, 100%
      captured= 1;
    }

    if (captured == 1){
      var pokename =  fetchPokemon(pokeID);
      //SI EXISTE EL POKEMON
      pokename.then(async (value) => {
        const auth = getAuth();
        const user = auth.currentUser?.email;
        var capturedPokemonName = value.name;
        var capturedPokemonID = value.id;
        var capturedPokemonSprite = value.sprites.front_default;
        var capturedPokemonType= value.types[0].type.name;
        var capturedPokemonType_2 = "no type";
        if (value.types.length > 1){
          capturedPokemonType_2= value.types[1].type.name;
        }
        let x: Pokemon = {
          captureTime: new Date(),
          pokemonID: capturedPokemonID,
          pokemonImageURL: capturedPokemonSprite,
          pokemonName: capturedPokemonName,
          pokemonType_1: capturedPokemonType,
          pokemonType_2: capturedPokemonType_2,
          userID: user
        }
        const response = await this.pokemonCapturseService.capturePokemon(x);
        alert("Capturado!")
        window.location.reload();
        
      }).catch((err) => {
        console.log(err);
      });
    }
    
  }
  //FUNCION PA IRSE AL BOX
  public showPokemon(){
    this.router.navigate(['/box']);
  }
  //FUNCION PARA RECARGAR EL SITIO
  public keepSearch(){
    window.location.reload();
  }
  //FUNCION PARA LOGUEARSE FUERA
  onClick() {
    this.userService.logout()
      .then(() => {
        //LLEVA DE VUELTA AL SITIO DE LOGIN
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }

}