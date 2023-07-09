import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  mark: string = "";
  title = 'xox-game';
  games: string[] = [];
  moves: string[] = [];
  winnerArrray: number[] = [];
  gameover: boolean = false;
  message: string = "";
  tieControl: boolean = false;
  
  constructor() {
    this.NewGame();
  }
  //Mark placement
  SetMark(index: number) {
    if (this.games[index] == "" && !this.gameover && !this.tieControl) {
      this.games[index] = this.mark;
      this.moves.push(this.mark);
      this.isGameOver();
      if (this.tieControl) {
        this.message = "The game is tie";
        this.gameover = true;
      }
      if (this.mark == "X") {
        this.mark = "O";
      }
      else {
        this.mark = "X";
      }
    } else {
      alert("This field has already been filled.");
    }
    if (!this.gameover && !this.tieControl)
      this.message = `Next Turn: ${this.mark}`
  }
  //For restarting game set all values to default;
  NewGame() {
    this.games = ["", "", "", "", "", "", "", "", ""]
    this.mark = "X";
    this.message = "Next Turn: X"
    this.moves = [];
    this.winnerArrray = [];
    this.gameover = false;
    this.tieControl = false;
  }
  isGameOver() {
    //Check Rows
    for (let j = 0; j < 9 && !this.gameover; j += 3) {
      if (this.games[j] == this.games[j + 1] && this.games[j + 1] == this.games[j + 2] && this.games[j] != "") {
        this.winnerArrray.push(j, j + 1, j + 2)
        this.gameover = true;
        break;
      }
    }
    //Check Cols
    for (let j = 0; j < 3 && !this.gameover; j++) {
      if (this.games[j] == this.games[j + 3] && this.games[j + 3] == this.games[j + 6] && this.games[j] != "") {
        this.winnerArrray.push(j, j + 3, j + 6)
        this.gameover = true;
        break;
      }
    }
    //Check left top to right bottom
    if (this.games[0] == this.games[4] && this.games[4] == this.games[8] && !this.gameover && this.games[0] != "") {
      this.winnerArrray.push(0, 4, 8)
      this.gameover = true;
    }
    //Check right top to left bottom
    if (this.games[2] == this.games[4] && this.games[4] == this.games[6] && !this.gameover && this.games[2] != "") {
      this.winnerArrray.push(2, 4, 6)
      this.gameover = true;
    }
    //if still game is not over check is it tie
    if (!this.gameover)
      this.Tie();
    //if game is over set the message
    if (this.gameover) {
      this.message = "The winner is: " + this.mark;
    }
  }
  Tie() {
    this.tieControl = true;
    for (let value of this.games) {
      if (value == "") {
        this.tieControl = false;
        break;
      }
      console.log("Tie Control:" + value);

    }
  }
  //if game is over check the winning condition cells and make these background green
  Winner(index: number) {
    for (let i of this.winnerArrray) {
      if (i == index) {
        return "btn-success";
      }
    }
    return "";
  }

}
