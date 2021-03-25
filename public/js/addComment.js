const addCommentFormHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const post_id = event.target.getAttribute('data-id');
        const comment = document.querySelector('#new-comment').value.trim();

        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/blogPost/${post_id}`);
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.newComment-form')
    .addEventListener('submit', addCommentFormHandler);