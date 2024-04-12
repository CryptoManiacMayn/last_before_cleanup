function goBack() {
    window.history.back()
}

const urlParams = new URLSearchParams(window.location.search);
const dataValue = urlParams.get('data');
// const formattedValue = `"${dataValue}"`;
// document.getElementById('result').textContent = formattedValue;

function formatPercentage(rate) {
if (rate >= 1) {
// For numbers 1 and above, format to 2 decimal places
return rate.toLocaleString("en-US", {
minimumFractionDigits: 2,
maximumFractionDigits: 2,
});
} else {
// For numbers less than 1, increase the number of zeros after the decimal
// Find how many zeros are needed by getting the position of the first non-zero digit after the decimal
let decimalPart = rate.toString().split(".")[1] || "";
let nonZeroIndex = decimalPart.search(/[1-9]/);
let totalDigits = 2; // Ensure at least three significant digits after the first non-zero digit
return rate.toFixed(totalDigits);
}
}

function formatRate(rate) {
if (rate >= 1) {
// For numbers 1 and above, format to 2 decimal places
return rate.toLocaleString("en-US", {
minimumFractionDigits: 2,
maximumFractionDigits: 2,
});
} else {
// For numbers less than 1, increase the number of zeros after the decimal
// Find how many zeros are needed by getting the position of the first non-zero digit after the decimal
let decimalPart = rate.toString().split(".")[1] || "";
let nonZeroIndex = decimalPart.search(/[1-9]/);
let totalDigits = nonZeroIndex + 4; // Ensure at least three significant digits after the first non-zero digit
return rate.toFixed(totalDigits);
}
}

function formatLargers(number) {
    let scale = 0;
    const scales = ['M', 'B', 'T', 'QD', 'QT']; // Scales for Million, Billion, Trillion, etc.
    while (number >= 1000 && scale < scales.length - 1) {
        number /= 1000;
        scale++;
    }
    return { number: number.toFixed(2), suffix: scales[scale] };

}

fetch(new Request("https://api.livecoinwatch.com/coins/map"), {
method: "POST",
headers: new Headers({
"content-type": "application/json",
"x-api-key": "8f581a9e-b13f-4942-967e-f9fe8c147828",
}),
body: JSON.stringify({
codes: [
dataValue,
],
currency: "USD",
sort: "rank",
order: "ascending",
offset: 0,
limit: 0,
meta: true,
}),
})
.then((response) => response.json())
.then((data) => {

const coinPage = document.getElementById("coinPage");

const tableBody = document.getElementById("cryptoTable")

data.forEach((coin) => {
let wbst = coin.links.website;
let cleanedCode = coin.code
.replace("___", "")
.replace("__", "")
.replace("_", "");
console.log(wbst); 

data.forEach((coin) => {
let row = '<tr>';

// List all the possible links you want to check and include
const links = [
{ property: coin.links.website, iconClass: 'bx bx-globe' },
{ property: coin.links.whitepaper, iconClass: 'bx bxs-note' },
{ property: coin.links.twitter, iconClass: 'bx bxl-twitter' },
{ property: coin.links.facebook, iconClass: 'bx bxl-facebook-square' },
{ property: coin.links.reddit, iconClass: 'bx bxl-reddit' },
{ property: coin.links.telegram, iconClass: 'bx bxl-telegram' },
{ property: coin.links.discord, iconClass: 'bx bxl-discord-alt' },
{ property: coin.links.medium, iconClass: 'bx bxl-medium-square' },
{ property: coin.links.instagram, iconClass: 'bx bxl-instagram-alt' },
{ property: coin.links.tiktok, iconClass: 'bx bxl-tiktok' },
{ property: coin.links.youtube, iconClass: 'bx bxl-youtube' },
{ property: coin.links.linkedin, iconClass: 'bx bxl-linkedin-square' },
{ property: coin.links.twitch, iconClass: 'bx bxl-twitch' },
{ property: coin.links.spotify, iconClass: 'bx bxl-spotify' },
{ property: coin.links.soundcloud, iconClass: 'bx bxl-soundcloud' },
];

// Iterate through each link and only add it if the property exists
links.forEach(link => {
if (link.property) {
row += `<td><a href="${link.property}" target="_blank"><i class='${link.iconClass} bx-md'></i></a></td>`;
}
});

row += '</tr>';

// Append the row to the table body
tableBody.innerHTML += row;
});

console.log(coin)
    
// NAME
const coinContainer1 = document.createElement("div");
coinContainer1.classList.add("coinContainer1");
const nameElement = document.createElement("div");
nameElement.textContent = `${coin.name}`;
coinContainer1.appendChild(nameElement);
flexboxContainer1.appendChild(coinContainer1);

// LOGO
const coinContaineri = document.createElement("div");
coinContaineri.classList.add("coinContaineri");
const imgElement = document.createElement("img");
imgElement.src = `${coin.png64}`;
coinContaineri.appendChild(imgElement);
flexboxContaineri.appendChild(coinContaineri);

// AGE
const coinContainer2 = document.createElement("div");
coinContainer2.classList.add("coinContainer2");
const ageElement = document.createElement("div");
ageElement.textContent = `${coin.age}`;
coinContainer2.appendChild(ageElement);
flexboxContainer2.appendChild(coinContainer2);

// COLOR
const coinContainer3 = document.createElement("div");
coinContainer3.classList.add("coinContainer3");
const colorElement = document.createElement("div");
colorElement.textContent = `${coin.color}`;
coinContainer3.appendChild(colorElement);
flexboxContainer3.appendChild(coinContainer3);

// ALL TIME HIGH
const coinContainer8 = document.createElement("div");
coinContainer8.classList.add("coinContainer8");
const allTimeHighUSDElement = document.createElement("div");
allTimeHighUSDElement.textContent = `${'$' + (formatRate(coin.allTimeHighUSD))}`;
coinContainer8.appendChild(allTimeHighUSDElement);
flexboxContainer8.appendChild(coinContainer8);

// CIRCULATING SUPPLY
const coinContainer9 = document.createElement("div");
coinContainer9.classList.add("coinContainer9");
const circulatingSupplyElement = document.createElement("div");
let circulatingSupplyText = "";
if (coin.circulatingSupply !== null) {
    const formattedNumber = formatLargers(coin.circulatingSupply / 1000000); // Convert to millions
    circulatingSupplyText += formattedNumber.number + formattedNumber.suffix;
} else {
    circulatingSupplyText += "-";
}
circulatingSupplyElement.textContent = circulatingSupplyText;
coinContainer9.appendChild(circulatingSupplyElement);
flexboxContainer9.appendChild(coinContainer9);

// TOTAL SUPPLY
const coinContainer10 = document.createElement("div");
coinContainer10.classList.add("coinContainer10");
const totalSupplyElement = document.createElement("div");
let totalSupplyText = "";
if (coin.totalSupply !== null) {
    const formattedNumber = formatLargers(coin.totalSupply / 1000000); // Convert to millions
    totalSupplyText += formattedNumber.number + formattedNumber.suffix;
} else {
    totalSupplyText += "-";
}
totalSupplyElement.textContent = totalSupplyText;
coinContainer10.appendChild(totalSupplyElement);
flexboxContainer10.appendChild(coinContainer10);

// MAX
const coinContainer11 = document.createElement("div");
coinContainer11.classList.add("coinContainer11");
const maxSupplyElement = document.createElement("div");
let maxSupplyText = "";
if (coin.maxSupply !== null) {
    const formattedNumber = formatLargers(coin.maxSupply / 1000000); // Convert to millions
    maxSupplyText += formattedNumber.number + formattedNumber.suffix;
} else {
    maxSupplyText += "-";
}
maxSupplyElement.textContent = maxSupplyText;
coinContainer11.appendChild(maxSupplyElement);
flexboxContainer11.appendChild(coinContainer11);

// NAME
const coinContainer12 = document.createElement("div");
coinContainer12.classList.add("coinContainer12");
const codeElement = document.createElement("div");
codeElement.textContent = `${cleanedCode}`;
coinContainer12.appendChild(codeElement);
flexboxContainer12.appendChild(coinContainer12);

// RATE
const coinContainer13 = document.createElement("div");
coinContainer13.classList.add("coinContainer13");
const rateElement = document.createElement("div");
rateElement.textContent = `${'$' + (formatRate(coin.rate))}`;
coinContainer13.appendChild(rateElement);
flexboxContainer13.appendChild(coinContainer13);

// VOLUME
const coinContainer14 = document.createElement("div");
coinContainer14.classList.add("coinContainer14");
const volumeElement = document.createElement("div");
let volumeText = "";
if (coin.volume !== null) {
    const formattedNumber = formatLargers(coin.volume / 1000000); // Convert to millions
    volumeText += "$" +  formattedNumber.number + formattedNumber.suffix;
} else {
    volumeText += "-";
}
volumeElement.textContent = volumeText;
coinContainer14.appendChild(volumeElement);
flexboxContainer14.appendChild(coinContainer14);

// MARKET CAP
const coinContainer15 = document.createElement("div");
coinContainer15.classList.add("coinContainer15");
const capElement = document.createElement("div");
let capText = "";
if (coin.cap !== null) {
    const formattedNumber = formatLargers(coin.cap / 1000000); // Convert to millions
    capText += "$" + formattedNumber.number + formattedNumber.suffix;
} else {
    capText += "-";
}
capElement.textContent = capText;
coinContainer15.appendChild(capElement);
flexboxContainer15.appendChild(coinContainer15);

// HOUR
const coinContainer16 = document.createElement("div");
coinContainer16.classList.add("coinContainer16");
const hourElement = document.createElement("div");
const hourPercentage = (coin.delta.hour - 1) * 100;
hourElement.textContent = `${formatPercentage(hourPercentage)}%`;
hourElement.classList.add(hourPercentage >= 0 ? "green" : "red");
coinContainer16.appendChild(hourElement);
flexboxContainer16.appendChild(coinContainer16);

// DAY
const coinContainer17 = document.createElement("div");
const dayElement = document.createElement("div");
const dayPercentage = (coin.delta.day - 1) * 100;
dayElement.textContent = `${formatPercentage(dayPercentage)}%`;
dayElement.classList.add(dayPercentage >= 0 ? "green" : "red");
coinContainer17.appendChild(dayElement);
flexboxContainer17.appendChild(coinContainer17);

// WEEK
const coinContainer18 = document.createElement("div");
const weekElement = document.createElement("div");
const weekPercentage = (coin.delta.week - 1) * 100;
weekElement.textContent = `${formatPercentage(weekPercentage)}%`;
weekElement.classList.add(weekPercentage >= 0 ? "green" : "red");
coinContainer18.appendChild(weekElement);
flexboxContainer18.appendChild(coinContainer18);

// MONTH
const coinContainer19 = document.createElement("div");
coinContainer19.classList.add("coinContainer19");
const monthElement = document.createElement("div");
const monthPercentage = (coin.delta.month - 1) * 100;
monthElement.textContent = `${formatPercentage(monthPercentage)}%`;
monthElement.classList.add(monthPercentage >= 0 ? "green" : "red");
coinContainer19.appendChild(monthElement);
flexboxContainer19.appendChild(coinContainer19);

// QUARTER
const coinContainer20 = document.createElement("div");
coinContainer20.classList.add("coinContainer20");
const quarterElement = document.createElement("div");
if (coin.delta.quarter != null) {
    const quarterPercentage = (coin.delta.quarter - 1) * 100;
    quarterElement.textContent = `${formatPercentage(quarterPercentage)}%`;
    quarterElement.classList.add(quarterPercentage >= 0 ? "green" : "red");
} else {
    quarterElement.textContent = "N/A";
    quarterElement.classList.add("na");
}
coinContainer20.appendChild(quarterElement);
flexboxContainer20.appendChild(coinContainer20);

// YEAR
const coinContainer21 = document.createElement("div");
coinContainer21.classList.add("coinContainer21");
const yearElement = document.createElement("div");
if (coin.delta.year != null) {
    const yearPercentage = (coin.delta.year - 1) * 100;
    yearElement.textContent = `${formatPercentage(yearPercentage)}%`;
    yearElement.classList.add(yearPercentage >= 0 ? "green" : "red");
} else {
    yearElement.textContent = "N/A";
    yearElement.classList.add("na");
}
coinContainer21.appendChild(yearElement);
flexboxContainer21.appendChild(coinContainer21);
});
});