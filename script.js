$(document).ready(function(){
	console.log('working');

	function Jukebox(){

		playlist = ['audio/American_idiot.mp3', 'audio/Castles_Made_of_Sand.mp3', 'audio/Cemetery_drive.mp3', 'audio/Helena.mp3'];

		var audio = document.createElement('audio');

		shuffle = true;
		tracks = playlist.length;
		i = Math.floor((Math.random() * tracks));
		audio.src = playlist[i];

		this.play = function(){
			audio.play();
		}

		random_track = function(){
			audio.pause();
			audio.currentTime = 0;
			i = Math.floor((Math.random() * tracks));
			audio.src = playlist[i];
			audio.play();
		};

		var clicked = true;	//set to true since audio will play on load.
		
		$('#aud-play').on('click', function(){

			if(!clicked){
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

			if(!shuffle){
				random_track();
				shuffle = true;
			}else{
				shuffle =  false;
			};

		});

		$('#aud-next').on( 'click', function(){
		
			if(shuffle == true){
				random_track();
			}else{

				if(i == playlist.length - 1){
					i = 0;					
				}else{
					i = i + 1;
				};
				audio.src = playlist[i];
				audio.play();
			};
		});


		$('#aud-random').click(function(){
			random_track();
		});	

	};

	var mission = new Jukebox();
	mission.play();


});