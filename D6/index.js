document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    dropdownMenu.addEventListener('click', (event) => {
        const clickedItem = event.target;
        if (clickedItem.classList.contains('dropdown-item')) {
            dropdownToggle.textContent = clickedItem.textContent;
            updateTable();
        }
    });
});

let users = [];

async function loadAllUserData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    users = data;
    return data;
}

const tableBody = document.querySelector('#table-body');

window.onload = async function () {
    try {
        await loadAllUserData();

        const userRows = users.map(user => `
        <tr>
          <td class="border border-info">${user.id} </td>
          <td class="border border-info">${user.name} </td>
          <td class="border border-info">${user.username} </td>
          <td class="border border-info">${user.email} </td>    
        </tr>
      `);
        tableBody.innerHTML = userRows.join('');
    } catch (error) {
        console.error("An error has occurred", error);
    }
};

function updateTable() {
    const dropDownOption = document.querySelector('.dropdown-toggle').textContent.toLowerCase();
    const searchInput = document.querySelector("#input-text").value.toLowerCase();
    const filteredUserData = users.filter(user => {
        const userValue = user[dropDownOption].toLowerCase();
        return userValue.includes(searchInput);
    });

    const tableBody = document.querySelector('#table-body');
    tableBody.innerHTML = '';
    if (filteredUserData.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="4" class="no-data text-center"> No Data Found <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-emoji-smile-upside-down mb-1" viewBox="0 0 16 16">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0-1a8 8 0 1 1 0 16A8 8 0 0 1 8 0z"/>
            <path d="M4.285 6.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 4.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 3.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 9.5C7 8.672 6.552 8 6 8s-1 .672-1 1.5.448 1.5 1 1.5 1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5.448 1.5 1 1.5 1-.672 1-1.5z"/>
          </svg></td>
          </tr>
        `;
    } else {
        const userRows = filteredUserData.map(user => `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
      </tr>
    `);

        tableBody.innerHTML = userRows.join('');
    }
}

function refreshData() {
    try {
        loadAllUserData().then(userData => {
            const tableBody = document.querySelector('#table-body');
            const userRows = userData.map(user => `
          <tr>
            <td class="border border-info">${user.id} </td>
            <td class="border border-info">${user.name} </td>
            <td class="border border-info">${user.username} </td>
            <td class="border border-info">${user.email} </td>    
          </tr>
        `);
            tableBody.innerHTML = userRows.join('');
            const searchInput = document.querySelector("#input-text");
            searchInput.value = '';
        }).catch(error => {
            console.error("An error has occurred", error);
        });
    } catch (error) {
        console.error("An error has occurred", error);
    }
}
