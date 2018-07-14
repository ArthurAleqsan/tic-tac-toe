'use strict';

var arr_X = [];
var arr_O = [];
var board = [];
var val = void 0;
var indicator = false;
var turn = true;
var inputVal = void 0;
var winComb = [];

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
    createWinCombs();
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

        _check(arr_X, val);
        turn = !turn;
        if (turn) aiPlayer();
    } else {
        val = 'O';
        arr_O.push(+item.id);
        board.splice(board.indexOf(item.id), 1);
        if (indicator) return;
        item.innerHTML = val;
        _check(arr_O, val);
        turn = !turn;
        if (turn) aiPlayer();
    }
}
function createWinCombs() {
    inputVal = +inputVal;
    var horizontalCombs = [];
    var verticalCombs = [];
    var a_to_z = new Array();
    var z_to_a = [];
    // Horizontal
    for (var i = 0; i < inputVal; i++) {
        horizontalCombs.push(new Array());
        for (var row = 1; row < inputVal + 1; row++) {
            horizontalCombs[i].push(i * inputVal + row);
        }
    }

    //vertical
    for (var _i = 0; _i < inputVal; _i++) {
        verticalCombs.push(new Array());
        for (var line = 1; line < inputVal * inputVal; line += inputVal) {
            verticalCombs[_i].push(line + _i);
        }
    }

    //diagonal A to Z
    for (var _i2 = 1; _i2 < inputVal * inputVal + 1; _i2 += inputVal + 1) {
        a_to_z.push(_i2);
    }

    //diagonal Z to A
    for (var _i3 = inputVal; _i3 < inputVal * inputVal; _i3 += inputVal - 1) {
        z_to_a.push(_i3);
    }

    winComb = winComb.concat(horizontalCombs);
    winComb = winComb.concat(verticalCombs);
    winComb.push(a_to_z);
    winComb.push(z_to_a);
}
function _check(targetArr, player) {

    for (var i = 0; i < winComb.length; i++) {
        if (winComb[i].every(function (elem) {
            return targetArr.indexOf(elem) > -1;
        })) {
            indicator = true;
            _win(player);
        }
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