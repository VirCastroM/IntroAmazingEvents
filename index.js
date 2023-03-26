let newEvents = []

const obtenerEventos = async () => {
  try {
    const respuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
    let apiObjetos = await respuesta.json()
    newEvents = apiObjetos.events
    painCards(newEvents)
    painChecksbox(newEvents)
    filtroCruzado(newEvents)
    input.addEventListener('input', ()=>painCards(filtrarPorCategoria(filtarTextoIngresado(newEvents, input.value))))
    checks.addEventListener('change', ()=> painCards(filtrarPorCategoria(filtarTextoIngresado(newEvents, input.value))))
    console.log(newEvents);
  }
  catch (error) {
  }
}

obtenerEventos()

const input = document.getElementById("buscador");
const allCards = document.getElementById("tarjetas");
const checks = document.getElementById("categorias");

input.addEventListener('input', filtroCruzado)
checks.addEventListener('change', filtroCruzado)

function filtroCruzado() {
  let dataFilter = filtarTextoIngresado(newEvents, input.value)
  let cardsFilter = filtrarPorCategoria(dataFilter)
  painCards(cardsFilter)
}

function filtarTextoIngresado(events, texto) {
  let dataFilter = events.filter(event => event.name.toLowerCase().includes(texto.toLowerCase()))
  return dataFilter
}

function filtrarPorCategoria(newEvents) {
  let checkboxes = document.querySelectorAll("input[type='checkbox']")
  let arrayChecks = Array.from(checkboxes)
  let checksChecked = arrayChecks.filter(check => check.checked)
  if (checksChecked.length == 0) {
    return newEvents
  }
  let checkValues = checksChecked.map(check => check.value)
  let eventsFilter = newEvents.filter(event => checkValues.includes(event.category))
  return eventsFilter
}

function painChecksbox(newEvents) {
  let checkbox = ''
  let categoriesFilter = []
  let allCategories = newEvents.map(event => event.category)

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

function painCards(newEvents) {
  if (newEvents.length == 0) {
    allCards.innerHTML = "<h5 class='text-danger'>No result for your search!</h5>"
    return
  }
  let template = ''
  newEvents.forEach(event => {
    template += `
      <div class="card" style="width: 18rem;">
       <img src="${event.image}"class="card-img-top" style="height: 46%;" alt="${event.name}">
       <div class="card-body">
         <h5 class="text-center">${event.name}</h5>
         <p class="card-text text-center">${event.description}</p>
         <div class="d-flex justify-content-between">
          <p>Price: $${event.price}</p>
           <a href="./details.html?_id=${event._id}" class="btn btn-danger">See more</a>
         </div>
       </div>
     </div>`
  })
  allCards.innerHTML = template;
}