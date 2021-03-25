const deleteComment = async (event) => {
    if (event.target.hasAttributes()) {
        const id = event.target.getAttribute('data-id');
        const post_id = event.target.getAttribute('key');
        console.log(id);
        console.log(post_id);
        // Make a POST request to destroy the comment on the back end
        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE',
        });
        console.log(response);
        if (response.ok) {
            // If successfully deleted, redirect 
            document.location.replace(`/blogPost/${post_id}`);
        } else {
            alert("Sorry, you can only delete your own comments");
        }
    }
};

document.querySelector('#deleteComment').addEventListener('click', deleteComment);