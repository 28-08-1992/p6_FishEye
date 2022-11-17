//Mettre le code JavaScript lié à la page photographer.html

import photographerFactory from "../factories/photographer.js";
import getPhotographers from "../utils/fetchdata.js";
import MediaFactory from "../factories/Media.js";
import LightboxFactory from "../factories/lightBox.js"; 

const lienSite = window.location.search;
const searchParam = new URLSearchParams(lienSite);
const id = parseInt(searchParam.get("id"));


const photographer = await getPhotographers().then(
  (data) =>
    data.photographers.filter((photographer) => {
      return id === photographer.id;
    })[0]
);

const arraymedia = await getPhotographers().then((data) =>
    data.media.filter((media) => {
      return media.photographerId === id;
    })
  );

async function displayProfil(photographer) {
  const photographersSection = document.querySelector(".profil");
  const photographerProfil = photographerFactory(photographer);
  const HeaderDOM = photographerProfil.getHeaderDOM();
  photographersSection.appendChild(HeaderDOM);
}


async function displayMedia(mediaArray) {
  const mediaSection = document.querySelector("#media");
  mediaSection.innerHTML = '';
  mediaArray.forEach((media, index) => {
   // const photographerMedia = MediaFactory(media);
  
    const MediaDom = media.getDOM();
    MediaDom.setAttribute("data-index", index);
    MediaDom.addEventListener("click", (event) => {
      event.preventDefault();
      let i = event.currentTarget.getAttribute("data-index");
      if (event.target.nodeName != "SPAN") {
        lightbox.setIndex(i);
        updateLightbox();
        lightBoxDOM.showModal(); 
        
      } else if (event.target.nodeName == "SPAN") {
      
        if (event.target.getAttribute("class") == "far fa-heart") {
          likeMedia(i);

          event.target.setAttribute("class", "fas fa-heart");
        } else {
          dislikeMedia(i);
          event.target.setAttribute("class", "far fa-heart");
        }
      }
    })
    mediaSection.appendChild(MediaDom);
  });
  eventHeart();
}

// -------------trier le media de photographer via select ---------------
 
let allmedia = mapMedia(arraymedia);

const selectElement = document.querySelector("#select");
selectElement.addEventListener("change", (e) => {
  const value = e.target.value;
 
  allmedia= sortMedia(value, allmedia);
  displayMedia(allmedia);
});

// trie par Populaire _ date _ title

function sortMedia(triePar, mediaArray) {
  switch (triePar) {
    case "popularity":
      mediaArray.sort((a, b) => {
        return b.likes - a.likes;
      });
      break;

    case "date":
      mediaArray.sort(({ date: a }, { date: b }) => {
       return new Date(b) - new Date(a);
  
      });

      break;
    case "title":
      mediaArray.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
      break;

    default:
      break;
  }
  return mediaArray;
}

function displayLikePrice() {
 
  let sumLikes = allmedia.reduce((a, b) => a + b.likes, 0);
  let box = document.getElementById('info-like-price');
  let boxTemplate = `
  <span class ="total-likes">${sumLikes}</span>
  <i class ="fas fa-heart" aria-label='likes'></i>
  <span>${photographer.price} €/ jour</span>
  `;
  box.innerHTML = boxTemplate; 
}
function likeMedia(index) {
  let media = allmedia[index];
  media.likes += 1;
  let allLikesP = document.querySelectorAll(".likes");
  let likesP = allLikesP[index];
  likesP.textContent = media.likes;
  displayLikePrice();
}
function dislikeMedia(index) {
  let media = allmedia[index];
  media.likes -= 1;
  let allLikesP = document.querySelectorAll(".likes");
  let likesP = allLikesP[index];
  likesP.textContent = media.likes;
  displayLikePrice();
}
//---------------------------displayLightbox---------------------

function mapMedia(mediaArray) {
 
  let medias = [];
  mediaArray.forEach((media) => {
   
    const mediaModel = MediaFactory(media);
    medias.push(mediaModel);
  });
  return medias;
}

let lightbox = LightboxFactory(allmedia);
let lightBoxDOM = lightbox.getDOM();

const body = document.querySelector("body");
body.appendChild(lightBoxDOM);

function updateLightbox() {
  const OldmediaContent = document.querySelector(".media-content");
  const newmediaContent = lightbox.getMediaContentDOM();
  const dialogContent = document.querySelector(".dialog-content");
  dialogContent.replaceChild(newmediaContent, OldmediaContent);
}
const prevArrow = document.querySelector('.fa-angle-left');
const nextArrow = document.querySelector('.fa-angle-right');

nextArrow.addEventListener('click', () => {
  lightbox.next();
  updateLightbox();
});

prevArrow.addEventListener('click', () => {
  lightbox.prev();
  updateLightbox();
});
lightBoxDOM.addEventListener('keydown', (e) => {
  if (e.key == 'ArrowRight') {
    lightbox.next();
    updateLightbox();
  } else if (e.key == 'ArrowLeft') {
    lightbox.prev();
    updateLightbox();
  }
})
function eventHeart() {
  const hearts = document.querySelectorAll(".fa-heart");
  hearts.forEach((heart) => {
    heart.addEventListener('keydown', (e) => {
      if (e.key == 'Enter') {
        const index = e.target.parentNode.parentNode.getAttribute("data-index");
        
      
        if (e.target.getAttribute("class") == "far fa-heart") {
          likeMedia(index);

          e.target.setAttribute("class", "fas fa-heart");
        } else {
          dislikeMedia(index);
          e.target.setAttribute("class", "far fa-heart");
        }
      }
    }
    )
  })
}







async function init() {
  // Récupère les datas des photographes by I
document.getElementById('name-Photographer').textContent = photographer.name;
  displayProfil(photographer);
  //allmedia = sortMedia("popularity", arraymedia);
  displayMedia(allmedia);
  displayLikePrice(photographer);
  
}

init();

