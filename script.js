document.addEventListener('DOMContentLoaded', function() {
  loadReviews();
});

function addReview() {
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

  var deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.innerHTML = 'Удалить';
  deleteButton.onclick = function() {
    deleteReview(reviewDiv);
  };

  reviewDiv.appendChild(reviewContent);
  reviewDiv.appendChild(deleteButton);
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

    var deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = 'Удалить';
    deleteButton.onclick = function() {
      deleteReview(reviewDiv);
    };

    reviewDiv.appendChild(reviewContent);
    reviewDiv.appendChild(deleteButton);
    reviewContainer.appendChild(reviewDiv);
  });
}

function deleteReview(reviewDiv) {
  var reviewContainer = document.getElementById('reviewsContainer');
  reviewContainer.removeChild(reviewDiv);

  // Обновляем localStorage после удаления отзыва
  updateLocalStorage();
}

function updateLocalStorage() {
  var reviews = [];
  var reviewDivs = document.querySelectorAll('.review');

  reviewDivs.forEach(function(reviewDiv) {
    var name = reviewDiv.querySelector('strong').textContent;
    var message = reviewDiv.querySelector('p').textContent.replace(name + ': ', '');
    reviews.push({ name: name, message: message });
  });

  localStorage.setItem('reviews', JSON.stringify(reviews));
}
