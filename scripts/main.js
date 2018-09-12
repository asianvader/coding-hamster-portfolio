const phoebe = "phoebe";

function orbitalPeriod(arr) {
  const GM = 398600.4418;
  const earthRadius = 6367.4447;

  let newArr = Array.from(arr);

  for (let i = 0; i < newArr.length; i++) {
      let radius = Math.pow((arr[i].avgAlt + earthRadius), 3);
  let areaOfCircumference = 4 * (Math.pow((Math.PI), 2));
  let totalRadius = radius * areaOfCircumference;
  let time = Math.round(Math.sqrt(totalRadius/GM));
    delete newArr[i].avgAlt;
    newArr[i].orbitalPeriod = time;
  }

  return newArr;
}

//orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]);
console.log(orbitalPeriod([{name: "iss", avgAlt: 413.6}, {name: "hubble", avgAlt: 556.7}, {name: "moon", avgAlt: 378632.553}]));
