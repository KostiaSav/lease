function toggleMenu() {
	const navMenu = document.getElementById('navMenu');
	navMenu.classList.toggle('active');

	const bars = document.querySelectorAll('.burger-menu .bar');
	if (navMenu.classList.contains('active')) {
		bars[0].style.transform = 'rotate(45deg)';
		bars[1].style.opacity = '0';
		bars[2].style.transform = 'rotate(-45deg)';
	} else {
		bars[0].style.transform = 'rotate(0)';
		bars[1].style.opacity = '1';
		bars[2].style.transform = 'rotate(0)';
	}
}