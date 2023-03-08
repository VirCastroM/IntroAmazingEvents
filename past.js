let template = ""

function painDOM(data) {

  const pastCards = document.getElementById("cards");
  let pastEvents = []

  for (let i = 0; i < data.events.length; i++) {
    if (data.events[i].date < data.currentDate) {
      pastEvents.push(data.events[i])
    }
  }
  for (const event of pastEvents) {
    template += `
      <div class="card" style="width: 18rem;">
       <img src="${event.image}" class="card-img-top" style="height: 46%;" alt="${event.name}">
       <div class="card-body">
         <h5 class="text-center">${event.name}</h5>
         <p class="card-text text-center">${event.description}</p>
         <div class="d-flex justify-content-between">
          <p>price: $${event.price}</p>
           <a href="./details.html" class="btn btn-danger">See more</a>
         </div>
       </div>
     </div>
      `
  } pastCards.innerHTML = template;

}
painDOM(data);

console.log(template);