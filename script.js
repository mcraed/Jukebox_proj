$(document).ready(function(){
	console.log('working');

	function Jukebox(){


		function Song(name, artist, file_name){
			this.name = name;
			this.artist = artist;
			this.file_name = file_name;
		}
		// default songs
		var american_idiot = new Song('American Idiot', 'Green Day', 'audio/American_idiot.mp3'); 
		var castles = new Song('Castles Made of Sand', 'Jimi Hendrix', 'audio/Castles_Made_of_Sand.mp3'); 
		var cemetery_drive = new Song('Cemetery Drive', 'My Chemical Romance', 'audio/Cemetery_drive.mp3'); 
		var helena = new Song('Helena', 'My Chemical Romance', 'audio/Helena.mp3');

		var songs = [american_idiot, castles, cemetery_drive, helena];

		var audio = document.createElement('audio');
		var shuffle = true; // default shuffle setting
		var track_count = songs.length;
		var i = Math.floor((Math.random() * track_count));
		var clicked = true;	// regarding play click event

		audio.src = songs[i].file_name;

		this.play = function(){
			audio.play();
		}

		var random_track = function(){
			audio.pause();
			audio.currentTime = 0;
			i = Math.floor((Math.random() * track_count));
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

				if(i == track_count - 1){
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