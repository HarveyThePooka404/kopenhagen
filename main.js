const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})

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

    fetch("https://owldesign.dk/wordpress/wp-json/wp/v2/art_exhibition?per_page=3&orderby=date")
        .then(res => res.json())
        .then(handleData)

    function handleData(posts) {
        posts.forEach(showPost)

    }

    function showPost(post) {
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
