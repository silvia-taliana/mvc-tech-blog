const updatePostFormHandler = async (event) => {
    event.preventDefault();
    console.log(event);

    const title = document.querySelector('#update-title').value.trim();
    const post = document.querySelector('#update-post').value.trim();
    // const user_id = req.session.user_id;
    console.log(title);
    console.log(post);
    // console.log(user_id);

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
    .querySelector('#editPost')
    .addEventListener('click', updatePostFormHandler);