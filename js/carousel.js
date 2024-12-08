const carousel = document.querySelector('.posts__list');
const leftButton = document.querySelector('.carousel__button--left');
const rightButton = document.querySelector('.carousel__button--right');

const items = document.querySelectorAll('.posts_list__item');
let itemWidth = 0;
let visibleItems = 0;
const totalItems = items.length - 1;

let offset = 0;

// Рассчитать количество видимых элементов на основе ширины экрана
function calculateVisibleItems() {
	const containerWidth = carousel.parentElement.offsetWidth;

	if (containerWidth <= 375) {
		visibleItems = 1; // По 1 элементу
	} else if (containerWidth <= 580) {
		visibleItems = 2; // По 2 элемента
	} else if (containerWidth <= 845) {
		visibleItems = 3; // По 3 элемента
	} else {
		visibleItems = 4; // По умолчанию - 4 элемента
	}

	itemWidth = containerWidth / visibleItems; // Ширина каждого элемента
	return visibleItems;
}

// Обновить стили элементов
function updateStyles() {
	items.forEach(item => {
		item.style.flex = `0 0 ${itemWidth - 18}px`; // Учитываем gap
		item.style.maxWidth = `${itemWidth - 18}px`;
	});
	updateButtons();
}

// Обновить состояние кнопок
function updateButtons() {
	const maxOffset = -(itemWidth * (totalItems - visibleItems));
	leftButton.disabled = offset === 0;
	rightButton.disabled = offset <= maxOffset;
}

// Переместить карусель
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

// Пересчитать при изменении размера окна
function handleResize() {
	visibleItems = calculateVisibleItems();
	offset = 0; // Сброс позиции
	updateStyles();
	carousel.style.transform = 'translateX(0px)';
}

// Добавить слушатели событий
leftButton.addEventListener('click', () => moveCarousel('left'));
rightButton.addEventListener('click', () => moveCarousel('right'));
window.addEventListener('resize', handleResize);

// Инициализация
handleResize();
updateButtons();
