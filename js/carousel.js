class Carousel {
	constructor(containerSelector) {
		this.carousel = document.querySelector(`${containerSelector} .posts__list`);
		this.leftButton = document.querySelector(
			`${containerSelector} .carousel__button--left`
		);
		this.rightButton = document.querySelector(
			`${containerSelector} .carousel__button--right`
		);
		this.postsTitle = document.querySelector(
			`${containerSelector} .posts__title`
		);
		this.postImage = document.querySelector(
			`${containerSelector} .posts_list__item img`
		);
		this.items = document.querySelectorAll(
			`${containerSelector} .posts_list__item`
		);

		this.itemWidth = 0;
		this.visibleItems = 0;
		this.totalItems = this.items.length;
		this.offset = 0;

		this.startX = 0;
		this.currentX = 0;
		this.isDragging = false;

		this.init();
	}

	init() {
		this.calculateVisibleItems();
		this.updateStyles();
		this.updateButtonPosition();
		this.addEventListeners();
	}

	calculateVisibleItems() {
		const containerWidth = this.carousel.parentElement.offsetWidth;
		if (containerWidth <= 375) {
			this.visibleItems = 1;
		} else if (containerWidth <= 580) {
			this.visibleItems = 2;
		} else if (containerWidth <= 845) {
			this.visibleItems = 3;
		} else {
			this.visibleItems = 4;
		}
		this.itemWidth = containerWidth / this.visibleItems;
	}

	updateStyles() {
		this.items.forEach(item => {
			item.style.flex = `0 0 ${this.itemWidth - 18}px`;
			item.style.maxWidth = `${this.itemWidth - 18}px`;
		});
		this.updateButtons();
	}

	updateButtons() {
		const maxOffset = -(this.itemWidth * (this.totalItems - this.visibleItems));
		this.leftButton.disabled = this.offset === 0;
		this.rightButton.disabled = this.offset <= maxOffset;
	}

	moveCarousel(direction) {
		const maxOffset = -(this.itemWidth * (this.totalItems - this.visibleItems));
		if (direction === 'left') {
			this.offset = Math.min(this.offset + this.itemWidth, 0);
		} else if (direction === 'right') {
			this.offset = Math.max(this.offset - this.itemWidth, maxOffset);
		}
		this.carousel.style.transform = `translateX(${this.offset}px)`;
		this.updateButtons();
	}

	handleResize() {
		this.calculateVisibleItems();
		this.offset = 0;
		this.updateStyles();
		this.carousel.style.transform = 'translateX(0px)';
		this.updateButtonPosition();
	}

	updateButtonPosition() {
		const titleHeight = this.postsTitle.offsetHeight;
		const imageHeight = this.postImage.offsetHeight;
		const buttonTop = titleHeight + imageHeight / 2;
		this.leftButton.style.top = `${buttonTop}px`;
		this.rightButton.style.top = `${buttonTop}px`;
	}

	addTouchEvents() {
		this.carousel.addEventListener('touchstart', e => {
			this.startX = e.touches[0].clientX;
			this.isDragging = true;
			this.carousel.style.transition = 'none';
		});

		this.carousel.addEventListener('touchmove', e => {
			if (!this.isDragging) return;

			this.currentX = e.touches[0].clientX;
			const deltaX = this.currentX - this.startX;
			this.carousel.style.transform = `translateX(${this.offset + deltaX}px)`;
		});

		this.carousel.addEventListener('touchend', () => {
			if (!this.isDragging) return;

			this.isDragging = false;
			const deltaX = this.currentX - this.startX;

			if (deltaX > 50) {
				this.moveCarousel('left');
			} else if (deltaX < -50) {
				this.moveCarousel('right');
			} else {
				this.carousel.style.transform = `translateX(${this.offset}px)`;
			}

			this.carousel.style.transition = 'transform 0.5s ease-in-out';
		});
	}

	addEventListeners() {
		this.leftButton.addEventListener('click', () => this.moveCarousel('left'));
		this.rightButton.addEventListener('click', () =>
			this.moveCarousel('right')
		);
		window.addEventListener('resize', () => this.handleResize());
		this.addTouchEvents();
	}
}

// Initialize the carousel
new Carousel('.posts__block');
