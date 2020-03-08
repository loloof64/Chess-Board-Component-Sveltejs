<script>
export let size = 100;
export let background = '#124589';
export let reversed = false;

export let white_cell_color = 'GoldenRod';
export let black_cell_color = 'brown';
export let coordinates_color = 'DarkOrange';

import WhitePawn from './WhitePawn.svelte';
import WhiteKnight from './WhiteKnight.svelte';
import WhiteBishop from './WhiteBishop.svelte';
import WhiteRook from './WhiteRook.svelte';
import WhiteQueen from './WhiteQueen.svelte';
import WhiteKing from './WhiteKing.svelte';

import BlackPawn from './BlackPawn.svelte';
import BlackKnight from './BlackKnight.svelte';
import BlackBishop from './BlackBishop.svelte';
import BlackRook from './BlackRook.svelte';
import BlackQueen from './BlackQueen.svelte';
import BlackKing from './BlackKing.svelte';

import {Chess} from 'chess.js';

let logic = new Chess();

function columnIndexToFile(index) {
    return index;
}

function lineIndexToRank(index) {
    return 7-index;
}

function getPieceAt(file, rank) {
    const cellAlgebraic = `${String.fromCharCode('a'.charCodeAt(0) + file)}${String.fromCharCode('1'.charCodeAt(0) + rank)}`;
    const pieceValue = logic.get(cellAlgebraic);
    return pieceValue;
}

function isWhitePawn(columnIndex, lineIndex) {
    const piece = getPieceAt(columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'p' && piece.color === 'w';
}

function isWhiteKnight(columnIndex, lineIndex) {
    const piece = getPieceAt(columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'n' && piece.color === 'w';
}

function isWhiteBishop(columnIndex, lineIndex) {
    const piece = getPieceAt(columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'b' && piece.color === 'w';
}

function isWhiteRook(columnIndex, lineIndex) {
    const piece = getPieceAt(columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'r' && piece.color === 'w';
}

function isWhiteQueen(columnIndex, lineIndex) {
    const piece = getPieceAt(columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'q' && piece.color === 'w';
}

function isWhiteKing(columnIndex, lineIndex) {
    const piece = getPieceAt(columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'k' && piece.color === 'w';
}

function isBlackPawn(columnIndex, lineIndex) {
    const piece = getPieceAt(columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'p' && piece.color === 'b';
}

function isBlackKnight(columnIndex, lineIndex) {
    const piece = getPieceAt(columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'n' && piece.color === 'b';
}

function isBlackBishop(columnIndex, lineIndex) {
    const piece = getPieceAt(columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'b' && piece.color === 'b';
}

function isBlackRook(columnIndex, lineIndex) {
    const piece = getPieceAt(columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'r' && piece.color === 'b';
}

function isBlackQueen(columnIndex, lineIndex) {
    const piece = getPieceAt(columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'q' && piece.color === 'b';
}

function isBlackKing(columnIndex, lineIndex) {
    const piece = getPieceAt(columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'k' && piece.color === 'b';
}


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
                {#if isWhitePawn(columnIndex, lineIndex)}
                    <chess-white-pawn size={cellsSize} />
                {:else if isWhiteKnight(columnIndex, lineIndex)}
                    <chess-white-knight size={cellsSize} />
                {:else if isWhiteBishop(columnIndex, lineIndex)}
                    <chess-white-bishop size={cellsSize} />
                {:else if isWhiteRook(columnIndex, lineIndex)}
                    <chess-white-rook size={cellsSize} />
                {:else if isWhiteQueen(columnIndex, lineIndex)}
                    <chess-white-queen size={cellsSize} />
                {:else if isWhiteKing(columnIndex, lineIndex)}
                    <chess-white-king size={cellsSize} />

                {:else if isBlackPawn(columnIndex, lineIndex)}
                    <chess-black-pawn size={cellsSize} />
                {:else if isBlackKnight(columnIndex, lineIndex)}
                    <chess-black-knight size={cellsSize} />
                {:else if isBlackBishop(columnIndex, lineIndex)}
                    <chess-black-bishop size={cellsSize} />
                {:else if isBlackRook(columnIndex, lineIndex)}
                    <chess-black-rook size={cellsSize} />
                {:else if isBlackQueen(columnIndex, lineIndex)}
                    <chess-black-queen size={cellsSize} />
                {:else if isBlackKing(columnIndex, lineIndex)}
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