document.addEventListener('DOMContentLoaded', (event) => {

  // Variables
  const employee = document.querySelectorAll('.employee');
  const modal = document.querySelector("#overlay");
  const modalContent = document.querySelector(".modal-content");
  let results = [];

  // Fetch employee data
  fetch('https://randomuser.me/api/?results=12&nat=us')
      .then(response => response.json())
      .then(response => {
          createContent(response.results);
          results = response.results;
      });

  // Open modal and pass the id
  for (let i = 0; i < employee.length; i += 1) {
      ((id) => {
          employee[i].onclick = () => {
              modal.style.display = 'flex';
              additionalData(results, id);
          }
      })(i);
  }

  // Employees' main section
  createContent = (results) => {
      for (let i = 0; i < results.length; i += 1) {
          let employeeData = '';
          employeeData += `
      <img class="employee-image" alt="image" src="${results[i].picture.large}">
      <div class="employee-data">
        <h2>${results[i].name.first + ' ' + results[i].name.last}</h2>
        <p>${results[i].email}</p>
        <p class="city">${results[i].location.city}</p>
      </div>
    `;
          employee[i].innerHTML = employeeData;
      }
  }

  // Display additional data to modal
  additionalData = (results, id) => {
      let dob = results[id].dob.date;
      let birthday = dobChangeFormat(dob);
      let employeeInfo = `
  <span class="close">&times;</span>
  <div class="modal-info"><img class="profile-picture-large" alt="profile picture" src="${results[id].picture.large}">
  <h2>${results[id].name.first + ' ' + results[id].name.last}</h2>
  <p>${results[id].email}</p>
  <p class="city">${results[id].location.city}</p>
  <div class="line"></div>
  <p class="phone">${results[id].cell.replace(')-', ') ')}</p>
  <p class="address">
    ${results[id].location.street.number + ' ' + 
    results[id].location.street.name + ', ' +
    results[id].location.state + ' ' +
    results[id].location.postcode}</p>
  <p class="birthday">Birthday: ${birthday}</p>
  </div>
`;
      modalContent.innerHTML = employeeInfo;

      // Add event listener to close the modal
      const close = document.querySelector('.close');

      close.addEventListener('click', () => {
          modal.style.display = "none";
      });
  }

  // Change the dob format to dd/mm/yyyy
  dobChangeFormat = (dob) => {
      let day = dob.slice(8, 10);
      let month = dob.slice(5, 7);
      let year = dob.slice(0, 4);
      let dobNewFormat = day + '/' + month + '/' + year;
      return dobNewFormat;
  }

});