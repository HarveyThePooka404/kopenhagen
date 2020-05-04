const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})


// fecth corrected for homepage
fetch("https://owldesign.dk/wordpress/wp-json/wp/v2/art_exhibition?per_page=3&orderby=date")
    .then(res => res.json())
    .then(handleData)

function handleData(posts) {
    console.log(posts);
    posts.forEach(showPost)

}

const template = document.querySelector(".template_exh").content;

const wpLink = 'http://owldesign.dk/wordpress/wp-json/wp/v2/art_exhibition';


function search(value) {

    //remove search from previous entries
    document.querySelector(".search-wrapper").innerHTML = '';
    console.log(value);

    fetch(wpLink + `?search=${value}`)
        .then(f => f.json())
        .then((searchedData) => {
            searchedData.forEach(showPostSearch);
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

    document.querySelector(".search-wrapper").appendChild(copy);

}

function showPost(post){

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

// starting same for artists

fetch("https://owldesign.dk/wordpress/wp-json/wp/v2/artist?per_page=3&orderby=date")
    .then(res => res.json())
    .then(handleData3)

function handleData3(artists) {
    console.log(artists);
    artists.forEach(showArtist)

}

function showArtist(artist) {
    console.log(artist);
    const template = document.querySelector(".template_artist").content;

    const copy_artist = template.cloneNode(true);

    copy_artist.querySelector(".id").textContent = artist.id;

    copy_artist.querySelector(".artist_img").src = artist.thumbnail_artist.guid;

    copy_artist.querySelector(".name_artist").textContent = artist.name_artist;

    copy_artist.querySelector(".website_artist").textContent = artist.website_artist;

    copy_artist.querySelector(".website_artist").href = artist.website_artist;

    document.querySelector(".cartridge_wrapper.artist").appendChild(copy_artist);
}

// Starting on the calendar page:


// Set date to today on loading screen
//then => loads exhibitions
window.addEventListener('DOMContentLoaded', (event) => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    input.setAttribute("value", today);

    //then?

    //make search empty
    document.getElementById("searchbox").value = "";
});

// Changing date

const dateStart = document.querySelector(".submit");
const input = document.querySelector("input");
dateStart.addEventListener("click", () => {
    console.log(input.value);

    fetch("https://owldesign.dk/wordpress/wp-json/wp/v2/art_exhibition?per_page=10")
        .then(res => res.json())
        .then(orderExhs)

    function orderExhs(exhs) {
        document.querySelector(".cartridge_wrapper.art").innerHTML = "";
        exhs.forEach(orderExh);

    }

    function orderExh(exh) {
        if (exh.ending_date > input.value && exh.starting_date < input.value) {

            const template = document.querySelector(".template_exh").content;
            const copy = template.cloneNode(true);

            copy.querySelector(".id").textContent = exh.id;

            copy.querySelector(".post_img").src = exh.thumbnail.guid;

            copy.querySelector(".title").textContent = exh.name_exhibition;

            copy.querySelector(".artist").textContent = exh.name_artist;

            copy.querySelector(".start_date").textContent = exh.starting_date;

            copy.querySelector(".end_date").textContent = exh.ending_date;

            copy.querySelector(".exhibition_place").textContent = exh.exhibition_place;

            document.querySelector(".cartridge_wrapper.art").appendChild(copy);
        }
    }


})
