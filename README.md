# Chess board component

A chess board web component

## Component reference

Usage

* Run `npm init` if needed
* Install the package with `npm i @loloof64/chessboard-component`
* load the script from `node_modules/@loloof64/chessboard-component/dist` (just load it, as it will define the web component `loloof64-chessboard`).

```javascript
<loloof64-chessboard
    size="300"
    background="crimson"
    coordinates_color="yellow"
    white_cell_color="navajowhite"
    black_cell_color="peru"
    reversed="true"
    origin_cell_color="red"
    target_cell_color="green"
    dnd_cross_color="purple"
    white_player_human="true"
    black_player_human="false"
    move_highlight_color="red"
    last_move_visible="false"
    coordinates_visible="false"
></loloof64-chessboard>
```

### Attributes

| Name                   | Purpose                                                        | Type    | Default                    |
|------------------------|----------------------------------------------------------------|---------|----------------------------|
| size                   | Common size (width/height) of the board in pixels              | number  | 100.0                      |
| background             | Background color of the board outside zone                     | string  | #124589                    |
| coordinatesColor       | Color of the coordinates around the board                      | string  | yellow                 |
| whiteCellColor         | Background color of the white cells of the board               | string  | navajowhite                  |
| blackCellColor         | Background color of the black cells of the board               | string  | peru                      |
| reversed               | Whether black side is on top or not                            | boolean | false                      |
| origin_cell_color      | Color of the origin cell of the Drag and Drop                  | string  | crimson                    |
| target_cell_color      | Color of the current target cell of the Drag and Drop          | string  | ForestGreen                |
| dnd_cross_color        | Color of the Drag and Drop cross indicator                     | string  | DimGrey                    |
| promotion_dialog_title | Title of the promotion selection dialog                        | string  | Select the promotion piece |
| white_player_human     | True if the white player is human, false for external (1)      | boolean | true                       |
| black_player_human     | True if the black player is human, false for external (1)      | boolean | true                       |
| move_highlight_color   | Color of the last move highlight arrow                         | string  | CadetBlue                  |
| coordinates_visible    | True if the coordinates should be visible, false otherwise     | boolean | true                       |
| last_move_visible      | True if the last move arrow should be visible, false otherwise | boolean | true                       |                   |

(1) External player means that, instead of playing its move with interaction on the board, call the method `playMove` in order to commit its move. A simple use case would be to let an engine play.

### A little word of caution

When chaining methods/events, you may experience some update issues. Indeed, often the cpu needs some time in order to update the component state. If you run into such issues, don't hesitate to use setTimeout with some milliseconds or hundreds of milliseconds

### Methods

* newGame(startPositionFen): Starts a new game with the given position in Forsyth-Edwards Notation. If the startPositionFen string is not given, will use the default chess start position.
* isWhiteTurn() : Boolean. true if it is White turn, false otherwise.
* getCurrentPosition(): String. Returns the current position in Forsyth-Edwards Notation.
* playMove({startFile, startRank, endFile, endRank, promotion = 'q'}): Tries to play the given move on the component, only if the current player is defined as an external user. Returns a boolean, saying if the move has been commited or not. All coordinates, integers, start from 0 (file 0 = 'A', rank 0 = '1'). Valid promotion values are 'q', 'r', 'b' and 'n'.
* playMoveSan(moveSan): Tries to play the given move SAN on the board, only if the current player is defined as an external user. Returns a boolean, saying if the move has been commited or not.
* setPositionAndLastMove({positionFen, fromFileIndex, fromRankIndex, toFileIndex, toRankIndex}) : you can set up the position and last move arrow, ** if the game is not in progress ** (otherwise won't have any effect). Returns true if the position and last move could be set, false otherwise. If no parameter given or wrong values, then it will clear last move arrow and sets the board to the position before the first move. Particularly useful for history managers.
* stop(): we stop the game.
* gameIsInProgress(): returns a boolean telling us if the game is in progress, or no game is running.
* gamePgn({whiteName, blackName}) : returns the game pgn as a string. Only sets white and black names if they are defined. Each missing field will be replaced by an empty string.

### Events

* checkmate : Informs that a checkmate has just happened on the board. The payload `detail.whiteTurnBeforeMove` of the event tells if the side that checkmated were White or Black.
* stalemate : Informs that a stalemate has just happended on the board. No additional payload.
* perpetual-draw: Informs that a 3-fold repetitions draw has just happened on the board. No additional payload.
* missing-material-draw : Informs that a draw by missing material has just happened on the board. No additional payload.
* fifty-moves-draw: Informs that a draw by the 50 moves rule has just happened on the board. No additional payload.
* waiting-manual-move: Informs that the component has just landed in the 'waiting manual move' state. That means that the move for the current player has to be commited with a call to playMove() (and with a legal move of course, the only way to progress in the game). No additional payload, but you should call isWhiteTurn() and getCurrentPosition() as clues.
* move-done: Informs that a move has happened on the board, whatever the way (human or external player). The payload `detail.moveObject` is an object with all the details : moveNumber, whiteTurn, moveFan, moveSan, fromFileIndex, fromRankIndex, toFileIndex, toRankIndex.

## Developers

You can build with the command (in the terminal) `$ yarn build` from the root of the project. Result will be in the `dist` folder.

But don't forget first to install all dependencies, with NodeJS : `yarn`.

## Credits

Pieces vectors definitions from CBurnett and found on [Wikimedia commons](https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces).

Using [ChessJS library](https://github.com/jhlywa/chess.js), which is bundled in the produced script.

## Acknowledgement

* Wails creator and developpers, SvelteJs creator and developpers
* A shot of code Youtube channel, for having posted [this short tutorial video](https://www.youtube.com/watch?time_continue=471&v=p3u5rdJH9BM&feature=emb_logo)
* Contributors to SvelteJs discord server.