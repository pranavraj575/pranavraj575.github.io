---
layout: default
permalink: /toe
title: tictactoe
excerpt: "good luck"
author_profile: false
nav: false
og_image: /assets/img/cool_bunny.jpg
remove_dead_pixel: false
silly: true
---

{% assign box_style = "font-weight:bold;padding:1px;border:1px solid var(--global-text-color);height:50px;width:50px;text-align:center" %}

<table>
    <tr style="background-color:var(--global-bg-color)">
        <td class="hover_hardly_knower" id="ttt00" onclick="clickedToeSquare(0,0)" style="{{ box_style }}"></td>
        <td class="hover_hardly_knower" id="ttt01" onclick="clickedToeSquare(0,1)" style="{{ box_style }}"></td>
        <td class="hover_hardly_knower" id="ttt02" onclick="clickedToeSquare(0,2)" style="{{ box_style }}"></td>
    </tr>
    <tr style="background-color:var(--global-bg-color)">
        <td class="hover_hardly_knower" id="ttt10" onclick="clickedToeSquare(1,0)" style="{{ box_style }}"></td>
        <td class="hover_hardly_knower" id="ttt11" onclick="clickedToeSquare(1,1)" style="{{ box_style }}"></td>
        <td class="hover_hardly_knower" id="ttt12" onclick="clickedToeSquare(1,2)" style="{{ box_style }}"></td>
    </tr>
    <tr style="background-color:var(--global-bg-color)">
        <td class="hover_hardly_knower" id="ttt20" onclick="clickedToeSquare(2,0)" style="{{ box_style }}"></td>
        <td class="hover_hardly_knower" id="ttt21" onclick="clickedToeSquare(2,1)" style="{{ box_style }}"></td>
        <td class="hover_hardly_knower" id="ttt22" onclick="clickedToeSquare(2,2)" style="{{ box_style }}"></td>
    </tr>
</table>

<script>
class Toe {
    constructor(board=[[0,0,0],[0,0,0],[0,0,0]],player=NaN) {
        this.board = board;
        this.player = player;
        if (isNaN(this.player)){
            var cnt = 0;
            for (var row of this.board){
                for (var c of row){
                    cnt += c;
                }
            }
            if (cnt <= 0) {
                this.player = 1;
            }
            else {
                this.player = -1;
            }
        }
    }
    get open_spaces(){
        var temp=[];
        for (var i = 0; i<this.board.length; i++){
          for (var j = 0; j<this.board[i].length; j++){
            if(!this.board[i][j]){
              temp.push([i,j])
            }
          }
        }
        return temp;
    }
    get result(){
        var rows=[];
        var filled = true;
        for (var i = 0; i < 3; i++){
            rows.push([this.board[i][0],this.board[i][1],this.board[i][2]]);
            rows.push([this.board[0][i],this.board[1][i],this.board[2][i]]);
            for (var c of this.board[i]){
                filled = filled && (c!=0);
            }
        }
        rows.push([this.board[0][0],this.board[1][1],this.board[2][2]]);
        rows.push([this.board[0][2],this.board[1][1],this.board[2][0]]);
        for (var row of rows){
            if (row[0]==row[1] && row[1] == row[2] && row[0]!=0){
                return row[0];
            }
        }
        if (filled){
            return 0;
        }
        return NaN;
    }
    move(i,j){
        var bored = this.clone();
        bored.moveMutate(i,j);
        return bored;
    }
    moveMutate(i,j){
        this.board[i][j] = this.player;
        this.player = -this.player;
    }
    get children(){
        var children=[];
        for (var square of this.open_spaces){
            children.push(this.move(square[0],square[1]));
        }
        return children;
    }
    clone(){
        var board=[];
        for (var row of this.board){
            var temp=[];
            for (var c of row){
                temp.push(c);
            }
            board.push(temp);
        }
        return new Toe(board);
    }
    get string(){
        var s = "";
        for (var row of this.board){
            for (var c of row){
                s = s + String(c);
            }
        }
        return s;
    }
    optimalMoves(){
        // return outcome if every player plays optimally, and the next moves (overall, so if current player is -1, best is -1)
        var best = -this.player; // start off with a loss (1 for player -1, -1 for player 1)
        var moves = [];
        for (var square of this.open_spaces){
            var child = this.move(square[0],square[1]);
            var res = child.result;
            if (isNaN(res)){
                res = child.optimalMoves()[1];
            }
            if(res*this.player > best*this.player){
                // strictly better, reset to this as default
                moves=[square];
                best=res;
            }
            else if(res == best){
                // tie, push move to best moves
                moves.push(square);
            }
        }
        return [moves, best];
    }
}

var toeboard = new Toe();

let refreshBoard = () => {
    for (var i = 0; i<3; i++){
        for (var j = 0; j<3; j++){
            const c = toeboard.board[i][j];
            const sq = document.getElementById("ttt"+String(i)+String(j));
            if (c==1){
                sq.textContent = "X";
            }
            else if (c==-1){
                sq.textContent = "O";
            }
        }
    }
    if (!isNaN(toeboard.result)){
        setTimeout(function(){
            if (toeboard.result==0){
                //redirect to tie
                window.location.href = "/toe/tie";
            }
            else if (toeboard.result==-1){
                //redirect to lose
                window.location.href = "/toe/lose";
            }
            else if (toeboard.result==1){
                //redirect to win
                window.location.href = "/toe/win";
            }
        }, 1069);
    }
};

let clickedToeSquare = (i,j) => {
    var valid = false;
    for (var sq of toeboard.open_spaces){
        if (sq[0]==i && sq[1]==j){
            valid = true;
        }
    }
    // if the player is player 1, and the move is valid, and the game is not over, make the move
    if (toeboard.player==1 && valid && isNaN(toeboard.result)){
        toeboard.moveMutate(i,j);
        refreshBoard();
        if (isNaN(toeboard.result)){
            var all_opt = toeboard.optimalMoves()[0];
            var opt = all_opt[Math.floor(Math.random()*all_opt.length)];
            toeboard.moveMutate(opt[0], opt[1]);
            refreshBoard();
        }
    }
};
</script>

