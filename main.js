//not needed
const template = document.querySelector("template").content;


const wpLink = 'http://owldesign.dk/wordpress/wp-json/wp/v2/art_exhibition';

function search(value) {

    console.log(value);

    fetch(wpLink + `?search=${value}`)
        .then(f => f.json())
        .then((searchedData) => {

            searchedData.forEach((i) => {
                const copy = template.cloneNode(true);
                copy.querySelector(".title_post").textContent = i.exhibition_place;
                copy.querySelector(".content_post").textContent = i.long_description;

                document.querySelector(".wrapper").appendChild(copy);
            })
        });

    //remove search from previous entries
    document.querySelector(".wrapper").innerHTML='';
}
