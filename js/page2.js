document.addEventListener('DOMContentLoaded', function() {
	const video = document.getElementById('mainVideo');
	
	const tryUnmute = () => {
		if(video.muted) {
			video.muted = false;
			video.removeEventListener('play', tryUnmute);
		}
	};
	
	video.addEventListener('play', tryUnmute);
	
	const playPromise = video.play();
	
	if (playPromise !== undefined) {
		playPromise.catch(error => {
			console.log("Автовоспроизведение заблокировано:", error);
			const warning = document.createElement('div');
			warning.className = 'play-warning';
			warning.innerHTML = 'Нажмите на видео для запуска';
			video.parentNode.appendChild(warning);
			
			video.controls = true;
			video.muted = false;
		});
	}
});