const form = document.querySelector("form");
const searchTerm = document.querySelector("input");
const messageOne = document.getElementById("message-one");
const messageTwo = document.getElementById("message-two");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	console.log("hello");
	const location = searchTerm.value;
	messageOne.textContent = "Loading";

	fetch("http://localhost:3000/weather?address=" + location).then(
		(response) => {
			response
				.json()
				.then((res) => {
					console.log(res);
					messageOne.textContent = res.forecast;
					messageTwo.textContent = res.location;
					console.log(res.location);
				})
				.catch((error) => {
					console.log(error);
					messageOne.textContent = error;
					messageTwo.textContent = "";
				});
		},
	);
});
