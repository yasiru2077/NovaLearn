import './SingleEvent.css'

export default function EventBlock({ event }) {
    return (
        <div className='post'>

            <img class="postImg" src="http://localhost:5000/images/your-photo.jpg" alt="" />
            <div class="postInfo">
            <div className="postCats">
            <span class="postCat">music</span>
            <span class="postCat">sports</span>
            </div>
                <a href="/post/your-post-id" class="link">
                    <span class="postTitle">{event.title}</span>
                </a>
                <hr />
                <span class="postDate">{new Date(event.createdAt).toDateString()}</span>
            </div>
            <p class="postDesc">{event.description}</p>
        </div>

    )
}
