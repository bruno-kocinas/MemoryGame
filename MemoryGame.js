var MemoryGame = {};

document.getElementById("r3c4").addEventListener("click", function(e) {
	MemoryGame.defSize(e);
	MemoryGame.start();
});
document.getElementById("r4c6").addEventListener("click", function(e) {
	MemoryGame.defSize(e);
	MemoryGame.start();
});
document.getElementById("r6c6").addEventListener("click", function(e) {
	MemoryGame.defSize(e);
	MemoryGame.start();
});

MemoryGame.rows;
MemoryGame.cols;

MemoryGame.defSize = function(e) {
	MemoryGame.rows = parseInt(e.target.id.charAt(1));
	MemoryGame.cols = parseInt(e.target.id.charAt(3));
	MemoryGame.size = MemoryGame.rows*MemoryGame.cols;
}

MemoryGame.start = function() {
	document.getElementById("init").style.display = "none";
	document.getElementById("table").classList.remove("none");
	MemoryGame.genStructure(MemoryGame.rows, MemoryGame.cols);
	MemoryGame.genPositions(MemoryGame.size);
	MemoryGame.genCards(MemoryGame.size);
	MemoryGame.assignPositions();
}

MemoryGame.genStructure = function(rows, cols) {
	for(var i = 1; i < rows + 1; i++) {
		var tr = document.createElement("tr");
		for(var j = 1; j < cols + 1; j++) {
			var td = document.createElement("td");
			if (i == 1)
				var idNum = j;
			else
				var idNum = (i - 1)*cols + j;
			td.id = "td" + idNum;
			tr.appendChild(td);
		}
		document.getElementById("table").appendChild(tr);
	}
};

MemoryGame.genPositions =  function(size) {
	MemoryGame.randPositions = [];
	function rand(max) {
		return Math.floor(Math.random()*Math.floor(max));
	}
	var i = 0;
	var keys = new Map();
	do {
		var position = rand(size) + 1;
		if(!keys.has(position)){
			keys.set(position, null);
			MemoryGame.randPositions.push(position);
			i++;
		}
	} while (i < size);
};

MemoryGame.genCards =  function(size) {
	MemoryGame.cards = [];
	var half = parseInt(size/2);
	for (var i = 1; i < half + 1; i++) {
		var card1 = document.createElement("div");
		var card2 = document.createElement("div");
		card1.classList.add("img" + i);
		card1.name = "img" + i;
		card1.id = "c" + i;
		card1.classList.add("hidden");
		card2.classList.add("img" + i);
		card2.name = "img" + i;
		card2.id = "c" + parseInt(half + i);
		card2.classList.add("hidden");
		card1.addEventListener("click", MemoryGame.clickedCheck);
		card2.addEventListener("click", MemoryGame.clickedCheck);
		MemoryGame.cards.push(card1);
		MemoryGame.cards.push(card2);
	}
};

MemoryGame.assignPositions = function() {
	for(var i = 0; i < MemoryGame.cards.length; i++) {
		var cell = document.getElementById("td" + MemoryGame.randPositions[i]);
		cell.appendChild(MemoryGame.cards[i]);
	}
};

MemoryGame.ClickedCards = [];

MemoryGame.clickedCheck = function(e) {
	MemoryGame.ClickedCards.push(e.target);
	if (MemoryGame.ClickedCards.length < 3) {
		e.target.classList.remove("hidden");
	}
	if (MemoryGame.ClickedCards.length == 2) {
		MemoryGame.compareCard(MemoryGame.ClickedCards);
	}
};

MemoryGame.right = 0;
MemoryGame.wrong = 0;

MemoryGame.compareCard = function() {
	var firstClicked = MemoryGame.ClickedCards[0];
	var secondClicked = MemoryGame.ClickedCards[1];
	if(firstClicked.id != secondClicked.id && firstClicked.name == secondClicked.name) {
		MemoryGame.right++;
		firstClicked.removeEventListener("click", MemoryGame.clickedCheck);
		secondClicked.removeEventListener("click", MemoryGame.clickedCheck);
		MemoryGame.ClickedCards = [];
	}
	else {
		MemoryGame.wrong++;
		setTimeout(function() {
			firstClicked.classList.add("hidden");
			secondClicked.classList.add("hidden");
			MemoryGame.ClickedCards = [];
		}, 1000);
	}
};