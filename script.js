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

  reviewDiv.appendChild(reviewContent);
  reviewContainer.appendChild(reviewDiv);

  // Очистка полей формы
  document.getElementById('name').value = '';
  document.getElementById('message').value = '';
}
