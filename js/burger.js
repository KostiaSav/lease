function toggleMenu() {
	const navMenu = document.getElementById('navMenu');
	const burgerMenus = document.querySelectorAll('.burger-menu');

	console.log('Menu active before:', navMenu.classList.contains('active'));

	if (navMenu.classList.contains('active')) {
		navMenu.classList.remove('active');
		burgerMenus.forEach(menu => menu.classList.remove('active'));
	} else {
		navMenu.classList.add('active');
		burgerMenus.forEach(menu => menu.classList.add('active'));
	}

	console.log('Menu active after:', navMenu.classList.contains('active'));
}
