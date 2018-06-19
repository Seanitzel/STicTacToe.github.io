//Vars
var N = prompt("Choose Game Dimensions Please!");
var turn = 'X';
var board = document.createElement('table');

var rows_seq = new Array(N);
var cols_seq = new Array(N);
var diag_seq = [new seq(), new seq()];
var restart = false;
var winner = null;
var move_count = 0;

//Game Sequence Object
function seq(){
	this.size = 0;
	this.sign = null;
	this.alive = true;
	this.reset = function(){
		this.size = 0;
		this.sign = null;
		this.alive = true;
	}
}

//main function
function main(){
	while (isNaN(N) || N < 3) {
		N = prompt("Enter A Number Greater Than 2!");
	}

	for (var i = 0; i < N; i++) {
		rows_seq[i] = new seq();
		cols_seq[i] = new seq();
		var row = document.createElement('tr')
		board.appendChild(row);
		for (var j = 0; j < N; j++) {

			var cell = document.createElement('td');
			cell.setAttribute('height', 100);
			cell.setAttribute('width', 100);
			cell.setAttribute('align', 'center');
			cell.setAttribute('valign', 'center');
			cell.addEventListener('click', playTurn);
			row.appendChild(cell);

		}
	}

	document.getElementById('game').appendChild(board);
}


//when playing a turn
function playTurn(){
	var row = this.parentNode.rowIndex;
	var col = this.cellIndex;
	if(this.textContent == "")
	{
		this.textContent = turn;
		playTurnHelp(rows_seq, row);
		playTurnHelp(cols_seq, col);
		if(row == col)
			playTurnHelp(diag_seq, 0);
		if(row + col == N - 1)
			playTurnHelp(diag_seq, 1);

		move_count++;
		changeTurn();
	}
	if(restart == true || move_count == N*N)
		setTimeout(newGame, 100);
		
}

//changing the turn
function changeTurn(){
	if(turn == 'X')
		turn = 'O';
	else 
		turn = 'X';
}

//get sequence, index and check everything = make the code more efficient
function playTurnHelp(seq, index) {
	if(seq[index].alive == true) {
		seq[index].size++;
		if(seq[index].sign == null)
			seq[index].sign = turn;
		else if(seq[index].sign == turn)
		{
			if(checkWin(seq[index].size)){
				winner = seq[index].sign;
				restart = true;
			}
		}
		else {
			seq[index].alive = false;
		}
	}

}

//check if there is a winner
function checkWin(seq_size){
	if(seq_size == N)
		return true;
	return false;
}

function newGame() {
	alert("WooHoo! " + winner + " Won!");
	for (var i = 0; i < N; i++) {
		rows_seq[i].reset();
		cols_seq[i].reset();;
		for (var j = 0; j < N; j++) {
			board.rows[i].cells[j].textContent = "";
		}
	}
	diag_seq[0].reset();
	diag_seq[1].reset();

	turn = 'X';
	move_count = 0;
	winner = null;
	restart = false;
}

main();