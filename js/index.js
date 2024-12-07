const answers = document.querySelectorAll('.poll_answer');

answers.forEach(answer => {
	const input = answer.querySelector('input');
	input.addEventListener('change', () => {
		answers.forEach(a => a.classList.remove('active'));
		if (input.checked) {
			answer.classList.add('active');
		}
	});
});
