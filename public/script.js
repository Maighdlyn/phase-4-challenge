const deleteReview = (deleteButton) => {
  const confirmDelete = confirm('Are you sure you want to delete this review?')
  if (confirmDelete) {
    const reviewId = deleteButton.target.getAttribute('data-review-id')
    fetch(`/deletereview/${reviewId}`, {method: 'delete', credentials: 'include'})
      .then(location.reload())
      .catch((error) => {
        console.error(error)
      })
  }
}

document.querySelectorAll('.delete').forEach((deleteButton) => {
  deleteButton.addEventListener('click', deleteReview)
})
