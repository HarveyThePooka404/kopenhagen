const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})

fetch("https://owldesign.dk/wordpress/wp-json/wp/v2/art_exhibition")
    .then(res => res.json())
    .then(handleData)

function handleData(posts) {
    console.log(posts);
    posts.forEach(showPost)

}

function showPost(post) {
    console.log(post)
    const template = document.querySelector("template").content;

    const copy = template.cloneNode(true);

    copy.querySelector(".id").textContent = post.id;

    copy.querySelector(".post_img").src = post.thumbnail.guid;

    copy.querySelector(".title").textContent = post.name_exhibition;

    copy.querySelector(".artist").textContent = post.name_artist;

    copy.querySelector(".start_date").textContent = post.starting_date;

    copy.querySelector(".end_date").textContent = post.ending_date;

    copy.querySelector(".exhibition_place").textContent = post.exhibition_place;

    document.querySelector("main").appendChild(copy);
}
