
// check if the load save is supportted in browser
var canSave = false;
if (typeof(Storage) !== "undefined") {
  canSave = true;
}
// global variablies
var board = [null, null, null, null, null, null, null, null, null];

var stillEmpty = [0,1,2,3,4,5,6,7,8];

var wins= [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

var players = {

  x: {
    name: '',
    score: 0
  },

  o: {
    name: '',
    score: 0
  }

};

var player ="x";
var winX =0;
var winO =0;
var gameStart= false;

var turnCount = 0;

// START DEFAULT AS X
// var playerTurn = "X";
// var computerTurn = "O";
// var buttons = document.getElementById("board");
//     console.log(buttons);

//FUNCTION CREATE RANDOM NUMBER
function randomNumber() {
  console.log(Math.floor(Math.random() * 8))
  return Math.floor(Math.random() * 8);
} //end of function

//FUNCTION TO SET A WIN LINE

var checkPlayer = function(){
  var current=0;
  console.log('checkPlayer', wins);
  for (var i = 0; i < wins.length; i++) {
    var winState = wins[i];
    console.log('winState:', winState);
    if( board[ winState[0] ] === player && board[ winState[1] ] === player && board[ winState[2] ] === player){
      return true;
    }//if
  }//for
};//func
// /cell checks if have event addClass for it

if( canSave ){
  localStorage.setItem( 'players', JSON.stringify(players) );
}

// check DRAW
if(turnCount === 8){// if( checkPlayer() )
  $('#win span').html("DRAW!");
}
// IF TRY AND CLICK ON ALREADY CLICKED, GIVE MESSAGE
if ($(this).text() === "X" || $(this).text() === "O") {
  alert("Already clicked, choose another box");
  // return;
} else {
  //ADD TEXT TO BUTTON
  $(this).text(player);
}

$(document).ready(function(){

  $('.sq').on('click',function(event){

    if (!gameStart) {
      return;
    }
    var select = $(this);

    if (select.hasClass('x')|| select.hasClass('o')){
      return;
    }

    var boardIndex = parseInt( this.id );
    // var value_input = $("input[name*='xxxx']").val();

    select.addClass(player.toLowerCase()).text(players[player].name);
    // change cell content her
    board[boardIndex]= player.toLowerCase();

    // this.id = 4
        // indexes:  0,1,2
    // stillEmpty = [0,1,2,3,5,6,7,8];

    var notEmptyIndex = stillEmpty.indexOf( this.id );
    stillEmpty[notEmptyIndex]= null;

    // stillEmpty.splice(notEmptyIndex,1);
    // $(this).text(players[player].name);
    // check the winner
    // checkPlayer();

    // if (checkPlayer()){
    //   // someone won the game!
    //   $('#win span').html(players[player].name);
    //   $("div #turn").hide();
    //
    //   $( "div.im" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
    //   $( "div img.im" ).fadeIn( 300 ).delay( 2000 ).fadeOut( 400 );
    //   // add scores to the winner
    //   if (player ==="x"){
    //     winX++;
    //     players[player].score=winX;
    //     $("#s1 span").html(players[player].score);
    //     // $("#s2 span").html(players[player].score);
    //     console.log("Your record of scores is "+ players[player].name);
    //     $("#playAgain").show();
    //     gameStart = false;
    //   }else{
    //     winO++;
    //     players[player].score=winO;
    //     $("#s2 span").html( players[player].score );
    //     // $("#s1 span").html(players[player].score);
    //     console.log("Your record of scores is "+ winO);
    //     // alert("Your record of scores is "+ players[player].score);
    //     $("#playAgain").show();
    //     // $('#playButton').prop('disabled', false);
    //     gameStart = false;
    //     // return;
    //    }
    // }// checkPlayer() set the info in database

    turnCount += 1;

    // AI TURN
    for (i=0; i < 9; i++) {
      var random = randomNumber();
      if ( board[random] === null ) {
        board[random] = 'o';
        $('#' + random).addClass('o').text('AI');
        break;
      }

    } //end of AI


    // for (i=0; i < 9; i++) {
    //   var random = randomNumber();
    //   if(board[random] === null) {
    //     board[random] = 'o';
    //
    //     $('#' + random).addClass('o').text('AI');
    //
    //     break;
    //   }
    // } //end of AI

    turnCount += 1;

    // if(player === "x"){
    //   player = "o";
    //   $("div#turn").html("Player turn: " + players[player].name);
    //
    // } else{
    //   player = "x";
    //   $("div#turn").html("Player turn: " + players[player].name);
    //
    // }
    // turnCount += 1;// number of clicks in the board game


  }); // $('.sq').on('click')
  //checkPlayer

  // checkPlayer
  var check = function(){
    // someone won the game!
    checkPlayer();
    if (checkPlayer){
    $('#win span').html(players[player].name);
    $("div #turn").hide();

    $( "div.im" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
    $( "div img.im" ).fadeIn( 300 ).delay( 2000 ).fadeOut( 400 );
    // add scores to the winner
    if (player ==="x"){
      winX++;
      players[player].score=winX;
      $("#s1 span").html(players[player].score);
      // $("#s2 span").html(players[player].score);
      console.log("Your record of scores is "+ players[player].name);
      $("#playAgain").show();
      gameStart = false;
    }else{
      winO++;
      players[player].score=winO;
      $("#s2 span").html( players[player].score );
      // $("#s1 span").html(players[player].score);
      console.log("Your record of scores is "+ winO);
      // alert("Your record of scores is "+ players[player].score);
      $("#playAgain").show();
      // $('#playButton').prop('disabled', false);
      gameStart = false;
      // return;
     }
   }
  }// checkPlayer() set the info in database


  // show text of the names at the begining for some time and fade out
  $( "div#show" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 1000 );
  // show the value who player turn
  $("turn").val("");
  //
  if( canSave ){
    // load saved game
    var savedGame = JSON.parse( localStorage.getItem('players') );
    if( savedGame !== null){
      players = savedGame;
    }
  }

  // function continue playing
  $('#cont').on('click',function (ev) {
    console.log('#cont click');
    $( "div#reply" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 1000 );
    $("td").removeClass("x o").html('');
    board = [null, null, null, null, null, null, null, null, null];
    turnCount = 0;
    $("td").html("");
    gameStart = true;
    $("#s1 span").html( players[player].score );
    $("#s2 span").html( players[player].score );
  });//ev

// function playButton
  $('#playButton').on('click',function (event) {
    console.log('PLAY clicked!');
    $("div#turn").show();
    $("div#turn").html("Player turn: " + $("#player1").val());
    // debugger
    players['x'].name  = $("#player1").val();
    players['o'].name  = $("#player2").val();
    // debugger;
    if (players['x'].name==='' || players['o'].name ===''){
      $( "div#show" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
      return;
    } else if (players['x'].name=== players['o'].name ){
      $( "div#show" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
      // gameStart=false;
      return;
    }

    console.log(players[player].name);
    $(this).prop('disabled', true);
    gameStart = true;
    $("#p1 span").html(  $("#player1").val()   );
    $("#p2 span").html(  $("#player2").val()   );
    $("#s1 span").html("0");
    $("#s2 span").html("0");
    // checkPlayer();
  });

  // reset function
  $("#reset").on('click',function(event){
    $( "div#show" ).fadeIn( 300 ).delay( 2000 ).fadeOut( 1000 )
    $("td").html("");
    board = [null, null, null, null, null, null, null, null, null];
    $("td").removeClass("x o");
    $("#player1").val("");
    $("#player2").val("");
    // $("#turn").val("");
    $("#turn").hide();
    players.x.name = '';
    players.o.name = '';
    gameStart = false;
    $('#playButton').prop('disabled', false);
    $("#win span").html ( $("#win").val());
    $("#p1 span").html ( $("#p1").val());
    $("#p2 span").html ( $("#p2").val());
    $("#s1 span").html(   $("#s1").val()   );
    $("#s2 span").html(   $("#s2").val()   );
  });

});//ready
