document.addEventListener('DOMContentLoaded', () => {
	const triggerButtons = document.querySelectorAll('.trigger-btn');
	const closeButtons = document.querySelectorAll('.close-btn');
	const modals = document.querySelectorAll('.modal');

	// Функция для закрытия всех модальных окон
	function closeAllModals() {
		modals.forEach(modal => {
			modal.classList.remove('active');
			const overlay = modal.querySelector('.modal-overlay'); // Находим затемнение
			overlay.classList.remove('active');
		});
	}

	// Открытие модального окна
	triggerButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			closeAllModals(); // Закрыть другие окна
			const targetId = btn.getAttribute('data-target');
			const modal = document.getElementById(targetId);
			modal.classList.add('active'); // Открываем нужное окно
			const overlay = modal.querySelector('.modal-overlay'); // Затемнение внутри текущего окна
			overlay.classList.add('active'); // Показываем затемнение
		});
	});

	// Закрытие окна по кнопке "x"
	closeButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			const modal = btn.closest('.modal'); // Ищем ближайшее модальное окно
			modal.classList.remove('active'); // Закрываем это окно
			const overlay = modal.querySelector('.modal-overlay');
			overlay.classList.remove('active'); // Убираем затемнение
		});
	});

	// Закрытие окна при клике на затемнение
	modals.forEach(modal => {
		const overlay = modal.querySelector('.modal-overlay'); // Затемнение для текущего окна
		overlay.addEventListener('click', () => {
			modal.classList.remove('active'); // Закрываем текущее окно
			overlay.classList.remove('active'); // Убираем затемнение
		});
	});

	// Закрытие окна при нажатии клавиши Esc
	window.addEventListener('keydown', e => {
		if (e.key === 'Escape') {
			closeAllModals(); // Закрываем все окна
		}
	});
});
