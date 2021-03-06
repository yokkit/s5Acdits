var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var jokeButton = document.querySelector(".acuditButton");
var jokeText = document.querySelector(".jokeText");
var scoreDiv = document.querySelector(".score");
var scoresInput = Array.from(document.querySelectorAll("input"));
scoreDiv.style.display = "none";
var reportJokes = [];
;
var isScore = false;
var dataDad;
var dataNorris;
var isDad = false;
// Set Joke button
jokeButton.addEventListener("click", function () { return showAJoke(); });
var showAJoke = function () {
    try {
        var score = void 0;
        changeBackground();
        // Add to array reportJokes
        if (isScore) {
            addReportScore(score);
        }
        // Reset a joke and show radio buttons of scores
        jokeText.innerText = "";
        scoreDiv.style.display = "block";
        isDad = !isDad;
        // Get a new joke and show it
        if (isDad) {
            getDaddyJoke();
        }
        else {
            getNorrisJoke();
        }
        // only the first time
        if (!isScore) {
            isScore = true;
        }
    }
    catch (error) {
        console.log("Something went wrong! -- " + error);
    }
};
var addReportScore = function (score) {
    score = parseInt(scoresInput.filter(function (score) { return score.checked === true; })[0].value);
    scoresInput[0].checked = true;
    var fecha = new Date().toISOString();
    var selectedJoke;
    if (isDad) {
        selectedJoke = dataDad.joke;
    }
    else {
        selectedJoke = dataNorris.value;
    }
    reportJokes.push({
        joke: selectedJoke,
        score: score,
        date: fecha
    });
    console.log("ReportJoke", reportJokes);
};
var getDaddyJoke = function () { return __awaiter(_this, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch('https://icanhazdadjoke.com/', {
                    headers: {
                        Accept: "application/json"
                    }
                })];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                dataDad = _a.sent();
                console.log("joke", dataDad.joke);
                jokeText.innerText = dataDad.joke;
                return [2 /*return*/];
        }
    });
}); };
var getNorrisJoke = function () { return __awaiter(_this, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch('https://api.chucknorris.io/jokes/random', {
                    headers: {
                        Accept: "application/json"
                    }
                })];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                dataNorris = _a.sent();
                console.log("joke", dataNorris.value);
                jokeText.innerText = dataNorris.value;
                return [2 /*return*/];
        }
    });
}); };
//weather api
var weatherDiv = document.querySelector(".weatherDiv");
var tempDiv = document.querySelector(".tempDiv");
var getWeather = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, weatherBCN, weather;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch('https://api.openweathermap.org/data/2.5/weather?q=barcelona&appid=ac5afeceedbfd9b43156af672f440fd1&units=metric', {
                    headers: {
                        Accept: "application/json"
                    }
                })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                weatherBCN = _a.sent();
                weather = weatherBCN.weather[0].main;
                console.log("weather", weather);
                weatherDiv.innerHTML = weather;
                return [2 /*return*/];
        }
    });
}); };
getWeather();
// Background blob setting
var containerDiv = document.querySelector(".container");
var blobLeftDiv = document.querySelector(".blobLeft");
var blobRightDiv = document.querySelector(".blobRight");
var mainImageNames = ["blob1", "blob2", "blob3"];
var changeBackground = function () {
    var lenNum = Math.floor(Math.random() * 3);
    var selectedImage = mainImageNames[lenNum];
    containerDiv.style.backgroundImage = "url(./imgs/" + selectedImage + ".svg)";
    blobLeftDiv.src = "./imgs/" + selectedImage + "-1.svg";
    blobRightDiv.src = "./imgs/" + selectedImage + "-2.svg";
};
