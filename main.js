let breakingImg = document.querySelector("#breakingImg");
let breakingNews_title = document.querySelector("#breakingNews .title");
let breakingNews_description = document.querySelector(
  "#breakingNews .description"
);
let topNews = document.querySelector(".topNews");
let sportsNews = document.querySelector("#sportsNews .newsBox");
let businessNews = document.querySelector("#businessNews .newsBox");
let technologyNews = document.querySelector("#techNews .newsBox");
let header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

const apiKey = "3bca7f3084a9431cb70c02edff239379";

const fetchData = async (category, pageSize) => {
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`;

  try {
    const data = await fetch(url);
    const response = await data.json();
    return response.articles;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const add_breakingNews = (data) => {
  if (data && data.length > 0) {
    breakingImg.innerHTML = `<img src=${data[0].urlToImage} alt="image">`;
    breakingNews_title.innerHTML = `<a href=${data[0].url} target="_blank"><h2>${data[0].title}</h2></a>`;
    breakingNews_description.innerHTML = data[0].description;
  }
};
fetchData("general", 5).then(add_breakingNews);

const addNews = (data, element) => {
  let html = "";
  data.forEach((article) => {
    let title = "";
    if (article.title.length < 100) {
      title = article.title;
    } else {
      title = article.title.slice(0, 100) + "...";
    }

    const imageUrl = article.urlToImage || "https://via.placeholder.com/150";

    const isTopNews = element === topNews;
    const cardClass = isTopNews ? "news" : "newsCard";
    const imgClass = "img";
    const textClass = "text";

    html += `
        <div class="${cardClass}">
            <div class="${imgClass}">
                <img src="${imageUrl}" alt="image">
            </div>
            <div class="${textClass}">
                <div class="title">
                    <a href="${article.url}" target="_blank"><p>${title}</p></a>
                </div>
            </div>
        </div>`;
  });
  element.innerHTML = html;
};

fetchData("general", 20).then((data) => addNews(data, topNews));
fetchData("sports", 5).then((data) => addNews(data, sportsNews));
fetchData("business", 5).then((data) => addNews(data, businessNews));
fetchData("technology", 5).then((data) => addNews(data, technologyNews));
