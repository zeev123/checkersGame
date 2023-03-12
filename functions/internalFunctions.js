export function getLine(num) {
  let result = 0;
  if (num <= 7) result = 8;
  else if (num > 7 && num < 16) result = 7;
  else if (num > 15 && num < 24) result = 6;
  else if (num > 23 && num < 32) result = 5;
  else if (num > 31 && num < 40) result = 4;
  else if (num > 39 && num < 48) result = 3;
  else if (num > 47 && num < 56) result = 2;
  else if (num >= 56) result = 1;
  return result;
}

export function createDivWtithDivChild(className, id) {
  const element = document.createElement("div");
  const text = document.createTextNode("");
  element.classList.add(className);
  element.appendChild(text);
  element.id = id + "inner";
  return element;
}
export function createImg(id) {
  const element = document.createElement("img");
  element.src = "../lesson4/imges/king1.jpeg";
  const text = document.createTextNode("");
  element.appendChild(text);
  element.id = id + "innerImg";
  return element;
}
export function createParagraph(id, txt) {
  const element = document.createElement("p");
  const text = document.createTextNode(txt);
  element.appendChild(text);
  element.id = id + "innerP";
  return element;
}

export function writeWarningMsg(msg, miliSeconds, type) {
  let color = type == "error" ? "red" : type == "info" ? "orange" : "green";
  const gameStatusMsg = document.getElementById("gameStatusMsg");
  gameStatusMsg.style.color = color;
  gameStatusMsg.innerHTML = msg;
  gameStatusMsg.classList.remove("none");
  gameStatusMsg.classList.add("gameStatusMsg");
  setTimeout(() => {
    gameStatusMsg.classList.remove("gameStatusMsg");
    gameStatusMsg.classList.add("none");
  }, miliSeconds);
}

export function changeTurnMsg(isWhiteTurn) {
  let turnMsg = !isWhiteTurn ? "Black Turn" : "White Turn";
  document.getElementById("turnMsg").innerHTML = turnMsg;
}
