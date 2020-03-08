<script>
let rootElement;

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
    getPieceAt,
    isWhitePawnAtCell,
    isWhiteKnightAtCell,
    isWhiteBishopAtCell,
    isWhiteRookAtCell,
    isWhiteQueenAtCell,
    isWhiteKingAtCell,
    isBlackPawnAtCell,
    isBlackKnightAtCell,
    isBlackBishopAtCell,
    isBlackRookAtCell,
    isBlackQueenAtCell,
    isBlackKingAtCell,
} from './util/PiecesTest.js';

import {Chess} from 'chess.js';

let logic = new Chess();

$: fileIndexes = [true, "true"].includes(reversed) ? [7,6,5,4,3,2,1,0] : [0,1,2,3,4,5,6,7];
$: rankIndexes = [true, "true"].includes(reversed) ? [0,1,2,3,4,5,6,7] : [7,6,5,4,3,2,1,0];

$: cellsSize = size / 9.0;
$: halfCellsSize = cellsSize * 0.5;

$: rootStyle = `
    width: ${size}px;
    height: ${size}px;
    background-color: ${background};
`;

$: gridTemplate = `${halfCellsSize}px repeat(8, ${cellsSize}px) ${halfCellsSize}px / ${halfCellsSize}px repeat(8, ${cellsSize}px) ${halfCellsSize}px`;

$: lowestLayerStyle = `
    width: ${size}px;
    height: ${size}px;
    grid-template: ${gridTemplate};
`;

$: dndLayerStyle = `
    width: ${size}px;
    height: ${size}px;
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

let dragAndDropInProgress;
let dndPieceData;

let dndLocation = undefined;

$: dndPieceStyle = [null, undefined].includes(dndLocation) ? '' : `
    position: absolute;
    left: ${dndLocation.x}px;
    top: ${dndLocation.y}px;
`;

function getCell(x, y) {
    const cellX = Math.floor((x - cellsSize * 0.5) / cellsSize);
    const cellY = Math.floor((y - cellsSize * 0.5) / cellsSize);

    const file = [true, "true"].includes(reversed) ? 7-cellX : cellX;
    const rank = [true, "true"].includes(reversed)  ? cellY : 7-cellY;

    return [file, rank];
}

function getLocalCoordinates(event) {
    if (!rootElement) return;

    const thisComponentLocation = rootElement.getBoundingClientRect();
    const localX = event.clientX - thisComponentLocation.x;
    const localY = event.clientY - thisComponentLocation.y;

    return [localX, localY];
}

function handleMouseDown(event) {
    dragAndDropInProgress = true;
    const [x, y] = getLocalCoordinates(event);
    const [file, rank] = getCell(x,y);

    const piece = getPieceAt(logic, file, rank);
    if ([null, undefined].includes(piece)) return;

    dndLocation = {
        x, y,
    };

    dndPieceData = {
        ...piece,
        originCell: {file, rank},
    };
}

function handleMouseMove(event) {
    if (!dragAndDropInProgress) return;
    const [x, y] = getLocalCoordinates(event);

    dndLocation = {
        x, y,
    };
}

function handleMouseUp(event) {
    if (!dragAndDropInProgress) return;

    dragAndDropInProgress = false;
    dndPieceData = undefined;
    dndLocation = undefined;
    
    const [x, y] = getLocalCoordinates(event);
    const [file, rank] = getCell(x,y);
}

function handleMouseExited(event) {
    if (!dragAndDropInProgress) return;

    dragAndDropInProgress = false;
    dndPieceData = undefined;
    dndLocation = undefined;

    const [x, y] = getLocalCoordinates(event);
}

function isDnDOriginCell(dndPieceData, file, rank) {
    if ([undefined, null].includes(dndPieceData)) return undefined;
    
    const originCell = dndPieceData.originCell;
    if ([undefined, null].includes(originCell)) return undefined;

    return originCell.file === file && originCell.rank === rank;
}

function isWhitePawnDragged(dndPieceData) {
    if ([undefined, null].includes(dndPieceData)) return false;
    return dndPieceData.type === 'p' && dndPieceData.color === 'w';
}

function isWhiteKnightDragged(dndPieceData) {
    if ([undefined, null].includes(dndPieceData)) return false;
    return dndPieceData.type === 'n' && dndPieceData.color === 'w';
}

function isWhiteBishopDragged(dndPieceData) {
    if ([undefined, null].includes(dndPieceData)) return false;
    return dndPieceData.type === 'b' && dndPieceData.color === 'w';
}

function isWhiteRookDragged(dndPieceData) {
    if ([undefined, null].includes(dndPieceData)) return false;
    return dndPieceData.type === 'r' && dndPieceData.color === 'w';
}

function isWhiteQueenDragged(dndPieceData) {
    if ([undefined, null].includes(dndPieceData)) return false;
    return dndPieceData.type === 'q' && dndPieceData.color === 'w';
}

function isWhiteKingDragged(dndPieceData) {
    if ([undefined, null].includes(dndPieceData)) return false;
    return dndPieceData.type === 'k' && dndPieceData.color === 'w';
}

function isBlackPawnDragged(dndPieceData) {
    if ([undefined, null].includes(dndPieceData)) return false;
    return dndPieceData.type === 'p' && dndPieceData.color === 'b';
}

function isBlackKnightDragged(dndPieceData) {
    if ([undefined, null].includes(dndPieceData)) return false;
    return dndPieceData.type === 'n' && dndPieceData.color === 'b';
}

function isBlackBishopDragged(dndPieceData) {
    if ([undefined, null].includes(dndPieceData)) return false;
    return dndPieceData.type === 'b' && dndPieceData.color === 'b';
}

function isBlackRookDragged(dndPieceData) {
    if ([undefined, null].includes(dndPieceData)) return false;
    return dndPieceData.type === 'r' && dndPieceData.color === 'b';
}

function isBlackQueenDragged(dndPieceData) {
    if ([undefined, null].includes(dndPieceData)) return false;
    return dndPieceData.type === 'q' && dndPieceData.color === 'b';
}

function isBlackKingDragged(dndPieceData) {
    if ([undefined, null].includes(dndPieceData)) return false;
    return dndPieceData.type === 'k' && dndPieceData.color === 'b';
}
</script>

<style>
#root {
    position: absolute;
}

.lowest-layer {
    position: absolute;
    display: grid;
    z-index: 2;
}

.dnd-layer {
    position: absolute;
    z-index: 3;
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

.dndPiece {
    position: absolute;
}

#player-turn {
    border-radius: 50%;
}
</style>

<svelte:options tag="loloof64-chessboard" />
<div id="root" bind:this={rootElement} style={rootStyle}
     on:mousedown|preventDefault={handleMouseDown}
     on:mousemove|preventDefault={handleMouseMove}
     on:mouseup|preventDefault={handleMouseUp}
     on:mouseleave|preventDefault={handleMouseExited}
>
    <div class="lowest-layer" style={lowestLayerStyle}>
        <div></div>
        {#each fileIndexes as file}
            <div class="coordinate"  style={coordinateStyle}>{String.fromCharCode('A'.charCodeAt(0) + file)}</div>
        {/each}
        <div></div>

        {#each rankIndexes as rank}
            <div class="coordinate"  style={coordinateStyle}>{String.fromCharCode('1'.charCodeAt(0) + rank)}</div>
            {#each fileIndexes as file}
                <div class="cell" style="{((rank + file) % 2)  === 0 ? whiteCellsStyle : blackCellsStyle}">
                    {#if isDnDOriginCell(dndPieceData, file, rank)}
                        <div></div>
                    {:else if isWhitePawnAtCell(logic, file, rank)}
                        <chess-white-pawn size={cellsSize} />
                    {:else if isWhiteKnightAtCell(logic, file, rank)}
                        <chess-white-knight size={cellsSize} />
                    {:else if isWhiteBishopAtCell(logic, file, rank)}
                        <chess-white-bishop size={cellsSize} />
                    {:else if isWhiteRookAtCell(logic, file, rank)}
                        <chess-white-rook size={cellsSize} />
                    {:else if isWhiteQueenAtCell(logic, file, rank)}
                        <chess-white-queen size={cellsSize} />
                    {:else if isWhiteKingAtCell(logic, file, rank)}
                        <chess-white-king size={cellsSize} />

                    {:else if isBlackPawnAtCell(logic, file, rank)}
                        <chess-black-pawn size={cellsSize} />
                    {:else if isBlackKnightAtCell(logic, file, rank)}
                        <chess-black-knight size={cellsSize} />
                    {:else if isBlackBishopAtCell(logic, file, rank)}
                        <chess-black-bishop size={cellsSize} />
                    {:else if isBlackRookAtCell(logic, file, rank)}
                        <chess-black-rook size={cellsSize} />
                    {:else if isBlackQueenAtCell(logic, file, rank)}
                        <chess-black-queen size={cellsSize} />
                    {:else if isBlackKingAtCell(logic, file, rank)}
                        <chess-black-king size={cellsSize} />
                    {:else}
                        <div></div>
                    {/if}
                </div>
            {/each}
            <div class="coordinate" style={coordinateStyle}>{String.fromCharCode('1'.charCodeAt(0) + rank)}</div>
        {/each}

        <div></div>
        {#each fileIndexes as file}
            <div class="coordinate" style={coordinateStyle}>{String.fromCharCode('A'.charCodeAt(0) + file)}</div>
        {/each}
        <div id="player-turn" style={logic.turn() === 'w' ? whiteTurnStyle : blackTurnStyle}></div>
    </div>

    <div class="dnd-layer">
        {#if isWhitePawnDragged(dndPieceData)}
            <chess-white-pawn size={cellsSize} style={dndPieceStyle} class="dndPiece"/>
        {:else if isWhiteKnightDragged(dndPieceData)}
            <chess-white-knight size={cellsSize} style={dndPieceStyle} class="dndPiece"/>
        {:else if isWhiteBishopDragged(dndPieceData)}
            <chess-white-bishop size={cellsSize} style={dndPieceStyle} class="dndPiece"/>
        {:else if isWhiteRookDragged(dndPieceData)}
            <chess-white-rook size={cellsSize} style={dndPieceStyle} class="dndPiece"/>
        {:else if isWhiteQueenDragged(dndPieceData)}
            <chess-white-queen size={cellsSize} style={dndPieceStyle} class="dndPiece"/>
        {:else if isWhiteKingDragged(dndPieceData)}
            <chess-white-king size={cellsSize} style={dndPieceStyle} class="dndPiece"/>
        {:else if isBlackPawnDragged(dndPieceData)}
            <chess-black-pawn size={cellsSize} style={dndPieceStyle} class="dndPiece"/>
        {:else if isBlackKnightDragged(dndPieceData)}
            <chess-black-knight size={cellsSize} style={dndPieceStyle} class="dndPiece"/>
        {:else if isBlackBishopDragged(dndPieceData)}
            <chess-black-bishop size={cellsSize} style={dndPieceStyle} class="dndPiece"/>
        {:else if isBlackRookDragged(dndPieceData)}
            <chess-black-rook size={cellsSize} style={dndPieceStyle} class="dndPiece"/>
        {:else if isBlackQueenDragged(dndPieceData)}
            <chess-black-queen size={cellsSize} style={dndPieceStyle} class="dndPiece"/>
        {:else if isBlackKingDragged(dndPieceData)}
            <chess-black-king size={cellsSize} style={dndPieceStyle} class="dndPiece"/>
        {:else}
            <div></div>
        {/if}
    </div>
</div>