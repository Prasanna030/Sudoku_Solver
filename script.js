var arr = [[], [], [], [], [], [], [], [], []];

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []];

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j];
			}

			else
				arr[i][j].innerText = '';
		}
	}
}

const GetPuzzle = document.getElementById('GetPuzzle');
let SolvePuzzle = document.getElementById('SolvePuzzle');

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = () => {
		var response = JSON.parse(xhrRequest.response);
		console.log(response);
		board = response.board;
		FillBoard(board);
	};
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy')
	xhrRequest.send()
};

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};


function isValid(board,i,j,num,n){
	for(x=0;x<n;x++){
		if(board[i][x]==num){
			return false;
		}
	}
	for( x=0;x<n;x++){
		if(board[x][j]==num){
			return false;
		}
	}
	let rn=Math.sqrt(n);
	let si=i-i%rn;
	let sj=j-j%rn;
	for( x=si;x<si+rn;x++){
		for( y=sj;y<sj+rn;y++){
			if(board[x][y]==num)return false;
		}
	}
	

}
function SudokuSolver( board,  i,  j,  n) {
	//Base Case
	if(i==n){
		FillBoard(board);
		return true;
	}
	if(j==n){
		return SudokuSolver(board,i+1,0,n);
	}
	//If cell is already filled
	if(board[i][j]!=0){
		SudokuSolver(board,i,j+1,n);
	}

	for(num=1;num<n;num++){
		if(isValid(board,i,j,num,n)){
			board[i][j]=num;
			let subAns=SudokuSolver(board,i,j+1,n);
			if(subAns){
				return true;
			}
			//Backtracking
			board[i][j]=0;
		}
	}
	return false;
}


