const carousel = document.querySelector('.posts__list');
const leftButton = document.querySelector('.carousel__button--left');
const rightButton = document.querySelector('.carousel__button--right');
const items = document.querySelectorAll('.posts_list__item');
let itemWidth = 0;
let visibleItems = 0;
const totalItems = items.length;
let offset = 0;

let startX = 0; // Начальная точка касания
let currentX = 0; // Текущая точка касания
let isDragging = false; // Флаг, активен ли свайп

function calculateVisibleItems() {
	const containerWidth = carousel.parentElement.offsetWidth;
	if (containerWidth <= 375) {
		visibleItems = 1;
	} else if (containerWidth <= 580) {
		visibleItems = 2;
	} else if (containerWidth <= 845) {
		visibleItems = 3;
	} else {
		visibleItems = 4;
	}
	itemWidth = containerWidth / visibleItems;
	return visibleItems;
}
function updateStyles() {
	items.forEach(item => {
		item.style.flex = `0 0 ${itemWidth - 18}px`;
		item.style.maxWidth = `${itemWidth - 18}px`;
	});
	updateButtons();
}
function updateButtons() {
	const maxOffset = -(itemWidth * (totalItems - visibleItems));
	leftButton.disabled = offset === 0;
	rightButton.disabled = offset <= maxOffset;
}
function moveCarousel(direction) {
	if (direction === 'left') {
		offset += itemWidth;
		if (offset > 0) offset = 0;
	} else if (direction === 'right') {
		const maxOffset = -(itemWidth * (totalItems - visibleItems));
		offset -= itemWidth;
		if (offset < maxOffset) offset = maxOffset;
	}
	carousel.style.transform = `translateX(${offset}px)`;
	updateButtons();
}
function handleResize() {
	visibleItems = calculateVisibleItems();
	offset = 0;
	updateStyles();
	carousel.style.transform = 'translateX(0px)';
}
leftButton.addEventListener('click', () => moveCarousel('left'));
rightButton.addEventListener('click', () => moveCarousel('right'));

// Начало касания
carousel.addEventListener('touchstart', e => {
	startX = e.touches[0].clientX;
	isDragging = true;
	carousel.style.transition = 'none'; // Отключаем анимацию
});

// Движение пальца
carousel.addEventListener('touchmove', e => {
	if (!isDragging) return;

	currentX = e.touches[0].clientX;
	const deltaX = currentX - startX; // Разница между начальной и текущей позицией
	carousel.style.transform = `translateX(${offset + deltaX}px)`; // Перемещаем контент
});

// Завершение свайпа
carousel.addEventListener('touchend', () => {
	if (!isDragging) return;

	isDragging = false;
	const deltaX = currentX - startX;

	if (deltaX > 50) {
		moveCarousel('left'); // Свайп вправо
	} else if (deltaX < -50) {
		moveCarousel('right'); // Свайп влево
	} else {
		// Если свайп незначительный, возвращаем карусель в исходное положение
		carousel.style.transform = `translateX(${offset}px)`;
	}

	carousel.style.transition = 'transform 0.5s ease-in-out'; // Включаем анимацию
});

window.addEventListener('resize', handleResize);
handleResize();
updateButtons();
