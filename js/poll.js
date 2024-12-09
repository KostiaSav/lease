const menu = document.querySelector('.poll_menu');
const indicator = document.querySelector('.indicator');
const items = document.querySelectorAll('.menu-item');

// Функция обновления индикатора
function updateIndicator(index) {
	const isMobile = window.innerWidth <= 768;

	if (isMobile) {
		// Горизонтальное поведение для мобильных
		const itemWidth = items[index].offsetWidth;
		indicator.style.width = `${itemWidth}px`;
		indicator.style.left = `${items[index].offsetLeft}px`;
	} else {
		// Вертикальное поведение для ПК
		indicator.style.width = '4px';
		indicator.style.height = '42px';
		indicator.style.top = `${index * 42}px`;
		indicator.style.left = '0';
	}
}

// Инициализация
items.forEach((item, index) => {
	item.addEventListener('click', () => {
		items.forEach(i => i.classList.remove('active'));
		item.classList.add('active');
		updateIndicator(index);
	});
});

// Обновление индикатора при изменении размера окна
window.addEventListener('resize', () => {
	const activeIndex = Array.from(items).findIndex(item =>
		item.classList.contains('active')
	);
	if (activeIndex !== -1) {
		updateIndicator(activeIndex);
	}
});

// Устанавливаем индикатор для активного элемента при загрузке
const activeIndex = Array.from(items).findIndex(item =>
	item.classList.contains('active')
);
if (activeIndex !== -1) {
	updateIndicator(activeIndex);
}
