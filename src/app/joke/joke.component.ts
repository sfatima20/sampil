import {Component, OnInit} from '@angular/core';
import {Joke} from "./joke.model";
import {Subscription} from "rxjs";
import {JokeService} from "./joke.service";

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css']
})
export class JokeComponent implements OnInit{
  joke: Joke = {"type": '', "setup": '', "punchline": '', "id": 0}
  private jokeSub: Subscription;

  constructor(private jokeService: JokeService) {
    this.jokeSub = new Subscription();
  }

  ngOnInit(){
    this.jokeService.getJoke();
    this.jokeSub = this.jokeService.getUpdatedJoke().subscribe((joke:Joke)=>{
      this.joke=joke;
      // console.log("from the console.joke: ",joke);
    });
  }
}