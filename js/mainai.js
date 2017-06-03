
// check if the load save is supportted in browser
var canSave = false;
if (typeof(Storage) !== "undefined") {
  canSave = true;
}
// global variablies
var board = [null, null, null, null, null, null, null, null, null];

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


// function to make a good move for the AI
var playAIMove  = function () {
  // play in on of these squares if they are free
  if ($('#4').text() === '') {
    $('#' + 4).addClass('o').text('AI');
    board[4]= 'o';
  } else if ($('#0').text()==='') {
    $('#' + 0).addClass('o').text('AI');
    board[0]= 'o';
  } else if ($('#2').text()==='') {
    $('#' + 2).addClass('o').text('AI');
    board[2]= 'o';
  } else if ($('#6').text()==='') {
    $('#' + 6).addClass('o').text('AI');
    board[6]= 'o';
  } else if ($('#8').text()==='') {
    $('#' + 8).addClass('o').text('AI');
    board[8]= 'o';
  } else if ($('#1').text()==='') {
    $('#' + 1).addClass('o').text('AI');
    board[1]= 'o';
  } else if ($('#3').text()==='') {
    $('#' + 3).addClass('o').text('AI');
    board[3]= 'o';
  } else if ($('#5').text()==='') {
    $('#' + 5).addClass('o').text('AI');
    board[5]= 'o';
  } else if ($('#7').text()==='') {
    $('#' + 7).addClass('o').text('AI');
    board[7]= 'o';
  }
};

//FUNCTION CREATE RANDOM NUMBER
function randomNumber() {
  console.log(Math.floor(Math.random() * 8))
  return Math.floor(Math.random() * 8);
} //end of function

//FUNCTION TO SET A WIN LINE
var checkPlayer = function(){
  var current=0;
  // console.log('checkPlayer', wins);
  for (var i = 0; i < wins.length; i++) {
    var winState = wins[i];
    // console.log('winState:', winState);
    if( board[ winState[0] ] === player && board[ winState[1] ] === player && board[ winState[2] ] === player){
      return true;
    }//if
  }//for
  return false;
}; // end checkPlayer()

// /cell checks if have event addClass for it

if( canSave ){
  localStorage.setItem( 'players', JSON.stringify(players) );
}
// check DRAW
// if(turnCount === 8){// if( checkPlayer() )
//   $('#win span').html("DRAW!");
// }

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
    // $(this).text(players[player].name);
    // check the winner
    turnCount += 1
    console.log(turnCount);
    // check if HUMAN player (always 'x') has won
    if (checkPlayer()){
      $('#win span').html(players[player].name);
      $("div #turn").hide();

      $('#wins').html( players[player].name ).show();

      $( "div.im" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
      $( "div img.im" ).fadeIn( 300 ).delay( 2000 ).fadeOut( 400 );
      // add scores to the winner
      // if (player ==="x"){

      winX++;
      players[player].score=winX;
      $("#s1 span").html(players[player].score);
      // $("#s2 span").html(players[player].score);
      console.log("Your record of scores is "+ players[player].name);
      $("#playAgain").show();
      gameStart = false;

      // }
      // else {
      //   winO++;
      //   players[player].score=winO;
      //   $("#s2 span").html( players[player].score );
      //   // $("#s1 span").html(players[player].score);
      //   console.log("Your record of scores is "+ winO);
      //
      //   $("#playAgain").show();
      //   // $('#playButton').prop('disabled', false);
      //   gameStart = false;
      // }
      return;  // don't let AI have a turn if the human won!
    }
    //

    player = 'o';
    // // change player
    // if(player === "x"){
    //  player = "o";
    //  $("div#turn").html("Player turn: " + players[player].name);
    // } else{
    //  player = "x";
    //  $("div#turn").html("Player turn: " + players[player].name);
    // }


    // AI TURN
    playAIMove();

    // for (i=0; i < 9; i++) {
    //   var random = randomNumber();
    //   if(board[random] === null) {
    //     board[random] = 'o';
    //
    //     if ($('#4').text()==='') {
    //       // $('#4').text(#random);
    //       $('#' + random).addClass('o').text('AI');
    //     } else if ($('#0').text()==='') {
    //       // $('#0').text(#random);
    //       $('#' + random).addClass('o').text('AI');
    //     }
    //     else if ($('#2').text()==='') {
    //       // $('#2').text(#random);
    //       $('#' + random).addClass('o').text('AI');
    //     } else if ($('#3').text()==='') {
    //       // $('#3').text(#random);
    //       $('#' + random).addClass('o').text('AI');
    //     }
    //     else if ($('#5').text()==='') {
    //       // $('#5').text(#random);
    //       $('#' + random).addClass('o').text('AI');
    //     } else if ($('#6').text()==='') {
    //       // $('#6').text(#random);
    //       $('#' + random).addClass('o').text('AI');
    //     }
    //    else if ($('#8').text()==='') {
    //       // $('#8').text(#random);
    //       $('#' + random).addClass('o').text('AI');
    //     }//else
    //   break;
    //   }
    // } //end of AI


    // check if AI won
    if (checkPlayer()){
      // someone won the game!
      $('#win span').html(players[player].name);
      $('#wins').html( players[player].name ).show();
      $("div #turn").hide();

      $( "div.im" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
      $( "div img.im" ).fadeIn( 300 ).delay( 2000 ).fadeOut( 400 );
      // add scores to the winner
      // if (player ==="x"){
      //   winX++;
      //   players[player].score=winX;
      //   $("#s1 span").html(players[player].score);
      //   // $("#s2 span").html(players[player].score);
      //   console.log("Your record of scores is "+ players[player].name);
      //   $("#playAgain").show();
      //   gameStart = false;
      // }else{//

      winO++;
      players[player].score=winO;
      $('#win span').text("AI");
      ("#wins").show();
      $('#div wins').html ( $("#win").val());
      $("#s2 span").html( players[player].score );
      // $("#s1 span").html(players[player].score);
      console.log("Your record of scores is "+ winO);

      $("#playAgain").show();
      // $('#playButton').prop('disabled', false);
      gameStart = false;

      //  }
      return;

    } else if(turnCount === 9){        // if( checkPlayer() )
      $('#win span').html("DRAW!");
    }

    turnCount += 1;
    console.log(turnCount);
    player = 'x'; // change back to HUMAN player because it is their turn again, after the AI is finished

  }); // $('.sq').on('click')

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
    turnCount = 0;
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
    turnCount = 0;

    player  = 'x';

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
