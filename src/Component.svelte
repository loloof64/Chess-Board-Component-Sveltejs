<script>
export let size = 100;
export let background = '#124589';

$: rootStyle = `
    width: ${size}px;
    height: ${size}px;
    background-color: ${background};
`;
</script>

<svelte:options tag="loloof64-chessboard" />
<div id="root" style={rootStyle}>
</div>