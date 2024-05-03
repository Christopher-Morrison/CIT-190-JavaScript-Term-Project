$(function(){
    // Any article object with id tetris will change when mouse enters
    $("Article").on( "mouseenter", "#tetris", function(){
            $(this).children().first().html("<p>Tetris</p> <br> <p>A mini tetris game. No difficulty settings or block rotations.</p>");
        });
    // any article object with id tetris will change back once mouse leaves
    $("Article").on( "mouseleave", "#tetris", function(){
            $(this).children().first().html("<p>Tetris</p>");
        });
        // same as tetris for pong
    $("Article").on( "mouseenter", "#pong", function(){
            $(this).children().first().html("<p>Pong</p> <br> <p>A fun left to right, two player pong game.  </p>");
        });

    $("Article").on( "mouseleave", "#pong", function(){
            $(this).children().first().html("<p>Pong</p>");
        });
    $("#pong").on("click", function(){
        $(window).attr("pong/pong.html", "test");
    });
        // same as tetris for cup
    $("Article").on( "mouseenter", "#shell", function(){
            $(this).children().first().html("<p>Shell Game</p> <br> <p>Can you guess which cup has the ball? Try our different difficulty modes! </p>");
        });

    $("Article").on( "mouseleave", "#shell", function(){
            $(this).children().first().html("<p>Shell Game</p>");
        });
});
var pongLink = document.getElementById("pong");
pongLink.addEventListener('click', function() {
    window.location.href = 'pong/pong.html';
});
var shellLink = document.getElementById("shell");
shellLink.addEventListener('click', function() {
    window.location.href = 'cup/cup.html';
});
var tetrisLink = document.getElementById("tetris");
tetrisLink.addEventListener('click', function() {
    window.location.href = 'tetris/tetris2.html';
});
