let template = ""

function painDOM(data) {

  const allCards = document.getElementById("cards");

  for (let i = 0; i < data.events.length; i++) {

    template += `
      <div class="card" style="width: 18rem;">
       <img src="${data.events[i].image}" class="card-img-top" style="height: 46%;" alt="${data.events[i].name}">
       <div class="card-body">
         <h5 class="text-center">${data.events[i].name}</h5>
         <p class="card-text text-center">${data.events[i].description}</p>
         <div class="d-flex justify-content-between">
          <p>price: $${data.events[i].price}</p>
           <a href="./details.html" class="btn btn-danger">See more</a>
         </div>
       </div>
     </div>
      `
  } allCards.innerHTML = template;

}
painDOM(data);

console.log(template);