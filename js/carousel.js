const carousel = document.querySelector('.posts__list');
const leftButton = document.querySelector('.carousel__button--left');
const rightButton = document.querySelector('.carousel__button--right');

const items = document.querySelectorAll('.posts_list__item');
const itemWidth = items[0].getBoundingClientRect().width + 18; // Ширина элемента + gap
const visibleItems = Math.floor(carousel.parentElement.offsetWidth / itemWidth); // Видимые элементы
const totalItems = items.length - 1;

let offset = 0;

// Функция для обновления кнопок
function updateButtons() {
	leftButton.disabled = offset === 0;
	rightButton.disabled = offset <= -(itemWidth * (totalItems - visibleItems));
}

// Функция перемещения карусели
function moveCarousel(direction) {
	if (direction === 'left') {
		offset += itemWidth;
		if (offset > 0) offset = 0;
	} else if (direction === 'right') {
		offset -= itemWidth;
		const maxOffset = -(itemWidth * (totalItems - visibleItems));
		if (offset < maxOffset) offset = maxOffset;
	}

	carousel.style.transform = `translateX(${offset}px)`;
	updateButtons();
}

// Клики по кнопкам
leftButton.addEventListener('click', () => moveCarousel('left'));
rightButton.addEventListener('click', () => moveCarousel('right'));

// Свайп для мобильных
let startX = 0;
let endX = 0;

carousel.addEventListener('touchstart', event => {
	startX = event.touches[0].clientX;
});

carousel.addEventListener('touchend', event => {
	endX = event.changedTouches[0].clientX;
	if (startX > endX + 50) {
		moveCarousel('right');
	} else if (startX < endX - 50) {
		moveCarousel('left');
	}
});

// Первоначальное обновление кнопок
updateButtons();
