export function columnIndexToFile(index) {
    return index;
}

export function lineIndexToRank(index) {
    return 7-index;
}

export function getPieceAt(chessLogic, file, rank) {
    const cellAlgebraic = `${String.fromCharCode('a'.charCodeAt(0) + file)}${String.fromCharCode('1'.charCodeAt(0) + rank)}`;
    const pieceValue = chessLogic.get(cellAlgebraic);
    return pieceValue;
}

export function isWhitePawn(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'p' && piece.color === 'w';
}

export function isWhiteKnight(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'n' && piece.color === 'w';
}

export function isWhiteBishop(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'b' && piece.color === 'w';
}

export function isWhiteRook(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'r' && piece.color === 'w';
}

export function isWhiteQueen(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'q' && piece.color === 'w';
}

export function isWhiteKing(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'k' && piece.color === 'w';
}

export function isBlackPawn(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'p' && piece.color === 'b';
}

export function isBlackKnight(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'n' && piece.color === 'b';
}

export function isBlackBishop(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'b' && piece.color === 'b';
}

export function isBlackRook(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'r' && piece.color === 'b';
}

export function isBlackQueen(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'q' && piece.color === 'b';
}

export function isBlackKing(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'k' && piece.color === 'b';
}
