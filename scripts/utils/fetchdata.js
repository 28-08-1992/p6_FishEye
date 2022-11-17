export default async function getPhotographers() {
   
  return fetch("data/photographers.json")
      .then(data => data.json())
}

  




