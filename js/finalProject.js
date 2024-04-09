$(function(){
    // Any article object with id tetris will change when mouse enters
    $("Article").on( "mouseenter", "#tetris", function(){
            $(this).children().first().html("<p>Tetris</p> <br> <p>A tetris game with somewhat limited capability. I'm not sure I'd be able to make the entire thing scroll downwards.</p>");
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
    $("Article").on( "mouseenter", "#cup", function(){
            $(this).children().first().html("<p>Cup Game</p> <br> <p>A ball will be placed in a cup, follow it with your eyes as it is shuffled. Difficulty may be variable.</p>");
        });

    $("Article").on( "mouseleave", "#cup", function(){
            $(this).children().first().html("<p>Cup Game</p>");
        });
});
var pongLink = document.getElementById("pong");
pongLink.addEventListener('click', function() {
    window.location.href = 'pong/pong.html';
});
