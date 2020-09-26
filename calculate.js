function multiplyBy()
{
  if (document.getElementById("istanbul").checked)
  {
    price = document.getElementById("distance").value * 3.1 + 5;
    document.getElementById("result").innerHTML = `${price.toFixed(2)} Turkish Lira`;

    time = document.getElementById("distance").value * 1.3;
    document.getElementById("time").innerHTML = `${time.toFixed(1)} minutes`;

  } else if (document.getElementById("ankara").checked) {
    price = document.getElementById("distance").value * 3.4 + 4.6;
    document.getElementById("result").innerHTML = `${price.toFixed(2)} Turkish Lira`;

    time = document.getElementById("distance").value * 1.2;
    document.getElementById("time").innerHTML = `${time.toFixed(1)} minutes`;

  } else if (document.getElementById("izmir").checked) {
    price = document.getElementById("distance").value * 3.7 + 3;
    document.getElementById("result").innerHTML = `${price.toFixed(2)} Turkish Lira`;

    time = document.getElementById("distance").value * 1.1;
    document.getElementById("time").innerHTML = `${time.toFixed(1)} minutes`;
  } else {
    document.getElementById("result").innerHTML = "No one selected !"
  }
}



btn.addEventListener('click', (event) => {
  event.target.textContent = 'Thank You!';
  
});
