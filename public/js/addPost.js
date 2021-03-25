const addPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#new-title').value.trim();
    const post = document.querySelector('#new-post').value.trim();

    if (title && post) {
        const response = await fetch('/api/blogPosts', {
            method: 'POST',
            body: JSON.stringify({ title, post }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.newPost-form')
    .addEventListener('submit', addPostFormHandler);