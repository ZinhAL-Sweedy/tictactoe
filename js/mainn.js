// check if the load save is supportted in browser
var canSave = false;
if (typeof(Storage) !== "undefined") {
  canSave = true;
}
// global variablies
var board = [null, null, null, null, null, null, null, null, null];

var wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
var images = [];


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

//.ready function
$(document).ready(function(){
  // show text of the names at the begining for some time and fade out
  // $( "div#show" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 1000 );
  // show the value who player turn
  // $("turn").val("");
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
    // $( "div#reply" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 1000 );
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
    // $("div#turn").show();
    // $("div#turn").html("Player turn: " + $("#player1").val());
    // debugger
    // for (var i = 0; i < 3; i++) {
    //
    //     images.push[]
    // }"../images/img3.jpeg","../images/p2jpeg.","../images/p4.jpeg"
    for (var i = 0; i < images.length; i++) {
      images.push("images/p2.jpeg");//"images/p4.jpeg"
      console.log(images[i]);

    }
    // players['x'].name  = $("#player1").val();// put palyer1 and palyer2 as fixed text
    // players['o'].name  = $("#player2").val();
    player['x'].name =
    // debugger;
    // if (players['x'].name==='' || players['o'].name ===''){
    //   $( "div#show" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
    //   return;
    // } else if (players['x'].name=== players['o'].name ){
    //   $( "div#show" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
    //   // gameStart=false;
    //   return;
    // }
    // always give players name player1 and playery2 and add images for them

    console.log(players[player].name);
    $(this).prop('disabled', true);
    gameStart = true;
    $("#p1 span").html(  $("#player1").val()   );
    $("#p2 span").html(  $("#player2").val()   );
    $("#s1 span").html("0");
    $("#s2 span").html("0");
  });
  //cell checks if have event addClass for it
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
    select.addClass(player.toLowerCase());
    // change cell content her
    board[boardIndex]= player.toLowerCase();
    $(this).text(players[player].name);
    // check the winner
    if (checkPlayer()){
      // someone won the game!
      $('#win span').html(players[player].name);
      $("div #turn").hide();

      $( "div.im" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
      // $( "div img.im" ).fadeIn( 300 ).delay( 2000 ).fadeOut( 400 );
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
    // set the info in database
    if( canSave ){
      localStorage.setItem( 'players', JSON.stringify(players) );
    }
  // check DRAW
  } else if(turnCount === 8){// if( checkPlayer() )
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
