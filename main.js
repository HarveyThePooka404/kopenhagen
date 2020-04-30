fetch("https://owldesign.dk/wordpress/wp-json/wp/v2/art_exhibition?per_page=3&orderby=date")
    .then(res => res.json())
    .then(handleData)

function handleData(posts) {
    console.log(posts);
    posts.forEach(showPost)

}

function showPost(post) {
    console.log(post)
    const template = document.querySelector(".template_exh").content;

    const copy = template.cloneNode(true);

    copy.querySelector(".id").textContent = post.id;

    copy.querySelector(".post_img").src = post.thumbnail.guid;

    copy.querySelector(".title").textContent = post.name_exhibition;

    copy.querySelector(".artist").textContent = post.name_artist;

    copy.querySelector(".start_date").textContent = post.starting_date;

    copy.querySelector(".end_date").textContent = post.ending_date;

    copy.querySelector(".exhibition_place").textContent = post.exhibition_place;

    document.querySelector(".cartridge_wrapper.art").appendChild(copy);
}

// starting same for art spaces

fetch("https://owldesign.dk/wordpress/wp-json/wp/v2/art_space?per_page=3&orderby=date")
    .then(res => res.json())
    .then(handleData2)

function handleData2(spaces) {
    console.log(spaces);
    spaces.forEach(showSpace)

}

function showSpace(space) {
    console.log(space);
    const template = document.querySelector(".template_space").content;

    const copy_space = template.cloneNode(true);

    copy_space.querySelector(".id").textContent = space.id;

    copy_space.querySelector(".space_img").src = space.thumbnail_art_space.guid;

    copy_space.querySelector(".name_space").textContent = space.name_art_space;

    copy_space.querySelector(".address_space").textContent = space.address_art_space;

    copy_space.querySelector(".website_space").textContent = space.website_art_space;
    copy_space.querySelector(".website_space").href = space.website_art_space;

    document.querySelector(".cartridge_wrapper.space").appendChild(copy_space);
}
