export function closeModal() {
  const divModal = document.getElementById("modal");
  divModal.classList.remove("modal");
  divModal.classList.remove("inner");
  divModal.classList.add("none");
  const body = document.getElementById("myBody");
  body.classList.remove("overlay");
  const board = document.getElementById("board");
  board.style.opacity = 1;
  const actions = document.getElementById("actions");
  actions.style.opacity = 1;
  
}
export function openModal(type, UserMsg) {
  const body = document.getElementById("myBody");
  body.className = "overlay"; 
  const actions = document.getElementById("actions");
  actions.style.opacity = 0.4;
  const board = document.getElementById("board");
  board.style.opacity = 0.4;
  const divModal = document.getElementById("modal");
  divModal.classList.remove("none");
  divModal.classList.add("modal");
  divModal.classList.add("inner");
  const h2 = document.getElementById("Modalh3");
  let baseMsg = "Are you sure you want to";
  let msg = type == "resign" ? baseMsg + " resign ?" : (baseMsg = UserMsg);
  h2.innerHTML = msg;
}
