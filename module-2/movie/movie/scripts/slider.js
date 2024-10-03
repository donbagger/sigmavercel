let currentIndex = 0;
const items = document.querySelectorAll('.item');
const totalItems = items.length;
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

function updateSliderPosition() {
  const sliderInner = document.querySelector('.slider-inner');
  const translateX = -currentIndex * 100; // Move slider by 100% for each item
  sliderInner.style.transform = `translateX(${translateX}%)`;
}

// Move to the next slide
nextButton.addEventListener('click', () => {
  if (currentIndex < totalItems - 1) {
    currentIndex++;
  } else {
    currentIndex = 0; // Loop back to the first item
  }
  updateSliderPosition();
});

// Move to the previous slide
prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = totalItems - 1; // Loop back to the last item
  }
  updateSliderPosition();
});
