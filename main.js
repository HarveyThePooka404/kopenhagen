const wpLink = 'http://owldesign.dk/wordpress/wp-json/wp/v2/art_exhibition';
const template = document.querySelector("template").content;


function search(value) {

    //remove search from previous entries
    document.querySelector(".search-wrapper").innerHTML = '';

    fetch(wpLink + `?search=${value}`)
        .then(f => f.json())
        .then((searchedData) => {
            searchedData.forEach(showPost);
        });

    if (value.length > 3) {
        document.querySelector("main").style.display = "none";
        document.querySelector(".search-section").style.display = "block";
    } else if (value.length <= 3) {
        document.querySelector("main").style.display = "block";
        document.querySelector(".search-section").style.display = "none";
    }

}

function showPostSearch(post) {

    const copy = template.cloneNode(true);

    copy.querySelector(".id").textContent = post.id;

    copy.querySelector(".post_img").src = post.thumbnail.guid;

    copy.querySelector(".title").textContent = post.name_exhibition;

    copy.querySelector(".artist").textContent = post.name_artist;

    copy.querySelector(".start_date").textContent = post.starting_date;

    copy.querySelector(".end_date").textContent = post.ending_date;

    copy.querySelector(".exhibition_place").textContent = post.exhibition_place;
    console.log(copy);
    document.querySelector(".search-wrapper").appendChild(copy);
}
