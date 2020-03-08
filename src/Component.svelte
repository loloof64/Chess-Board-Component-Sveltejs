<script>
let rootElement;

export let size = 100;
export let background = '#124589';
export let reversed = false;

export let white_cell_color = 'GoldenRod';
export let black_cell_color = 'brown';
export let coordinates_color = 'DarkOrange';

export let origin_cell_color = 'crimson';
export let target_cell_color = 'ForestGreen';

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
    cellAlgebraic,
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

import {
    handleMouseDown,
    handleMouseExited,
    handleMouseMove,
    handleMouseUp,
    isDnDOriginCell,
    isWhitePawnDragged,
    isWhiteKnightDragged,
    isWhiteBishopDragged,
    isWhiteRookDragged,
    isWhiteQueenDragged,
    isWhiteKingDragged,
    isBlackPawnDragged,
    isBlackKnightDragged,
    isBlackBishopDragged,
    isBlackRookDragged,
    isBlackQueenDragged,
    isBlackKingDragged,
} from './util/DragAndDrop.js';

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

$: dndOriginCellStyle = `
    background-color: ${origin_cell_color};
    width: ${cellsSize}px;
    height: ${cellsSize}px;
`;

$: dndTargetCellStyle = `
    background-color: ${target_cell_color};
    width: ${cellsSize}px;
    height: ${cellsSize}px;
`;

let whiteTurnStyle = `
    background-color: white;
`;

let blackTurnStyle = `
    background-color: black;
`;

let dragAndDropInProgress;
let dndPieceData;
let targetFile, targetRank;
let dndLocation;

$: dndPieceStyle = [null, undefined].includes(dndLocation) ? '' : `
    position: absolute;
    left: ${dndLocation.x}px;
    top: ${dndLocation.y}px;
`;

function cancelDnd() {
    dragAndDropInProgress = false;
    dndPieceData = undefined;
    dndLocation = undefined;
    targetFile = undefined;
    targetRank = undefined;
}

function updateLogic() {
    // Update the logic variable => update the board !
    logic = logic;
}

function setupDnd({x, y, file, rank, piece}) {
    dndLocation = {
        x, y,
    };

    dndPieceData = {
        ...piece,
        originCell: {file, rank},
    };

    targetFile = file;
    targetRank = rank;

    dragAndDropInProgress = true;
}

function updateDndLocation(x, y, file, rank) {
    dndLocation = {
        x, y,
    };

    targetFile = file;
    targetRank = rank;
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
     on:mousedown|preventDefault={(event) => handleMouseDown({event, cellsSize, reversed, rootElement, 
        logic, dragAndDropInProgress, setupDnd})}
     on:mousemove|preventDefault={(event) => handleMouseMove({event, dragAndDropInProgress,
        updateDndLocation, rootElement, cancelDnd, cellsSize, reversed})}
     on:mouseup|preventDefault={(event) => handleMouseUp({event, cellsSize, reversed, rootElement,
        logic, dragAndDropInProgress, dndPieceData, cancelDnd, updateLogic})}
     on:mouseleave|preventDefault={(event) => handleMouseExited({event, cancelDnd})}
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
                        <div 
                            style={targetFile === file && targetRank === rank ? dndTargetCellStyle : dndOriginCellStyle}
                        ></div>
                    {:else if isWhitePawnAtCell(logic, file, rank)}
                        <chess-white-pawn size={cellsSize} 
                            style={targetFile === file && targetRank === rank ? dndTargetCellStyle : ''} 
                        />
                    {:else if isWhiteKnightAtCell(logic, file, rank)}
                        <chess-white-knight size={cellsSize}
                            style={targetFile === file && targetRank === rank ? dndTargetCellStyle : ''}
                         />
                    {:else if isWhiteBishopAtCell(logic, file, rank)}
                        <chess-white-bishop size={cellsSize}
                            style={targetFile === file && targetRank === rank ? dndTargetCellStyle : ''}
                         />
                    {:else if isWhiteRookAtCell(logic, file, rank)}
                        <chess-white-rook size={cellsSize}
                            style={targetFile === file && targetRank === rank ? dndTargetCellStyle : ''}
                         />
                    {:else if isWhiteQueenAtCell(logic, file, rank)}
                        <chess-white-queen size={cellsSize} 
                            style={targetFile === file && targetRank === rank ? dndTargetCellStyle : ''}
                        />
                    {:else if isWhiteKingAtCell(logic, file, rank)}
                        <chess-white-king size={cellsSize}
                            style={targetFile === file && targetRank === rank ? dndTargetCellStyle : ''}
                         />

                    {:else if isBlackPawnAtCell(logic, file, rank)}
                        <chess-black-pawn size={cellsSize} 
                            style={targetFile === file && targetRank === rank ? dndTargetCellStyle : ''}
                        />
                    {:else if isBlackKnightAtCell(logic, file, rank)}
                        <chess-black-knight size={cellsSize} 
                            style={targetFile === file && targetRank === rank ? dndTargetCellStyle : ''}
                        />
                    {:else if isBlackBishopAtCell(logic, file, rank)}
                        <chess-black-bishop size={cellsSize} 
                            style={targetFile === file && targetRank === rank ? dndTargetCellStyle : ''}
                        />
                    {:else if isBlackRookAtCell(logic, file, rank)}
                        <chess-black-rook size={cellsSize} 
                            style={targetFile === file && targetRank === rank ? dndTargetCellStyle : ''}
                        />
                    {:else if isBlackQueenAtCell(logic, file, rank)}
                        <chess-black-queen size={cellsSize} 
                            style={targetFile === file && targetRank === rank ? dndTargetCellStyle : ''}
                        />
                    {:else if isBlackKingAtCell(logic, file, rank)}
                        <chess-black-king size={cellsSize} 
                            style={targetFile === file && targetRank === rank ? dndTargetCellStyle : ''}
                        />
                    {:else}
                        <div
                            style={targetFile === file && targetRank === rank ? dndTargetCellStyle : ''}
                        ></div>
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