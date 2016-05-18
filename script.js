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
		 now_playing = songs[i];
		 play_history = [];
		var	h	= play_history.length - 1;
		var back_clicked = false

		audio.src = songs[i].file_name;

		var history_push = function(){
			play_history.push(now_playing);
		};

		var random_track = function(){
			audio.pause();
			audio.currentTime = 0;
			i = Math.floor((Math.random() * track_count));
			audio.src = songs[i].file_name;
			audio.play();
			now_playing = songs[i];
			$('#now-playing').text(now_playing.name + ' - ' + now_playing.artist);
			history_push(now_playing);
		};

		var show_shuffle_status = function(){
			if(shuffle){
				$('#shuffle-status').text('On');
			}else{
				$('#shuffle-status').text('Off');
			};
		};
		show_shuffle_status();

		this.play = function(){
			audio.play();
			$('#now-playing').text(now_playing.name + ' - ' + now_playing.artist);
			history_push(now_playing);
		}
		
		$('#aud-play').on('click', function(){

			if(!clicked){
				audio.play();
				clicked = true;	
			}else{
				audio.pause();
				clicked = false;				
			};
		});

		$('#aud-shuffle').click(function(){

			if(!shuffle){
				random_track();
				shuffle = true;
			}else{
				shuffle =  false;
			};

			show_shuffle_status();
		});

		$('#aud-last').on('click', function(){

			if(!back_clicked){
				audio.currentTime = 0;
				audio.play();
				back_clicked = true;
				h = play_history.length - 1;
				console.log('you did not click this before, but now we can see that you have! Heres the song again');
			}else{
					if(h == 0){
						console.log("You're right where you started!");
						h = 0;
					}else{
						h = h - 1
						audio.src = play_history[h].file_name;
						audio.play();
						now_playing = play_history[h];
						$('#now-playing').text(now_playing.name + ' - ' + now_playing.artist);
						console.log('you already clicked this. Were digging in your history to grab the song you heard before this one');
				};
			};
		});

		$('#aud-next').on( 'click', function(){
		
		// testing if element is NOT in an array
		if(now_playing === play_history[h] ){
			
			if(h === play_history.length - 1){
				random_track();
				console.log('well you thats all of your history! heres a random song; lets go from there')
			}else{
				h = h + 1;
				audio.src = play_history[h].file_name;
				audio.play();
				now_playing = play_history[h];
				$('#now-playing').text(now_playing.name + ' - ' + now_playing.artist);
				console.log('this song is coming from your history')
			};
		}else{
			if(shuffle){
				random_track();
			}else{

				if(i == track_count - 1){
					i = 0;					
				}else{
					i = i + 1;
				};
				audio.src = songs[i].file_name;
				audio.play();
				now_playing = songs[i];
				$('#now-playing').text(now_playing.name + ' - ' + now_playing.artist);
				history_push(now_playing);
			};
		};	
	});



		$('#aud-random').click(function(){
			random_track();
		});	

	};

	var tunes = new Jukebox();
	tunes.play();


});