// Интро анимация
document.addEventListener('DOMContentLoaded', () => {
	const intro = document.querySelector('.intro-overlay');
	const text = document.querySelector('.birthday-text');
	const balloonsContainer = document.querySelector('.balloons-container');

	// Анимация текста
	gsap.to(text, {
			opacity: 1,
			y: -20,
			duration: 2,
			ease: "elastic.out(1, 0.5)",
			delay: 0.5
	});

	// Создание шариков
	const balloonImages = [
			'images/balloon-red.png',
			'images/balloon-blue.png',
			'images/balloon-yellow.png'
	];

	for (let i = 0; i < 15; i++) {
			const balloon = document.createElement('img');
			balloon.className = 'balloon';
			balloon.src = balloonImages[Math.floor(Math.random() * balloonImages.length)];
			
			gsap.set(balloon, {
					x: Math.random() * window.innerWidth,
					y: window.innerHeight + 100,
					scale: Math.random() * 0.5 + 0.5,
					rotation: Math.random() * 360
			});

			gsap.to(balloon, {
					y: -200,
					x: '+=random(-100,100)',
					rotation: 'random(-360,360)',
					duration: 'random(8,12)',
					ease: "power1.out",
					delay: 'random(0,3)',
					onComplete: () => balloon.remove()
			});

			balloonsContainer.appendChild(balloon);
	}

	// Фейерверки
	function createFirework() {
			const particles = [];
			const colors = ['#ff0000', '#00ff00', '#ffff00', '#ff00ff'];

			for (let i = 0; i < 50; i++) {
					const particle = document.createElement('div');
					particle.className = 'firework';
					particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
					
					anime({
							targets: particle,
							translateX: anime.random(-200, 200),
							translateY: anime.random(-200, 200),
							scale: [0, 1, 0],
							opacity: [1, 0],
							duration: 2000,
							easing: 'easeOutExpo',
							complete: () => particle.remove()
					});

					intro.appendChild(particle);
			}
	}

	// Таймлайн
	const tl = gsap.timeline();
	tl.delay(1)
			.call(createFirework, [], '+=1')
			.call(createFirework, [], '+=2')
			.to(intro, {
					opacity: 0,
					duration: 1.5,
					onComplete: () => intro.remove()
			}, '+=5');
});



/// 3D Scroll

let zSpacing = -1000,
lastPos = zSpacing / 5,
$frames = document.getElementsByClassName('frame'),
frames = Array.from($frames),
zVals = []

window.onscroll = function() {

let top = document.documentElement.scrollTop,
	delta = lastPos - top

lastPos = top

frames.forEach(function(n, i) {
zVals.push((i * zSpacing) + zSpacing)
zVals[i] += delta * -5.5
let frame = frames[i],
		transform = `translateZ(${zVals[i]}px)`,
		opacity = zVals[i] < Math.abs(zSpacing) / 1.8 ? 1 : 0
frame.setAttribute('style', `transform: ${transform}; opacity: ${opacity}`)
})

}

window.scrollTo(0, 1)

// Audio

let soundButton = document.querySelector('.soundbutton'),
audio = document.querySelector('.audio')

soundButton.addEventListener('click', e => {
soundButton.classList.toggle('paused')
audio.paused ? audio.play() : audio.pause()
})

window.onfocus = function() {
soundButton.classList.contains('paused') ? audio.pause() : audio.play()
}

window.onblur = function() {
audio.pause()
}

// ====== Код для аутро и возврата ======
const outroOverlay = document.querySelector('.outro-overlay');
const mainContainer = document.querySelector('.container');
let lastScrollPosition = 0;
let isOutroActive = false;

function handleScroll() {
	const currentScroll = window.pageYOffset;
	const pageHeight = document.documentElement.scrollHeight;
	const scrollDirection = currentScroll > lastScrollPosition ? 'down' : 'up';

	// Показать аутро при скролле вниз
	if (!isOutroActive && currentScroll + window.innerHeight >= pageHeight * 0.95) {
			isOutroActive = true;
			gsap.to(mainContainer, {
					opacity: 0,
					duration: 1.5,
					ease: "power2.inOut",
					onComplete: () => {
							mainContainer.style.display = 'none';
							outroOverlay.classList.add('active');
					}
			});
	}

	// Вернуть контент при скролле вверх
	if (isOutroActive && scrollDirection === 'up' && currentScroll < pageHeight * 0.8) {
			isOutroActive = false;
			mainContainer.style.display = 'block';
			outroOverlay.classList.remove('active');
			
			gsap.to(mainContainer, {
					opacity: 1,
					duration: 1.5,
					ease: "power2.inOut"
			});
	}

	lastScrollPosition = currentScroll;
}

// Удаляем старый обработчик и добавляем новый
window.removeEventListener('scroll', checkScroll);
window.addEventListener('scroll', handleScroll, { passive: true });

// Сбрасываем скролл при загрузке
window.onload = function() {
	window.scrollTo(0, 0);
};

if (history.scrollRestoration) {
	history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', function() {
	window.scrollTo(0, 0);
});