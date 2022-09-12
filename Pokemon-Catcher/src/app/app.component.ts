import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  implements OnInit {
  title= 'Pokemon-Catcher';
  pokemon_Name: any;
  pokemon_Sprite: any;

  //CUANDO EL SITIO INICIA, SE DECLARA UN POKEMON NUEVO
  ngOnInit()
  {
    $(document).ready(async () => {
        
        pokeID = Math.floor(Math.random() * 802);
        var pokename =  fetchPokemon(pokeID);
        pokename.then((value) => {
          this.pokemon_Name = value.name;
          this.pokemon_Sprite = value.sprites.front_default;
        }).catch((err) => {
          console.log(err);
        });
        
    });
  }

  //FUNCION PARA CAPTURAR EL POKEMON
  // public capturePokemon(){

  //   var pokename =  fetchPokemon(pokeID);
  //       pokename.then((value) => {
  //         alert("capturado el pokemon AAAAAAA" + value.name); 
  //         console.log("toy en el main");
  //       }).catch((err) => {
  //         console.log(err);
  //       });
  // }

  //FUNCION PARA MOSTRAR POKEMON
  public showPokemon(){
    alert("TODO")
  }

}
