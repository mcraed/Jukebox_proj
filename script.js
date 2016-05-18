$(document).ready(function(){
	console.log('working');

	function Jukebox(){

		var playlist = ['audio/American_idiot.mp3', 'audio/Castles_Made_of_Sand.mp3', 'audio/Cemetery_drive.mp3', 'audio/Helena.mp3'];

		var audio = document.createElement('audio');
		var shuffle = true; // default shuffle setting
		var tracks = playlist.length;
		var i = Math.floor((Math.random() * tracks));
		var clicked = true;	// regarding play click event
		audio.src = playlist[i];

		this.play = function(){
			audio.play();
		}

		var random_track = function(){
			audio.pause();
			audio.currentTime = 0;
			i = Math.floor((Math.random() * tracks));
			audio.src = playlist[i];
			audio.play();
		};

		var show_shuffle_status = function(){
			if(shuffle){
				$('#shuffle-status').text('On');
			}else{
				$('#shuffle-status').text('On');
			};
		};

		show_shuffle_status();

		
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
			$('#shuffle-status').text(shuffle);
		});

		$('#aud-next').on( 'click', function(){
		
			if(shuffle == true){
				random_track();
			}else{

				if(i == tracks - 1){
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

	var tunes = new Jukebox();
	tunes.play();


});