let events = []
for (let i = 0; i < data.events.length; i++) {
  events.push(data.events[i])
}

let upcomingEvents = events.filter(event => (event.date > data.currentDate))
console.log(upcomingEvents);

const checks = document.getElementById("categorias");
const upcomingCards = document.getElementById("cards");
const input = document.getElementById("buscador");

input.addEventListener('input', filtroCruzado)
checks.addEventListener('change', filtroCruzado)

function filtroCruzado() {
  let dataFilter = filtarTextoIngresado(upcomingEvents, input.value)
  let cardsFilter = filtrarPorCategoria(dataFilter)
  painCards(cardsFilter)
}

function painChecksbox(events) {
  let checkbox = ""
  let allCategories = events.map(event => event.category)
  let categoriesFilter = []

  categoriesFilter = allCategories.filter((categoria, index) => {
    return allCategories.indexOf(categoria) === index;
  })
  categoriesFilter.sort((a, b) => {
    if (a > b) {
      return 1
    }
    if (a < b) {
      return -1
    }
    return 0
  })
  categoriesFilter.forEach(category => {
    checkbox += `
     <div class="form-check form-check-inline">
       <input class="form-check-input border border-danger" type="checkbox" id="${category}" value="${category}">
      <label class="form-check-label" style="color: crimson;" for="${category}">${category}</label>
     </div> `
  })
  console.log(categoriesFilter);
  checks.innerHTML = checkbox;
}


function painCards(upcomingEvents) {
  if (upcomingEvents.length == 0) {
    upcomingCards.innerHTML = "<h5 class='text-danger'>No result for your search!</h5>"
    return
  }
  let template = ""
  upcomingEvents.forEach(event => {
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
  })
  upcomingCards.innerHTML = template;
}

function filtarTextoIngresado(upcomingEvents, texto) {
  let dataFilter = upcomingEvents.filter(event => event.name.toLowerCase().includes(texto.toLowerCase()))
  return dataFilter
}

function filtrarPorCategoria(upcomingEvents) {
  let checkboxes = document.querySelectorAll("input[type='checkbox']")
  let arrayChecks = Array.from(checkboxes)
  let checksChecked = arrayChecks.filter(check => check.checked)
  if (checksChecked.length == 0) {
    return upcomingEvents
  }
  let checkValues = checksChecked.map(check => check.value)
  let eventsFilter = upcomingEvents.filter(event => checkValues.includes(event.category))
  return eventsFilter
}


painCards(upcomingEvents);
painChecksbox(events);