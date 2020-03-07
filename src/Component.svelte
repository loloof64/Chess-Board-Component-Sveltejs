<script>
export let size = 100;
export let background = '#124589';

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

$: cellsSize = size / 9.0;
$: halfCellsSize = cellsSize * 0.5;

$: gridTemplate = `${halfCellsSize}px repeat(8, ${cellsSize}px) ${halfCellsSize}px / ${halfCellsSize}px repeat(8, ${cellsSize}px) ${halfCellsSize}px`;
$: rootStyle = `
    width: ${size}px;
    height: ${size}px;
    background-color: ${background};
    position: relative;
    display: grid;
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
    display: flex;
    justify-content: center;
    align-items: center;
`;
</script>

<svelte:options tag="loloof64-chessboard" />
<div id="root" style={rootStyle}>
    <div></div>
    {#each Array(8) as undef0, columnIndex}
        <div style={coordinateStyle}>{String.fromCharCode('A'.charCodeAt(0) + columnIndex)}</div>
    {/each}
    <div></div>

    {#each Array(8) as undef1, lineIndex}
        <div style={coordinateStyle}>{String.fromCharCode('1'.charCodeAt(0) + 7 - lineIndex)}</div>
        {#each Array(8) as undef2, columnIndex}
            <div style="{((lineIndex + columnIndex) % 2)  === 0 ? whiteCellsStyle : blackCellsStyle}">
                <chess-black-king size={cellsSize} />
            </div>
        {/each}
        <div style={coordinateStyle}>{String.fromCharCode('1'.charCodeAt(0) + 7 - lineIndex)}</div>
    {/each}

    <div></div>
    {#each Array(8) as undef0, columnIndex}
        <div style={coordinateStyle}>{String.fromCharCode('A'.charCodeAt(0) + columnIndex)}</div>
    {/each}
    <div></div>
</div>