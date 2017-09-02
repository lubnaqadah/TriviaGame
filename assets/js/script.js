var intervalId;


var elements = {
	seconds : 31,
	right: 0,
	wrong:0,
	unanswered:0,
	counter:0,
	questions : [
				"Who is the best player in the world for 20015/2016?",
				"who is the best midfielder in europe in 2016/2017?",
				"who is the best defender in europe in 2016/2017?",
				"who is the best goalscorer in the world in 2016/2017?",
				"who is the best goalkeeper in europe 2016/2017?"],
	answers : ["Cristiano Ronaldo", "Luka Modric", "Sergio Ramos", "Lionel Messi", "gianluigi buffon"],
	options : [["Cristiano Ronaldo", "Lionel Messi", "Neymar", "Manuel Neuer"],
			   ["Andres Iniesta", "Toni Kroos", "Luka Modric", "Paul Pogba"],
			   ["Giorgio Chiellini", "Leonardo Bonucci","jerome boateng", "Sergio Ramos"],
			   ["Cristiano Ronaldo", "Lionel Messi", "Luis suarez", "Zlatan Ibrahimovic"],
			   ["Manuel Neuer", "gianluigi buffon", "Jan Oblak", "Kelor Navas"]],
	images :["https://media.giphy.com/media/r1IMdmkhUcpzy/giphy.gif", "https://thumbs.gfycat.com/LimpingJadedDinosaur-size_restricted.gif", 				"http://37.media.tumblr.com/48682ebe5c3f172effd9cbcddc87d41d/tumblr_n4t1nipXk41shaydvo5_r1_250.gif", 	"https://media.giphy.com/media/3oriNVc5SDHOsWcCM8/giphy.gif", "https://media.giphy.com/media/V7ZPPcPScxNza/giphy.gif"]
	
	};

function timer(){
	elements.seconds--;
	
  $("#timer").html("Time Remaining: " + elements.seconds);

  if (elements.seconds === 0) {
	  stop();
	  var y = $("<img>");
	  y.attr("src", elements.images[elements.counter]);
	  $("#question").html("<h3>The correct answer was:</h3>"  + elements.answers[elements.counter]+ "<br>");
	  $("#question").append(y);
		
		elements.unanswered++;
		setTimeout(wait, 3000);
	
  }
};


function start(){
	$(".main").append("<button class='start'>Start</button>")
};

function stop(){
	clearInterval(intervalId);
}

function quiz(){
	
	var question = $("<h2>");
	
	question.text(elements.questions[elements.counter]);
	
	for (var i =0; i < 4; i++){
		var x = $("<h3>");
		x.addClass("hover");
		x.text(elements.options[elements.counter][i]);
		question.append(x);
	};
	$("#question").html(question);
		console.log(question)

};

function wait(){
	if (elements.counter < 4){
		elements.counter++;
		quiz();
		intervalId = setInterval(timer, 1000);
		elements.seconds=31;
	}else{
		final();
	};
};


function final(){
	var result = $("<div>");
	result.append("<h3> Unanswered Questions: " + elements.unanswered + "</h3>");
	result.append("<h3> Correct Answers: " + elements.right + "</h3>");
	result.append("<h3> Incorrect Answers: " + elements.wrong + "</h3>");
	result.append("<button class='reset start'>Start Over</button>")
	$(".main").html(result)
	
};



start();

$(".start").on("click", function(){
	$(this).remove();  
	intervalId = setInterval(timer, 1000);
	quiz();
});


$(document).on("click", "h3", function(){
	stop();
	
	var y = $("<img>");
		y.attr("src", elements.images[elements.counter]);
	if($(this).text() == elements.answers[elements.counter]){
		
		$("#question").html("<h1>Yes You got it!!</h1>" + "<br>");
		$("#question").append(y);
		elements.right++;
		setTimeout(wait, 3000);
		
	}else{
		$("#question").html("<h1>Nope!!</h1>"+ "<h3>The correct answer was:</h3>"  + elements.answers[elements.counter]+ "<br>");
		$("#question").append(y);
		
		elements.wrong++;
		setTimeout(wait, 3000);
	}
});

$(document).on("click", ".reset", function(){
	$(".main").empty();
	elements.seconds = 0;
	elements.right = 0;
	elements.wrong = 0;
	elements.unanswered = 0;
	elements.counter = 0;
	intervalId = setInterval(timer, 1000);
	quiz();
});