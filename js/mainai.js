
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
    score: 0,
    image:''
  },

  o: {
    name: '',
    score: 0,
    image:''
  }

};

var player ="x";
var winX =0;
var winO =0;
var gameStart= false;

var turnCount = 0;
var multiplayerSelected = false;

// START DEFAULT AS X
// var playerTurn = "X";
// var computerTurn = "O";
// var buttons = document.getElementById("board");
//     console.log(buttons);
// function multyplayer
// function multyplayer(){
//   $( "div#show" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 1000 );
//   // show the value who player turn
//   $("turn").val("");
//   //
//   if( canSave ){
//     // load saved game
//     var savedGame = JSON.parse( localStorage.getItem('players') );
//     if( savedGame !== null){
//       players = savedGame;
//
//     }
//   }
// // function continue playing
//   $('#cont').on('click',function (ev) {
//     console.log('#cont click');
//     $( "div#reply" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 1000 );
//     $("td").removeClass("x o").html('');
//     board = [null, null, null, null, null, null, null, null, null];
//     turnCount = 0;
//     $("td").html("");
//     gameStart = true;
//     $("#s1 span").html( players[player].score );
//     $("#s2 span").html( players[player].score );
//
//   });//ev
// // function playButton
//   $('#playButton').on('click',function (event) {
//     console.log('PLAY clicked!');
//     $("div#turn").show();
//     $("div#turn").html("Player turn: " + $("#player1").val());
//     // debugger
//     players['x'].name  = $("#player1").val();
//     players['o'].name  = $("#player2").val();
//     // debugger;
//     if (players['x'].name==='' || players['o'].name ===''){
//       $( "div#show" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
//       return;
//     } else if (players['x'].name=== players['o'].name ){
//       $( "div#show" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
//       // gameStart=false;
//       return;
//     }
//
//     console.log(players[player].name);
//     $(this).prop('disabled', true);
//     gameStart = true;
//     $("#p1 span").html(  $("#player1").val()   );
//     $("#p2 span").html(  $("#player2").val()   );
//     $("#s1 span").html("0");
//     $("#s2 span").html("0");
//   });
//   //cell checks if have event addClass for it
function multiplayer(){

  var playerCount = 0;

  console.log('start multiplayer');

  $("img").on('click',function(e){
    console.log(this.id);
    var $selectedImage1=this.id;
    var $selectedImage2=this.id;
    console.log($selectedImage1);
    console.log($selectedImage2);
    // players.x.image( $(this) );

    if(playerCount === 0){
      players['x'].image = this.src;
    } else {
      players['o'].image = this.src;
    }

    // console.log(players['x'].image);
    $(this).hide();
    gameStart = true;
  // for two players I need to do check like the check for the names image   x
  playerCount++;

  });


  $('.sq').on('click',function(event){
    if (!gameStart) {
      return;
    }
    var select = $(this);

    if (select.hasClass('x') || select.hasClass('o')){
      // console.log("select two images");
    alert("select two images");
    }
    //
    // var boardIndex = parseInt( this.id );
    // // var value_input = $("input[name*='xxxx']").val();
    // select.addClass(player.toLowerCase());
    // // change cell content her
    // board[boardIndex]= player.toLowerCase();
    // $(this).text(players[player].name);
    var boardIndex = parseInt( this.id );
    // var value_input = $("input[name*='xxxx']").val();

    // select.addClass(player.toLowerCase()).text(players[player].name);
    $(this).css({
      'background': 'url(' + players[player].image + ') no-repeat',
      'background-size': 'cover'
    });
    console.log(players[player].image, $(this).css('background-image') );

    // change cell content her
    board[boardIndex]= player.toLowerCase();
    // $(this).text(players[player].name);
    // check the winner

    // turnCount += 1
    console.log(turnCount);

    // check the winner
    if (checkPlayer()){
      console.log('multiplayer winner!');
      // someone won the game!
      $('#win span').html(players[player].name);
      $("div #turn").hide();

      $( "div.im" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
      // $( "div img.im" ).fadeIn( 300 ).delay( 2000 ).fadeOut( 400 );
      // add scores to the winner
      if (player === "x"){
        winX++;
        players[player].score=winX;
        $('#win span').html("Player X ");
        $("#s1 span").html(players[player].score);
        // $("#s2 span").html(players[player].score);
        console.log("Your record of scores is "+ players[player].name);
        $("#playAgain").show();
        gameStart = false;
      }else{
        winO++;
        players[player].score=winO;
        $("#s2 span").html( players[player].score );
          $('#win span').html("Player O ");
        // $("#s1 span").html(players[player].score);
        console.log("Your record of scores is "+ winO);
        // alert("Your record of scores is "+ players[player].score);
        $("#playAgain").show();
        // $('#playButton').prop('disabled', false);
        gameStart = false;
        // return;
       }
    // set the info in database
    if( canSave ){
      localStorage.setItem( 'players', JSON.stringify(players) );
    }
  // check DRAW
} else if(turnCount === 9){// if( checkPlayer() )
      $('#win span').html("DRAW!");
  }// else
     // change player
    if(player === "x"){
      player = "o";
      $("div#turn").html("Player turn: " + players[player].name);

    } else{
      player = "x";
      $("div#turn").html("Player turn: " + players[player].name);

    }
    turnCount += 1;// number of clicks in the board game

  }); // $('.sq').on('click')
  turnCount += 1;// number of clicks in the board game

}// multiplalyer function
//   // reset function
//   $("#reset").on('click',function(event){
//     $( "div#show" ).fadeIn( 300 ).delay( 2000 ).fadeOut( 1000 )
//     $("td").html("");
//     board = [null, null, null, null, null, null, null, null, null];
//     $("td").removeClass("x o");
//     $("#player1").val("");
//     $("#player2").val("");
//     // $("#turn").val("");
//     $("#turn").hide();
//     players.x.name = '';
//     players.o.name = '';
//     gameStart = false;
//     $('#playButton').prop('disabled', false);
//     $("#win span").html ( $("#win").val());
//     $("#p1 span").html ( $("#p1").val());
//     $("#p2 span").html ( $("#p2").val());
//     $("#s1 span").html(   $("#s1").val()   );
//     $("#s2 span").html(   $("#s2").val()   );
//   });
//
// };

// function to make a good move for the AI
var playAIMove  = function () {
  // play in on of these squares if they are free
  if ((board[4]) === null) {
    $('#' + 4).addClass('o').text('AI');
    board[4]= 'o';
  } else if ((board[0]) === null) {
    $('#' + 0).addClass('o').text('AI');
    board[0]= 'o';
  } else if (board[2] === null) {
    $('#' + 2).addClass('o').text('AI');
    board[2]= 'o';
  } else if ($(board[6]) === null) {
    $('#' + 6).addClass('o').text('AI');
    board[6]= 'o';
  } else if ($(board[8]) === null) {
    $('#' + 8).addClass('o').text('AI');
    board[8]= 'o';
  } else if ($(board[1]) === null) {
    $('#' + 1).addClass('o').text('AI');
    board[1]= 'o';
  } else if ($(board[3]) === null) {
    $('#' + 3).addClass('o').text('AI');
    board[3]= 'o';
  } else if ($(board[5]) === null) {
    $('#' + 5).addClass('o').text('AI');
    board[5]= 'o';
  } else if ($(board[7]) === null) {
    $('#' + 7).addClass('o').text('AI');
    board[7]= 'o';
  }else if (board[8] === null) {
    $('#' + 8).addClass('o').text('AI');
    board[8]= 'o';
  }else if ($(board[9]) === null) {
    $('#' + 9).addClass('o').text('AI');
    board[9]= 'o';
  }
  // else if ($('#9').text()==='') {
  //   $('#' + 9).addClass('o').text('AI');
  //   board[9]= 'o';
  // }

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
  //ADD TEXT TO BUTTON AI
  $(this).text(player);
}

$(document).ready(function(){
  // $("button #tog").on ('click',function(){
  //   $("p").toggle( "slow" );
  //
  // });
//   $("button #btn").click(function(){
//     $("p #4").toggle();
// });
// $("button #btn").click(function(){
  $('#fr').on('click',function(){
    $("#se").toggle();// main.js
    $(".s").toggle();//vs computer done need to connect them help
  });
  $('#se').on('click',function(){
    $("#fr").toggle();//not designed yet
    $(".s").toggle();//not designet yet
  });
  $('#t').on('click',function() {
    // multiple players
    multiplayerSelected = true;
    multiplayer();
    console.log(multiplayerSelected);
  });
  $('#v').on('click',function() {
    // AI
    multiplayerSelected = false;
    AIPlayer();
    console.log(multiplayerSelected);
  });


  var AIPlayer = function(){
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

    // select.addClass(player.toLowerCase()).text(players[player].name);
    $(this).css({
      'background': 'url(' + players[player].image + ') no-repeat',
      'background-size': 'cover'
    });
    console.log(players[player].image, $(this).css('background-image') );

    // change cell content her
    board[boardIndex]= player.toLowerCase();
    // $(this).text(players[player].name);
    // check the winner

    turnCount += 1
    console.log(turnCount);
    // check if HUMAN player (always 'x') has won
    if (checkPlayer()){
      // $('#win span').html(players[player].name);
      $('#win span').text("X");
      $("div #turn").hide();
      // $('#wins').html( players[player].name ).show();
      // $( "div.im" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
      // $( "div img.im" ).fadeIn( 300 ).delay( 2000 ).fadeOut( 400 );
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
      // $('#t').on('click',function() {
        // multiple players
        winO++;// dont neccassory here
       //   players[player].score=winO;
       //   $("#s2 span").html( players[player].score );
       //   // $("#s1 span").html(players[player].score);
       //   console.log("Your record of scores is "+ winO);
       //
       //   $("#playAgain").show();
       //   // $('#playButton').prop('disabled', false);
       //   gameStart = false;
       // }
      // });

      return;  // don't let AI have a turn if the human won!
    }

    player = 'o';// AI
    // // change player
    // if(player === "x"){
    //  player = "o";
    //  $("div#turn").html("Player turn: " + players[player].name);
    // } else{
    //  player = "x";
    //  $("div#turn").html("Player turn: " + players[player].name);
    // }


    // AI TURN
    // playAIMove();

    if (! multiplayerSelected) {
      $("#v").toggle();
      playAIMove();
    }else {
      $("#t").toggle();
      multiplayer();
    }

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
      // $('#wins').html( players[player].name ).show();
      // $("div #turn").hide();
      $( "div.im" ).html(players[player].name);
      // $( "div.im" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
      // $( "div img.im" ).fadeIn( 300 ).delay( 2000 ).fadeOut( 400 );
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
      players[player].score=winO;// check the multiplayerSelected if false put text
      if (!multiplayerSelected){
          $('#win span').text("AI");
      } else{
          $('#win span').html("players[player].name");
      }
      // ("#wins").show();
      // $('#div wins').html ( $("#win").val());
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

  // function choosing image for each player
  $("img").on('click',function(e){
    console.log(this.id);
    var $selectedImage=this.id;
    console.log($selectedImage);
    // players.x.image( $(this) );
    players['x'].image = this.src;
    // console.log(players['x'].image);
    $(this).hide();
    gameStart = true;
  // for two players I need to do check like the check for the names image   x
  });
// for two players use on click to choose it event handlers+ toggle to switch
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


 };
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
   $('selectedImage1').show();
   $('selectedImage2').show();
   $( "#five" ).show();
   $( "#one" ).show();
   $( "#six" ).show();
   $( "#seven" ).show();
   $( "#eight" ).show();
   $( "#nine" ).show();
   // players.x.image.val("");
   //  $('td',.css({
   //   'background': "",
   //   'background-size': ""
   // });
   $('td').css('background','');
   $(".s").hide();
   // players.o.image = null;
   gameStart = false;
   $('#playButton').prop('disabled', false);
   $("#win span").html ( $("#win").val());
   $("#p1 span").html ( $("#p1").val());
   $("#p2 span").html ( $("#p2").val());
   $("#s1 span").html(   $("#s1").val()   );
   $("#s2 span").html(   $("#s2").val()   );
 });
});//ready
