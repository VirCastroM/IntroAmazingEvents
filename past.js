let events = []
for (let i = 0; i < data.events.length; i++) {
  events.push(data.events[i])
}

let pastEvents = events.filter(event => (event.date < data.currentDate))
console.log(pastEvents);

const checks = document.getElementById("categorias");
const pastCards = document.getElementById("cards");
const input = document.getElementById("buscador");

input.addEventListener('input', filtroCruzado)
checks.addEventListener('change', filtroCruzado)

function filtroCruzado() {
  let dataFilter = filtarTextoIngresado(pastEvents, input.value)
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


function painCards(pastEvents) {
  if (pastEvents.length == 0) {
    pastCards.innerHTML = "<h5 class='text-danger'>No result for your search!</h5>"
    return
  }
  let template = ""
  pastEvents.forEach(event => {
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
  pastCards.innerHTML = template;
}

function filtarTextoIngresado(pastEvents, texto) {
  let dataFilter = pastEvents.filter(event => event.name.toLowerCase().includes(texto.toLowerCase()))
  return dataFilter
}

function filtrarPorCategoria(pastEvents) {
  let checkboxes = document.querySelectorAll("input[type='checkbox']")
  let arrayChecks = Array.from(checkboxes)
  let checksChecked = arrayChecks.filter(check => check.checked)
  if (checksChecked.length == 0) {
    return pastEvents
  }
  let checkValues = checksChecked.map(check => check.value)
  let eventsFilter = pastEvents.filter(event => checkValues.includes(event.category))
  return eventsFilter
}

painCards(pastEvents);
painChecksbox(events);





// let template = ""
// let checkbox = ""

// let categories = []


// let categoriesfilter = []

// for (let i = 0; i < data.events.length; i++) {
//   categories.push(data.events[i].category)
// }

// function painDOM(data) {

//   const checks = document.getElementById("categorias");

//   categoriesfilter = categories.filter((categoria, index) => {
//     return categories.indexOf(categoria) === index;
//   })

//   categoriesfilter.sort((a,b)=>{
//     if(a>b){
//       return 1
//     }
//     if(a<b){
//       return -1
//     }
//     return 0
//     })

//   categoriesfilter.forEach(category => {
//     category

//     checkbox += `
//      <div class="form-check form-check-inline">
//        <input class="form-check-input border border-danger" type="checkbox" id="categorias" value="${category}">
//       <label class="form-check-label" style="color: crimson;" for="${category}">${category}</label>
//      </div> `

//   })
//   checks.innerHTML = checkbox;

  
//   const pastCards = document.getElementById("cards");
//   let pastEvents = []

//   for (let i = 0; i < data.events.length; i++) {
//     if (data.events[i].date < data.currentDate) {
//       pastEvents.push(data.events[i])
//     }
//   }
//   for (const event of pastEvents) {
//     template += `
//       <div class="card" style="width: 18rem;">
//        <img src="${event.image}" class="card-img-top" style="height: 46%;" alt="${event.name}">
//        <div class="card-body">
//          <h5 class="text-center">${event.name}</h5>
//          <p class="card-text text-center">${event.description}</p>
//          <div class="d-flex justify-content-between">
//           <p>price: $${event.price}</p>
//            <a href="./details.html" class="btn btn-danger">See more</a>
//          </div>
//        </div>
//      </div>
//       `
//   } pastCards.innerHTML = template;

// }
// painDOM(data);

// console.log(template);