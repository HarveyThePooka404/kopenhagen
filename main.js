const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})

const wpLink = 'http://owldesign.dk/wordpress/wp-json/wp/v2/art_exhibition';
const template = document.querySelector("template").content;

function search(value) {

//    console.log(value);

    fetch(wpLink + `?search=${value}`)
        .then(f => f.json())
        .then((searchedData) => {

            searchedData.forEach((i) => {
                const copy = template.cloneNode(true);
                copy.querySelector(".title-post").textContent = i.exhibition_place;
                copy.querySelector(".content-post").textContent = i.long_description;

                document.querySelector(".search-wrapper").appendChild(copy);
            })
        });

    if(value.length > 3){
        document.querySelector("main").style.display = "none";
        document.querySelector(".search-wrapper").style.display = "block";
    } else if (value.length <= 3) {
        document.querySelector("main").style.display = "block";
        document.querySelector(".search-wrapper").style.display = "none";
    }


    //remove search from previous entries
    document.querySelector(".search-wrapper").innerHTML='';
}
