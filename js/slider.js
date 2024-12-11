document.addEventListener('DOMContentLoaded', () => {
	const slider = document.querySelector('.calculator_slider__input');

	// Функция обновления фона
	function updateSliderBackground() {
		const value = slider.value;
		const min = slider.min || 0;
		const max = slider.max || 100;

		// Расчет процента заполненности
		const percentage = ((value - min) / (max - min)) * 100;

		// Обновляем фон
		slider.style.background = `linear-gradient(to right,  #007DFC ${percentage}%, #DAE1E9 ${percentage}%)`;
	}

	// Обновляем фон при загрузке страницы
	updateSliderBackground();

	// Обновляем фон при изменении значения
	slider.addEventListener('input', updateSliderBackground);
});
