let events = []
for (let i = 0; i < data.events.length; i++) {
  events.push(data.events[i])
}

const queryString = window.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("_id");

const detalles = events.find(event => event._id == id)

const detailCard = document.getElementById("tarjetas")
detailCard.innerHTML = `
<div class="card" style="width: 30rem;">
<img src="${detalles.image}" class="card-img-top" style="height: 50%;" alt="${detalles.name}">
<div class="card-body">
  <h5 class="text-center m-2 fw-semibold">${detalles.name}</h5>
  <p class="card-text text-center">${detalles.description}</p>
  <p class="card-text text-center m-0">Capacity: ${detalles.capacity}</p>
  <p class="text-center m-0">Place: ${detalles.place}</p>
  <p class="text-center m-0">Date: $${detalles.date}</p>  
  <p class="text-center mt-0">Price: $${detalles.price}</p>  
  <div class="d-flex justify-content-center">  
  <a href="./index.html" class="btn btn-danger">Back to top</a>
  </div>
</div>
</div>
`