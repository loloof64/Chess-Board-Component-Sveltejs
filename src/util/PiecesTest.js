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

export function isWhitePawnAtCell(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'p' && piece.color === 'w';
}

export function isWhiteKnightAtCell(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'n' && piece.color === 'w';
}

export function isWhiteBishopAtCell(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'b' && piece.color === 'w';
}

export function isWhiteRookAtCell(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'r' && piece.color === 'w';
}

export function isWhiteQueenAtCell(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'q' && piece.color === 'w';
}

export function isWhiteKingAtCell(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'k' && piece.color === 'w';
}

export function isBlackPawnAtCell(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'p' && piece.color === 'b';
}

export function isBlackKnightAtCell(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'n' && piece.color === 'b';
}

export function isBlackBishopAtCell(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'b' && piece.color === 'b';
}

export function isBlackRookAtCell(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'r' && piece.color === 'b';
}

export function isBlackQueenAtCell(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'q' && piece.color === 'b';
}

export function isBlackKingAtCell(chessLogic, columnIndex, lineIndex) {
    const piece = getPieceAt(chessLogic, columnIndexToFile(columnIndex), lineIndexToRank(lineIndex));
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'k' && piece.color === 'b';
}
