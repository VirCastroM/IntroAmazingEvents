const detailCard = document.getElementById("tarjetas")

const obtenerEventos = async () => {
  try {
    const respuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
    let apiObjetos = await respuesta.json()
    let newEvents = apiObjetos.events
    detalle(newEvents)
    detailCard.innerHTML = ``
  }
  catch (error) {
    console.log(error);
    alert('Error')
  }
}

obtenerEventos()


async function detalle(newEvents) {
  const queryString = window.location.search;

  const params = new URLSearchParams(queryString);

  const id = params.get("_id");
  const detalles = await newEvents.find(event => event._id == id)

  detailCard.innerHTML = `
  <div  class="card m-2" style="max-width: 50rem;">
  <div class="row g-0">
  <div class="col-md-6">
      <img src="${detalles.image}" class="img-fluid rounded" style="height: 100%; width:100%;" alt="${detalles.name}">
    </div>
    <div class="col-md-6 my-1">
  <div class="card-body">
  <h5 class="text-center fw-semibold">${detalles.name}</h5>
  <p class="card-text text-center">${detalles.description}</p>
  <p class="card-text text-center mb-0">Capacity: ${detalles.capacity}</p>
  <p class="text-center m-0">Place: ${detalles.place}</p>
  <p class="text-center m-0">Date: ${detalles.date}</p>  
  <p class="text-center">Price: $${detalles.price}</p>  
  <div class="d-flex justify-content-center">  
  <a href="./index.html" class="btn btn-danger">Back to top</a>
  </div>
  </div>
  </div>
</div>
</div>
`
}