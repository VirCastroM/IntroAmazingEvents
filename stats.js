let upcomingEvents = []
let pastEvents = []

const traerContenido = async () => {
  try {
    const respuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
    let apiObjetos = await respuesta.json()
    let newEvents = apiObjetos.events
    console.log(newEvents);
    let categories = [];
    for (let i = 0; i < newEvents.length; i++) {
      let category = newEvents[i].category;
      if (categories.indexOf(category) === -1) {
        categories.push(category);
      }
    }
    console.log(categories);
    upcomingEvents = newEvents.filter(event => (event.date > apiObjetos.currentDate))
    console.log(upcomingEvents);
    pastEvents = newEvents.filter(event => (event.date < apiObjetos.currentDate))
    console.log(pastEvents);
    tabla1(pastEvents)
    tabla2(upcomingEvents)
    tabla3(pastEvents)
    contenT1 += ``
    contenT2 += ``
    contenT3 += ``
  }
  catch (error) {
  }
}

traerContenido()

let contenidoT1 = document.getElementById("contenidoTb1")
let contenidoT2 = document.getElementById("contenidoTb2")
let contenidoT3 = document.getElementById("contenidoTb3")

function tabla1(pastEvents) {
  let maxAttendance = null;
  let minAttendance = null;
  let maxCapacity = null;
  let maxAttendanceEvent = null;
  let minAttendanceEvent = null;
  let maxCapacityEvent = null;

  for (let i = 0; i < pastEvents.length; i++) {
    let event = pastEvents[i];
    let attendance_percent = event.assistance / event.capacity * 100;

    if (maxAttendance === null  || attendance_percent > maxAttendance) {
      maxAttendance = attendance_percent;
      maxAttendanceEvent = event.name;
    }

    if (minAttendance === null || attendance_percent < minAttendance) {
      minAttendance = attendance_percent;
      minAttendanceEvent = event.name;
    }

    if (maxCapacity === null || event.capacity > maxCapacity) {
      maxCapacity = event.capacity;
      maxCapacityEvent = event.name;
    }
  }

  let contenT1 = '';
  contenT1 = `
    <tr>
      <td>${maxAttendanceEvent} ${maxAttendance.toFixed(2)}%</td>
      <td>${minAttendanceEvent} ${minAttendance.toFixed(2)}%</td>
      <td>${maxCapacityEvent} ${maxCapacity}</td>
    </tr>
    `;
contenidoT1.innerHTML = contenT1;
  return [maxAttendanceEvent, minAttendanceEvent, maxCapacityEvent];  
}


function tabla2(upcomingEvents) {

  const eventsByCategory = upcomingEvents.reduce((allCategories, event) => {
    if (event.category in allCategories) {
      allCategories[event.category].push(event);
    } else {
      allCategories[event.category] = [event];
    }
    console.log(allCategories); 
    return allCategories;
  }, {});

    const categoriesUpcoming = Object.entries(eventsByCategory).map(([category, events]) => {
    const totalCapacity = events.reduce((allCategories, event) => allCategories + event.capacity, 0);
    const totalRevenue = events.reduce((allCategories, event) => allCategories + event.price * event.estimate, 0);
    const totalEstimatedAttendance = events.reduce((allCategories, event) => allCategories + event.estimate, 0);
    const averageAttendance = totalEstimatedAttendance / totalCapacity;
    const attendancePercentage = (averageAttendance * 100).toFixed(2);
    return {
      category,
      totalRevenue,
      attendancePercentage,
    };
  });

  let contenT2 = '';
  categoriesUpcoming.forEach(event => {
    contenT2 += `
      <tr>
        <td>${event.category}</td>
        <td>${event.totalRevenue}</td>
        <td>${event.attendancePercentage}%</td>
      </tr>
      `;
  });
  console.log(contenT2);
  contenidoT2.innerHTML = contenT2;
}


function tabla3(pastEvents) {

  const eventsByCategory = pastEvents.reduce((allCategories, event) => {
    if (event.category in allCategories) {
      allCategories[event.category].push(event);
    } else {
      allCategories[event.category] = [event];
    }
    return allCategories;
  }, {});

    const categoriesPast = Object.entries(eventsByCategory).map(([category, events]) => {
    const totalCapacity = events.reduce((allCategories, event) => allCategories + event.capacity, 0);
    const totalRevenue = events.reduce((allCategories, event) => allCategories + event.price * event.assistance, 0);
    const totalAssistance = events.reduce((allCategories, event) => allCategories + event.assistance, 0);
    const averageAssistance = totalAssistance / totalCapacity;
    const attendancePercentage = (averageAssistance * 100).toFixed(2);
    return {
      category,
      totalRevenue,
      attendancePercentage,
    };
  });

  let contenT3 = '';
  categoriesPast.forEach(event => {
    contenT3 += `
      <tr>
        <td>${event.category}</td>
        <td>${event.totalRevenue}</td>
        <td>${event.attendancePercentage}%</td>
      </tr>
      `;
  });
  console.log(contenT3);
  contenidoT3.innerHTML = contenT3;
}

