const menu = document.querySelector('.menu');
const indicator = document.querySelector('.indicator');
const items = document.querySelectorAll('.menu-item');

items.forEach((item, index) => {
	item.addEventListener('click', () => {
		items.forEach(i => i.classList.remove('active'));
		item.classList.add('active');
		indicator.style.top = `${index * 42}px`;
	});
});
