document.querySelector('#check').addEventListener('click', check)

function check() {

  const day = document.querySelector('#day').value
  let dayCaseInsensitive = day.toLowerCase();
  let dayCategory;

  //Conditionals go here
  if (dayCaseInsensitive === "tuesday" || dayCaseInsensitive === "thursday") {
    dayCategory = "Class";
  } else if (dayCaseInsensitive === "saturday" || dayCaseInsensitive === "sunday") {
    dayCategory = "Weekend";
  } else {
    dayCategory = "Boring Day";
  }

  document.getElementById("placeToSee").innerText = dayCategory;
}