const form = document.forms[0];
const formDiv = document.querySelector('.initial-form');

function afterSubmit(e){
  let name = form.elements['username'].value;
  let marker = form.elements['marker'].value;
  setUpPlayers(name,marker);
  formDiv.classList.add('hidden');
  e.preventDefault();
  form.reset();
}

form.addEventListener('submit', afterSubmit);