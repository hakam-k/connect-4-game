import { unionWith, isEqual } from 'lodash';
export const getReversedMatrix = (matrix) => {
    const currentMatrix = getMatrixCloned(matrix);
    const newMatrix = [];
    for (let i = 0; i < currentMatrix.length; i++) {
        const arr = currentMatrix[i];
        newMatrix.push(arr.reverse());
    }
    return newMatrix;
}
export const getMatrixColumns = (matrix) => {
    const currentMatrix = getMatrixCloned(matrix);
    const newMatrix = [];
    const matrixWidth = currentMatrix[0].length;
    const matrixHeight = currentMatrix.length;
    for (let i = 0; i < matrixWidth; i++) {
        const col = [];
        for (let j = 0; j < matrixHeight; j++) {
            const currentRow = currentMatrix[j];
            col.push(currentRow[i]);
        }
        newMatrix.push(col);
    }
    return newMatrix;
}
const getMatrixCloned = (matrix) => {
    const newMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
        const arr = [...matrix[i]];
        newMatrix.push(arr);
    }
    return newMatrix;
}
export const getDiagonalArrays = (matrix) => {
    const currentMatrix = getMatrixCloned(matrix);
    const currentFlippedMatrix = getMatrixColumns(matrix);
    const currentMatrixColumns = currentMatrix[0].length;
    const currentMatrixRows = currentMatrix.length;
    const currentFlippedMatrixColumns = currentFlippedMatrix[0].length;
    const currentFlippedMatrixRows = currentFlippedMatrix.length;
    const matrixDiagonalsAboveMainDiagonal = getDiagonalOneDirection(currentMatrixColumns, getMatrixCloned(alignDiagonals(currentMatrixRows, currentMatrix)));
    const matrixDiagonalsUnderMainDiagonal = getDiagonalOneDirection(currentFlippedMatrixColumns, getMatrixCloned(alignDiagonals(currentFlippedMatrixRows, currentFlippedMatrix)));

    return unionWith(matrixDiagonalsAboveMainDiagonal, matrixDiagonalsUnderMainDiagonal, isEqual);
}
const alignDiagonals = (matrixRows, currentMatrix) => {
    const newMatrix = [];
    for (let i = 0; i < matrixRows; i++) {
        const row = currentMatrix[i];
        for (let j = 0; j < i; j++) {
            const popedElement = row.shift();
            row.push(popedElement);
        }
        newMatrix.push(row);
    }
    return newMatrix;
}
const getDiagonalOneDirection = (matrixColumns, matrix) => {
    const matrixDiagonals = [];
    for (let i = 0; i < matrixColumns; i++) {
        const col = [];
        for (let j = 0; (matrixColumns - j - i) > 0; j++) {
            const currentRow = matrix[j];
            if (currentRow) { col.push(currentRow[i]); }
        }
        matrixDiagonals.push(col);
    }
    return matrixDiagonals;
}
export const check4ConnectedInArray = (arr) => {
    let redConnectedCounter = 0, yellowConnectedCounter = 0, currentPosibleWinner = 0;
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (currentPosibleWinner !== element) {
            redConnectedCounter = 0;
            yellowConnectedCounter = 0;
        }
        if (element === 1) {
            currentPosibleWinner = 1;
            redConnectedCounter = redConnectedCounter + 1;
        }
        if (element === 2) {
            currentPosibleWinner = 2;
            yellowConnectedCounter = yellowConnectedCounter + 1;
        }
        if (redConnectedCounter === 4) { return 1; }
        if (yellowConnectedCounter === 4) { return 2; }
    }
    return 0;
}