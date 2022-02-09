const msg = document.querySelector("#msg");
const weather = (loc) => {
  fetch("/weather?search=" + loc).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        msg.textContent = data.error;
      } else {
        msg.textContent = data.location;
      }
    });
  });
};

const weatherForm = document.querySelector("form");
const loc = document.querySelector("input");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text1 = "Loading...";
  let n = 1;
  const interval = setInterval(() => {
    msg.textContent = text1 + "\t" + n;
    n += 1;
  }, 100);
  setTimeout(() => {
    weather(loc.value);
    clearInterval(interval);
  }, 2000);
});
