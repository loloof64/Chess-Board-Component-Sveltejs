<script>
export let size = 100;
export let background = '#124589';
export let reversed = false;

export let white_cell_color = 'GoldenRod';
export let black_cell_color = 'brown';
export let coordinates_color = 'DarkOrange';

import WhitePawn from './pieces/WhitePawn.svelte';
import WhiteKnight from './pieces/WhiteKnight.svelte';
import WhiteBishop from './pieces/WhiteBishop.svelte';
import WhiteRook from './pieces/WhiteRook.svelte';
import WhiteQueen from './pieces/WhiteQueen.svelte';
import WhiteKing from './pieces/WhiteKing.svelte';

import BlackPawn from './pieces/BlackPawn.svelte';
import BlackKnight from './pieces/BlackKnight.svelte';
import BlackBishop from './pieces/BlackBishop.svelte';
import BlackRook from './pieces/BlackRook.svelte';
import BlackQueen from './pieces/BlackQueen.svelte';
import BlackKing from './pieces/BlackKing.svelte';

import {
    columnIndexToFile,
    lineIndexToRank,
    getPieceAt,
    isWhitePawn,
    isWhiteKnight,
    isWhiteBishop,
    isWhiteRook,
    isWhiteQueen,
    isWhiteKing,
    isBlackPawn,
    isBlackKnight,
    isBlackBishop,
    isBlackRook,
    isBlackQueen,
    isBlackKing,
} from './util/PiecesTest.js';

import {Chess} from 'chess.js';

let logic = new Chess();

$: coordIndexes = [true, "true"].includes(reversed) ? [7,6,5,4,3,2,1,0] : [0,1,2,3,4,5,6,7];

$: cellsSize = size / 9.0;
$: halfCellsSize = cellsSize * 0.5;

$: gridTemplate = `${halfCellsSize}px repeat(8, ${cellsSize}px) ${halfCellsSize}px / ${halfCellsSize}px repeat(8, ${cellsSize}px) ${halfCellsSize}px`;
$: rootStyle = `
    width: ${size}px;
    height: ${size}px;
    background-color: ${background};
    grid-template: ${gridTemplate};
`;

$: whiteCellsStyle = `
    background-color: ${white_cell_color};
`;

$: blackCellsStyle = `
    background-color: ${black_cell_color};
`;

$: coordinateStyle = `
    font-size: ${cellsSize * 0.3}px;
    font-weight: bold;
    color: ${coordinates_color};
`;

let whiteTurnStyle = `
    background-color: white;
`;

let blackTurnStyle = `
    background-color: black;
`;

</script>

<style>
#root {
    position: absolute;
    display: grid;
}

.cell {
    display: flex;
    justify-content: center;
    align-items: center;
}

.coordinate {
    display: flex;
    justify-content: center;
    align-items: center;
}

#player-turn {
    border-radius: 50%;
}
</style>

<svelte:options tag="loloof64-chessboard" />
<div id="root" style={rootStyle}>
    <div></div>
    {#each coordIndexes as columnIndex}
        <div class="coordinate"  style={coordinateStyle}>{String.fromCharCode('A'.charCodeAt(0) + columnIndex)}</div>
    {/each}
    <div></div>

    {#each coordIndexes as lineIndex}
        <div class="coordinate"  style={coordinateStyle}>{String.fromCharCode('1'.charCodeAt(0) + 7 - lineIndex)}</div>
        {#each coordIndexes as columnIndex}
            <div class="cell" style="{((lineIndex + columnIndex) % 2)  === 0 ? whiteCellsStyle : blackCellsStyle}">
                {#if isWhitePawn(logic, columnIndex, lineIndex)}
                    <chess-white-pawn size={cellsSize} />
                {:else if isWhiteKnight(logic, columnIndex, lineIndex)}
                    <chess-white-knight size={cellsSize} />
                {:else if isWhiteBishop(logic, columnIndex, lineIndex)}
                    <chess-white-bishop size={cellsSize} />
                {:else if isWhiteRook(logic, columnIndex, lineIndex)}
                    <chess-white-rook size={cellsSize} />
                {:else if isWhiteQueen(logic, columnIndex, lineIndex)}
                    <chess-white-queen size={cellsSize} />
                {:else if isWhiteKing(logic, columnIndex, lineIndex)}
                    <chess-white-king size={cellsSize} />

                {:else if isBlackPawn(logic, columnIndex, lineIndex)}
                    <chess-black-pawn size={cellsSize} />
                {:else if isBlackKnight(logic, columnIndex, lineIndex)}
                    <chess-black-knight size={cellsSize} />
                {:else if isBlackBishop(logic, columnIndex, lineIndex)}
                    <chess-black-bishop size={cellsSize} />
                {:else if isBlackRook(logic, columnIndex, lineIndex)}
                    <chess-black-rook size={cellsSize} />
                {:else if isBlackQueen(logic, columnIndex, lineIndex)}
                    <chess-black-queen size={cellsSize} />
                {:else if isBlackKing(logic, columnIndex, lineIndex)}
                    <chess-black-king size={cellsSize} />
                {:else}
                    <div></div>
                {/if}
            </div>
        {/each}
        <div class="coordinate" style={coordinateStyle}>{String.fromCharCode('1'.charCodeAt(0) + 7 - lineIndex)}</div>
    {/each}

    <div></div>
    {#each coordIndexes as columnIndex}
        <div class="coordinate"  style={coordinateStyle}>{String.fromCharCode('A'.charCodeAt(0) + columnIndex)}</div>
    {/each}
    <div id="player-turn" style={logic.turn() === 'w' ? whiteTurnStyle : blackTurnStyle}></div>
</div>