// var  wins= [];
// wins.push([1,2,3]);
// wins.push([4,5,6]);
// wins.push([7,8,9]);
// wins.push([1,4,7]);
// wins.push([2,5,8]);
// wins.push([3,6,9]);
// wins.push([1,5,9]);
// wins.push([3,5,7]);
//
//
// var p1= [];
// var p2= [];
//
//
//
// var $s1= ("#1");
// var $s2= ("#2");
// var $s3= ("#3");
// var $s4= ("#4");
// var $s5= ("#5");
// var $s6= ("#6");
// var $s7= ("#7");
// var $s8= ("#8");
// var $s9= ("#9");


// $("#fieldName").prop("readonly", true);
var canSave = false;
if (typeof(Storage) !== "undefined") {
  canSave = true;
}

var board = [null, null, null, null, null, null, null, null, null];
// var board = [null, null, null, null, null, null, null, null, null];

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
// players.x.name = $('#input1').val(); //'myname';
// players[ player ].name

var player ="x";
var winX =0;
var winO =0;
var gameStart= false;

var turnCount = 0;

var checkPlayer = function(){
  var current=0;

  // for(i in wins){
  console.log('checkPlayer', wins);

  for (var i = 0; i < wins.length; i++) {

    var winState = wins[i];
    console.log('winState:', winState);

    // var pos1 = winState[0];
    // var pos2 = winState[1];
    // var pos3 = winState[2];

    if( board[ winState[0] ] === player && board[ winState[1] ] === player && board[ winState[2] ] === player){
      return true;
    }//if
  }//for
};//func




$(document).ready(function(){
  // $( "#playButton" ).click(function() {
  $( "div#show" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 1000 );
// });
// $( "div#replay" ).fadeIn( 300 ).delay( 2000 ).fadeOut( 1000 );


  if( canSave ){
    // load saved game
    var savedGame = JSON.parse( localStorage.getItem('players') );
    if( savedGame !== null){
      players = savedGame;

      // now players is restored to saved version
      // BUT we have to update the UI to show the saved scores
    }
  }
  //
  // for (var key in players) {
  //     var savedData = localStorage.getItem('playerData');
  //     var usingData = JSON.parse(savedData);
  //     if (usingData.x.name === $("#player1").val()){
  //       usingData.x.score = winX++;
  //       return;
  //     }//if
  // }//for

  $('#cont').on('click',function (ev) {
    console.log('#cont click');
    // $( "#cont" ).click(function() {
    $( "div#reply" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 1000 );
    // });

    $("td").removeClass("x o").html('');
    board = [null, null, null, null, null, null, null, null, null];
    turnCount = 0;
    $("td").html("");

    gameStart = true;
    $("#s1 span").html( players[player].score );
    $("#s2 span").html( players[player].score );
      // var txt;
      // var r = confirm("Press a button!\nEither OK or Cancel.\nThe button you pressed will be displayed in the result window.");
      // if (r === true) {
      //     txt = "You pressed OK!";
      //     gameStart = true;
      // } else {
      //     txt = "You pressed Cancel!";
      //     gameStart = false;
      // }
      // document.getElementById("cont").innerHTML = txt;
      // if (txt==="You predded OK"){
      //   var ans= confirm("Press a would you like to continue with te same names!\nEither OK or Cancel.\nThe button you pressed will be displayed in the result window.");
      //   if (ans === true){
      //     // alert("Start play");
      //     gameStart = true;
      //   }else{
      //     gameStart = false;
      //     // alert("Please enter your names");
      //     players['x'].name  = $("#player1").val();
      //     players['o'].name  = $("#player2").val();
      //    }
      //   }else{
      //     gameStart = false;
      //     // alert(" You pressed cancel. See you later");
      // }
  });//ev



  $('#playButton').on('click',function (event) {

    console.log('PLAY clicked!');
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

    // }else if (players['o'].name==='' && players['x'].name!=''){
    //   alert("Please enter a valid name");
    // }else if (players['x'].name !='' && players['o'].name!=''){
    // gameStart = true;
    // this.disabled = true;

    // var value = $("#player1".val())
    // var value = $("#player1").val()
    // $('#p1').html( value );

    $("#p1 span").html(  $("#player1").val()   );
    $("#p2 span").html(  $("#player2").val()   );
    $("#s1 span").html("0");
    $("#s2 span").html("0");
    // $("#p1").attr('$("#player1".val())');
    // $('#msg').html($('input:textbox').val());
  });

  $('.sq').on('click',function(event){

    if (!gameStart) {
      return;
    }

    // alert('add');
    var select = $(this);
    // $(this).css('border', '1px solid rgb(30, 73, 42)');
    // $(this).css(background-color,green)

    if (select.hasClass('x')|| select.hasClass('o')){
      // alert('This square already has class');
      return;
    }

    var boardIndex = parseInt( this.id );
    // var value_input = $("input[name*='xxxx']").val();

    select.addClass(player.toLowerCase());
    // change cell content her
    board[boardIndex]= player.toLowerCase();
    $(this).text(players[player].name);

    if (checkPlayer()){
      // someone won the game!
      $('#win span').html(players[player].name);
      // var img = $('<img id= 'mid'>');
      // img.attr('src', responseObject.imgurl);
      // img.appendTo('#imagediv');
      $( "div.im" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
      // $( "div#show" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
      $( "div img.im" ).fadeIn( 300 ).delay( 2000 ).fadeOut( 400 );



      if (player ==="x"){
        winX++;
        players[player].score=winX;
        $("#s1 span").html(players[player].score);
        // $("#s2 span").html(players[player].score);
        console.log("Your record of scores is "+ players[player].name);
        // alert("You won: "+players[player].name);
        // alert("Your record of scores is "+ players[player].score);
        $("#playAgain").show();

        gameStart = false;

        // $('#playButton').prop('disabled', false);

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
    //   var player={};
    //   player.name = $("#player1").val();
    //   player.score = win.player.ToUpperCase();

    if( canSave ){
      localStorage.setItem( 'players', JSON.stringify(players) );
    }

    //   console.log(player);
  }else if(turnCount === 8){// if( checkPlayer() )
      $('#win span').html("DRAW!");
     }// else
    // players.x.name = $('#input1').val(); //'myname';
    // players[ player ].name


    if(player === "x"){
      player = "o";
    } else{
      player = "x";
    }

    turnCount += 1;

  }); // $('.sq').on('click')

  $("#reset").on('click',function(event){
    // $(this).css('border', '1px solid rgb(30, 73, 42)');
    // $( "#reset" ).click(function() {
      $( "div#show" ).fadeIn( 300 ).delay( 2000 ).fadeOut( 1000 );
    // });

    $("td").html("");
    board = [null, null, null, null, null, null, null, null, null];
    $("td").removeClass("x o");
    //  alert("Are you the same players");
    // players['x'].name  = $("#player1").val();
    // players['o'].name  = $("#player2").val();
    //$("#s1 span").html("0");
    $("#player1").val("");
    $("#player2").val("");

    players.x.name = '';
    players.o.name = '';

    gameStart = false;
    $('#playButton').prop('disabled', false);

    // $("#s1 span").val("0");
    // $("#s2 span").val("0");
    $("#win span").html ( $("#win").val());
    $("#p1 span").html ( $("#p1").val());
    $("#p2 span").html ( $("#p2").val());
    //  console.log(this, this.disabled);
    // $("#p1 span").html(   $("#player1").val()   );
    // $("#p2 span").html(   $("#player2").val()   );
    $("#s1 span").html(   $("#s1").val()   );
    $("#s2 span").html(   $("#s2").val()   );
    // gameStart= true;
    // $('#playButton').prop('disabled', true);
      // console.log(board);
    // $( "#reset" ).click(function() {
    // $( "div#show" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
    // });
  });

});//ready


// var toggleDisplay = function() {
//   $("#oh, #ex").toggleClass('active');
// };











    // console.log('pos1:', pos1, 'pos2:', pos2, 'pos3:', pos3);
    //
    // console.log(wins[i], '===', board);



    // if (wins[i] === board) {
    //   return true;
    // }
    // else {
    //   return false;
    // }


// };
//
//
//
//
  //
  // if( $('.s1').hasClass(tick) && $('.s2').hasCl		this.resetGame = function() {
		// 	this.CurrentPlayer = 'X';
		// 	this.cleanUpGrid();
		// }

		/**
		* This function just cleans up the grid by making all td's of table empty and remove all the classes.
		*/
// 		this.cleanUpGrid = function() {
// 			$("#tictactoe-board td").html('');
// 			$("#tictactoe-board td").attr('class','');
// 		}
// ass(tick) && $('.s3').hasClass(tick) ){
//   //   return true;
  // }
// };

// }); // $(document).ready()









// for (var i = 0; i < wins.length; i++) {
// if (board.length ===wins.length){
//   current=board[i];
//   for (var j = 0; j < wins.length; j++) {
//     if (j=== board.length)
//     return i;
//   }
// }
// return -1;






// working


// else if ($('.s4').hasClass(tick)&& $('.s5').hasClass(tick) && $('.s6').hasClass(tick)){
//
//     return true;
//   }else if ($('.s7').hasClass(tick)&& $('.s8').hasClass(tick) && $('.s9').hasClass(tick)) {
//   return true;
// }else if ($('.s1').hasClass(tick)&& $('.s4').hasClass(tick) && $('.s7').hasClass(tick)){
//   return true;
// }else if ($('.s2').hasClass(tick)&& $('.s5').hasClass(tick) && $('.s8').hasClass(tick)) {
//   return true;
// }
// else if ($('.s3').hasClass(tick)&& $('.s6').hasClass(tick) && $('.s9').hasClass(tick)){
//   return true;
// }
// else if ($('.s3').hasClass(tick)&& $('.s5').hasClass(tick) && $('.s7').hasClass(tick)) {
//   return true;
// }else {
//   return false;
// }



// working
// if (player==="X"){
//
//   select.addClass('x');// or use css style to change background-color
//   board[ boardIndex ] = 'x';
//   $(this).text('X');
//
//
//   if (checkPlayer("x")) {
//     alert("You won"+player);
//     winX++;
//     console.log("Your record of wins is "+ winX);
//   } else {
//     // alert("You lost"+player);
//     player= "O";
//   }
//
// } else {
//
//   select.addClass('o');
//   board[ boardIndex ] = 'o';
//
// // board[ boardIndex ] = 'O';
//
//   if (checkPlayer("o")) {
//     alert("You won"+player);
//     winO++;
//     console.log("Your record of wins is  "+winO);
//   } else {
//     // alert("You lost"+player);
//     player = "X";
//   }
//
// }
