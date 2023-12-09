document.addEventListener('DOMContentLoaded', function() {
  loadReviews();
});

function addReview(event) {
  event.preventDefault();

  var name = document.getElementById('name').value;
  var message = document.getElementById('message').value;

  if (name.trim() === '' || message.trim() === '') {
    alert('Заполните все поля формы.');
    return;
  }

  var reviewContainer = document.getElementById('reviewsContainer');

  var reviewDiv = document.createElement('div');
  reviewDiv.className = 'review';

  var reviewContent = document.createElement('p');
  reviewContent.innerHTML = '<strong>' + name + ':</strong> ' + message;

  reviewDiv.appendChild(reviewContent);
  reviewContainer.appendChild(reviewDiv);

  document.getElementById('name').value = '';
  document.getElementById('message').value = '';

  saveReview(name, message);
}

function saveReview(name, message) {
  var reviews = getReviewsFromStorage();
  reviews.push({ name: name, message: message });
  localStorage.setItem('reviews', JSON.stringify(reviews));
}

function getReviewsFromStorage() {
  var reviews = localStorage.getItem('reviews');
  return reviews ? JSON.parse(reviews) : [];
}

function loadReviews() {
  var reviews = getReviewsFromStorage();
  var reviewContainer = document.getElementById('reviewsContainer');

  reviews.forEach(function(review) {
    var reviewDiv = document.createElement('div');
    reviewDiv.className = 'review';

    var reviewContent = document.createElement('p');
    reviewContent.innerHTML = '<strong>' + review.name + ':</strong> ' + review.message;

    reviewDiv.appendChild(reviewContent);
    reviewContainer.appendChild(reviewDiv);
  });
}
