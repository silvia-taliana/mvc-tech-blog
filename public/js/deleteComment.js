const deleteComment = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        console.log(id);
        // Make a POST request to destroy the comment on the back end
        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE',
        });
        console.log(response);
        if (response.ok) {
            // If successfully deleted, redirect to the homepage
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#deleteComment').addEventListener('click', deleteComment);