$(document).ready(function(){
	console.log('working');

	function Jukebox(){

		playlist = ['audio/American_idiot.mp3', 'audio/Castles_Made_of_Sand.mp3', 'audio/Cemetery_drive.mp3', 'audio/Helena.mp3'];

		var audio = document.createElement('audio');
		shuffle = true
		i = Math.floor((Math.random() * tracks));

		
		audio.src = playlist[i];

		this.play = function(){
			audio.play();
		}

		random_track = funtion(){
			audio.pause();
			audio.currentTime = 0;
			i = Math.floor((Math.random() * tracks));
			audio.src = playlist[i];
			audio.play();
		};

		var clicked = true;	//set to true since audio will play on load.
		
		$('#aud-play').on('click', function(){

			if(clicked == false){
				audio.play();
				clicked = true;	
			}else{
				audio.pause();
				clicked = false;				
			};
		});

		$('#aud-stop').click(function(){
			audio.pause();
			audio.currentTime  = 0;	
		});

		$('#aud-shuffle').click(function(){
			if(shuffle){
				shuffle = false;
			}else{
				shuffle = true;
			};

		});

		$('#aud-next').on( 'click', function(){
				var tracks = playlist.length;
			
			if(shuffle){
				random_track
			}else{
				audio.pause();
				audio.currentTime = 0;
				i++;
				audio.src = playlist[i];
				audio.play();
			};
		});


		$('#aud-random').click(function(){
			random_track
		});	

	};

	var mission = new Jukebox();
	mission.play();


});