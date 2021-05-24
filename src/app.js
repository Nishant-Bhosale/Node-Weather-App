const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.use(express.static(publicDirectoryPath));
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
	res.render("index", {
		name: "Nishant",
		title: "Index Page",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Page",
		name: "Nishant",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "Please provide a search term.",
		});
	}

	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({
					error,
				});
			}
			forecast(latitude, longitude, (error, forecastData) => {
				if (error) {
					return res.send({
						error,
					});
				}

				res.send({
					forecast: forecastData,
					location: location,
				});
			});
		},
	);
});

app.get("/help", (req, res) => {
	res.render("help", {
		helpText: "I am helping you out",
		name: "Nishant",
		title: "Helping you",
	});
});

app.get("/help/*", (req, res) => {
	res.render("errorPage", {
		title: "ERROR PAGE",
		errorMessage: "Help article not found",
		name: "SORRY",
	});
});

app.get("*", (req, res) => {
	res.render("errorPage", {
		title: "ERROR PAGE",
		errorMessage: "Page not found",
		name: "SORRY",
	});
});

app.listen(3000);
