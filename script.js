$(document).ready(function(){

	console.log('working');

	function Jukebox(){

		function Song(name, artist, file_name){
			this.name = name;
			this.artist = artist;
			this.file_name = file_name;
		}

		// default songs
		var castles = new Song('Castles Made of Sand', 'Jimi Hendrix', 'audio/Castles_Made_of_Sand.mp3'); 
		var cemetery_drive = new Song('Cemetery Drive', 'My Chemical Romance', 'audio/Cemetery_drive.mp3'); 
		var helena = new Song('Helena', 'My Chemical Romance', 'audio/Helena.mp3');
		var berry = new Song('The Blacker the Berry', 'Kendrick Lamar', 'audio/The_Blacker_the_Berry.mp3')
		var taylor_gang = new Song('Taylor Gang', 'Wiz Khalifa', 'audio/Taylor_Gang.mp3')

		songs = [taylor_gang, berry, castles, cemetery_drive, helena];

		 audio = document.createElement('audio');
		var shuffle = true; // default shuffle setting
		var track_count = songs.length;
		var i = Math.floor((Math.random() * track_count));
		var clicked = true;	// regarding play click event; true because audio plays on load
		 now_playing = songs[i];
		 play_history = [];
		var	h	= play_history.length - 1;

		audio.src = songs[i].file_name;
			e = 0;

		// this is the playlist (ul) - add click event that will play corresponding song and push to play history  
		var song_list = $('#playlist');
		songs.map( (song, f) => {
			var li = $('<li/>')
				.addClass('song-name')
				.appendTo(song_list);
			var a = $('<a>')
				.addClass('playlist-item')
				.attr('href', '#')
				.text(song.name + ' - ' + song.artist)
				.appendTo(li);
		});

		// make this functional - to play song on click (for testing); then to place in song order queue
		// $('.playlist-item').on('click', function(){
		// 	now_playing = this
		// 	$('#now-playing').text(now_playing.name + ' - ' + now_playing.artist);
		// 	history_push(now_playing);
		// });

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



		$(audio).on('ended', function(){
			if(shuffle){
				random_track();				
			}else{
				i = i + 1
				audio.src = songs[i].file_name;
				audio.play();
				now_playing = songs[i];
				history_push(now_playing);
			}
		});

		this.play = function(){
			audio.play();
			$('#now-playing').text(now_playing.name + ' - ' + now_playing.artist);
			history_push(now_playing);
		}

		$('#aud-stop').on('click', function(){
			audio.pause();
			audio.currentTime = 0;
			now_playing = 0;
		});
		
		$('#aud-play').on('click', function(){

			if(now_playing == 0){
				random_track();
			}else{
				if(!clicked){
					audio.play();
					clicked = true;	
				}else{
					audio.pause();
					clicked = false;				
				};
			};
		});


		$('#aud-shuffle').click(function(){

			if(!shuffle){
				shuffle = true;
			}else{
				shuffle =  false;
			};

			show_shuffle_status();
		});

		$('#aud-last').on('click', function(){

			if(audio.currentTime > 4){
				audio.currentTime = 0;
				audio.play();	
				h = play_history.length - 1;
			}else{
					if(h == 0){					
						h = 0;
						// maybe alert the user that it is the start of their play history
					}else{
						h = h - 1
						audio.src = play_history[h].file_name;
						audio.play();
						now_playing = play_history[h];
						$('#now-playing').text(now_playing.name + ' - ' + now_playing.artist);
				};
			};
		});

		$('#aud-next').on( 'click', function(){
		
			// testing if element is NOT in an array
			if(now_playing === play_history[h] ){
				if(h == play_history.length - 1){
					random_track();
				}else{
					h = h + 1;
					audio.src = play_history[h].file_name;
					audio.play();
					now_playing = play_history[h];
					$('#now-playing').text(now_playing.name + ' - ' + now_playing.artist);
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

		$('#add-song-submit').on('click', function(){
			var song_name = $('#song-name-input').val();
			var artist_name = $('#artist-name-input').val();
			var file_name = $('#file-name-input').val();

			var new_song = new Song(song_name, artist_name, file_name);
			songs.push(new_song);
			i = songs.length - 1
			audio.src = songs[i].file_name;
			audio.play();
			now_playing = songs[i]
			$('#now-playing').text(now_playing.name + ' - ' + now_playing.artist);

			var li = $('<li/>')
				.addClass('song-name')
				.appendTo(song_list);
			var a = $('<a>')
				.addClass('playlist-item')
				.attr('href', '#')
				.text(new_song.name + ' - ' + new_song.artist)
				.appendTo(li);

			console.log(song_name +' by ' + artist_name + " has been added to your playlist!");
			history_push();
		});
	};

	var tunes = new Jukebox();
	tunes.play();


});