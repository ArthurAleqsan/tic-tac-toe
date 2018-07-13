'use strict';

var arr_X = [];
var arr_O = [];
var board = [];
var val = void 0;
var indicator = false;
var turn = true;
var inputVal = void 0;

function whoStart(player) {
    inputVal = document.querySelector('#num').value;
    if (typeof inputVal !== 'number' && inputVal < 3 || inputVal > 50) {
        var msgContainer = document.querySelector('.err-msg');
        msgContainer.style.display = 'block';
        return;
    }
    _paintBoard();
    if (player.id === 'computer') {
        aiPlayer();
    } else {
        turn = !turn;
        if (turn) aiPlayer();
    }
    closeModal();
}

function _paintBoard() {

    var container = document.querySelector('#container');

    closeModal();
    container.style.display = 'flex';

    var _loop = function _loop(i) {

        board.push('' + i);
        var item = document.createElement('div');
        container.appendChild(item);
        item.setAttribute('id', '' + i);
        item.classList.add('main-container-item');
        item.style.width = 100 / inputVal + '%';
        item.style.height = 100 / inputVal + '%';
        item.addEventListener('click', function () {
            addChar(item);
        });
    };

    for (var i = 1; i < inputVal * inputVal + 1; i++) {
        _loop(i);
    }
}
function aiPlayer() {
    var boardRandomElem = board[Math.floor(Math.random() * board.length)];
    var item = document.getElementById(boardRandomElem);
    if (!board.length) return;
    addChar(item);
}
function addChar(item) {
    var lineNum = Math.ceil(+item.id / inputVal);
    if (!board.includes(item.id)) return;
    if ((arr_O.length + arr_X.length) % 2 === 0) {
        val = 'X';

        arr_X.push(+item.id);
        board.splice(board.indexOf(item.id), 1);
        if (indicator) return;
        item.innerHTML = val;
        arr_X.sort(function (a, b) {
            return a - b;
        });
        arr_X = arr_X.map(function (elem) {
            return +elem;
        });
        _check(+item.id, lineNum, arr_X, val);
        turn = !turn;
        if (turn) aiPlayer();
    } else {
        val = 'O';
        arr_O.push(+item.id);
        board.splice(board.indexOf(item.id), 1);
        if (indicator) return;
        item.innerHTML = val;
        _check(+item.id, lineNum, arr_O, val);
        turn = !turn;
        if (turn) aiPlayer();
    }
}
function _check(id, lineNum, targetArr, player) {
    inputVal = +inputVal;
    //horizontal checking
    if (targetArr.includes(id) && targetArr.includes(id + 1) && targetArr.includes(id + 2) && (id + 2) / (lineNum * inputVal) <= 1 || targetArr.includes(id - 1) && targetArr.includes(id) && targetArr.includes(id + 1) && (id + 1) / (lineNum * inputVal) <= 1 || targetArr.includes(id - 2) && targetArr.includes(id - 1) && targetArr.includes(id) && id / (lineNum * inputVal) <= 1) {
        _win(player);
    }
    //vertical checking
    else if (targetArr.includes(id) && targetArr.includes(id + inputVal) && targetArr.includes(id + 2 * inputVal) || targetArr.includes(id - inputVal) && targetArr.includes(id) && targetArr.includes(id + inputVal) || targetArr.includes(id - 2 * inputVal) && targetArr.includes(id - inputVal) && targetArr.includes(id)) {
            _win(player);
        }
        // diagonal checking A to Z
        else if (targetArr.includes(id) && targetArr.includes(id + inputVal + 1) && targetArr.includes(id + 2 * (inputVal + 1)) || targetArr.includes(id - (inputVal + 1)) && targetArr.includes(id) && targetArr.includes(id + inputVal + 1) || targetArr.includes(id - 2 * (inputVal + 1)) && targetArr.includes(id - (inputVal + 1)) && targetArr.includes(id)) {
                _win(player);
            }
            //diagonal checking Z to A
            else if (targetArr.includes(id) && targetArr.includes(id - (inputVal - 1)) && targetArr.includes(id - 2 * (inputVal - 1)) || targetArr.includes(id - (inputVal - 1)) && targetArr.includes(id) && targetArr.includes(id + (inputVal - 1)) || targetArr.includes(id + 2 * (inputVal - 1)) && targetArr.includes(id + (inputVal - 1)) && targetArr.includes(id)) {
                    _win(player);
                }
}
function _win(winner) {

    alert(winner + ' is win');
    location.reload();
}
function closeModal() {
    var modal = document.querySelector('#myModal');
    modal.style.display = "none";
}