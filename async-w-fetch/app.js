const form = document.querySelector('#search-form');
const searchField = document.querySelector('#search-keyword');
const responseContainer = document.querySelector('#response-container');
const loading = document.querySelector(".loading"); // loading animation
let searchedForText;


form.addEventListener('submit', async function (e) {
    e.preventDefault(); // preventing the form from submition
    searchedForText = searchField.value; // get the value from the input text
    loading.style.display = "flex";

    responseContainer.innerHTML = ''; // clearing the the previus content

    // unsblash api
    await fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
        {
            headers: {
                'Authorization': 'Client-ID Nu6DTZppNFjeJrIz5WJSBVzYL_dJrb-BdJypxcY1NpQ'
            }
        }).then((res) => res.json()).then(addImage).catch((e) => console.log(e));

    // new yourk times api
    await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=8PFygPekIJlOBTDaZyX85Iu0buakLGV6`).then((res) => res.json()).then(addArticle).catch((e) => console.log(e));

});

// adding image from unsblash after the api response
function addImage(imgs) {

    if (imgs.results.length > 0) {
        let firstImage = imgs.results[0];
        let fig = `
            <img src="${firstImage.urls.regular}" alt="">
                <figcaption>${searchedForText} by ${firstImage.user.first_name} ${firstImage.user.last_name}</figcaption>`;

        let img = document.createElement('figure');
        img.innerHTML = fig;
        responseContainer.insertAdjacentElement("afterbegin", img);
    } else {
        let div = document.createElement("div");
        div.classList.add("error-no-image");
        responseContainer.insertAdjacentElement("afterbegin", div);
    }
    loading.style.display = "none";
}

// adding articles to ui after api response
function addArticle(artcls) {
    let list = document.createElement("ul");
    if (artcls.response.docs.length > 0) {
        artcls.response.docs.map(article => {
            let li = document.createElement("li");
            li.innerHTML = `
                        <div class="article">
                            <h2><a href="${article.web_url}" target = "_blank">${article.headline.main}</a></h2>
                            <p>
                                ${article.abstract.split(";")[0]}
                            </p>
                        </div>`;

            list.appendChild(li);
        });
        responseContainer.appendChild(list);
    } else {
        let div = document.createElement("div");
        div.classList.add("error-no-articles");
        responseContainer.appendChild(div);
    }
    loading.style.display = "none";
}

