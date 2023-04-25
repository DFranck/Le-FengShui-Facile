//==Nav bar hide/show scroll==
const nav = document.querySelector("nav");
let previousScrollPosition = window.pageYOffset;

window.addEventListener("scroll", () => {
  const currentScrollPosition = window.pageYOffset;
  if (previousScrollPosition > currentScrollPosition) {
    nav.style.top = 0;
  } else {
    nav.style.top = "-50vw";
  }
  previousScrollPosition = currentScrollPosition;
});

//=================================calculateKuaNumber==============================
document.getElementById("kuaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const birthDate = document.getElementById("birthDate").value;
  const birthYear = new Date(birthDate).getFullYear();
  const gender = document.getElementById("gender").value;

  const kuaNumber = calculateKuaNumber(birthYear, gender);
  document.getElementById("kuaResult").textContent =
    "Votre nombre Kua est : " + kuaNumber;
});

function calculateKuaNumber(birthYear, gender) {
  const lastTwoDigits = birthYear % 100;
  const reducedNumber = (lastTwoDigits % 10) + Math.floor(lastTwoDigits / 10);

  let kuaNumber;
  if (gender === "male") {
    kuaNumber = 10 - reducedNumber;
  } else if (gender === "female") {
    kuaNumber = reducedNumber + 5;
  }

  if (kuaNumber === 5) {
    kuaNumber = gender === "male" ? 2 : 8;
  }

  if (kuaNumber > 9) {
    kuaNumber %= 9;
  }

  return kuaNumber;
}

const detailKua = document.querySelector(".detailKua");
const showDetailKua = document.getElementById("showDetailKua");
let detailKuaVisible = false;

//===showDetailKuaNumber===
showDetailKua.addEventListener("click", () => {
  if (detailKuaVisible) {
    detailKua.innerHTML = "";
  } else {
    detailKua.innerHTML = `
        <ul>
            <li>Prenez les deux derniers chiffres de votre année de naissance. Additionnez ces deux chiffres pour obtenir un seul chiffre. Si vous obtenez un nombre à deux chiffres, additionnez à nouveau ces deux chiffres pour obtenir un seul chiffre.</li>
            <li>Pour les hommes : Soustrayez ce chiffre de 10.</li>
            <li>Pour les femmes : Ajoutez 5 à ce chiffre.</li>
            <li>Si le nombre Kua est 5, remplacez-le par 2 pour les hommes et 8 pour les femmes.</li>
            <li>Si le nombre Kua est supérieur à 9, prenez le modulo 9 (c'est-à-dire le reste de la division par 9) pour obtenir un chiffre compris entre 1 et 9.</li>
        </ul>
        <p>Ces étapes vous donneront le nombre Kua basé sur votre année de naissance et votre genre.</p>`;
  }
  detailKuaVisible = !detailKuaVisible;
});

//===============================calculateLoShu===================================
document.getElementById("loShuForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const kuaNumber = document.getElementById("kuaNumber").value;
    const loShuTable = createLoShuTable(kuaNumber);
    displayLoShu(loShuTable);
  });
  
  function createLoShuTable(kuaNumber) {
    const kuaDirections = {
      1: { favorable: [1, 3, 4, 9], unfavorable: [2, 5, 6, 7, 8] },
      2: { favorable: [2, 6, 7, 8], unfavorable: [1, 3, 4, 5, 9] },
      3: { favorable: [1, 3, 4, 9], unfavorable: [2, 5, 6, 7, 8] },
      4: { favorable: [1, 3, 4, 9], unfavorable: [2, 5, 6, 7, 8] },
      6: { favorable: [2, 6, 7, 8], unfavorable: [1, 3, 4, 5, 9] },
      7: { favorable: [2, 6, 7, 8], unfavorable: [1, 3, 4, 5, 9] },
      8: { favorable: [1, 3, 4, 9], unfavorable: [2, 5, 6, 7, 8] },
      9: { favorable: [1, 3, 4, 9], unfavorable: [2, 5, 6, 7, 8] },
    };
  
    const directions = ["N", "SO", "E", "SE", "", "NO", "W", "NE", "S"];
    const loShuGrid = [
      [4, 9, 2],
      [3, 5, 7],
      [8, 1, 6],
    ];
  
    // Vérifier si le kuaNumber est valide
    if (kuaDirections.hasOwnProperty(kuaNumber)) {
      const { favorable, unfavorable } = kuaDirections[kuaNumber];
  
      for (let i = 0; i < loShuGrid.length; i++) {
        for (let j = 0; j < loShuGrid[i].length; j++) {
          const cellValue = loShuGrid[i][j];
  
          if (cellValue === 5) {
            loShuGrid[i][j] = "Centre";
          } else if (favorable.includes(cellValue)) {
            loShuGrid[i][j] = `${directions[cellValue - 1]} (F)`;
          } else if (unfavorable.includes(cellValue)) {
            loShuGrid[i][j] = `${directions[cellValue - 1]} (D)`;
          } else {
            loShuGrid[i][j] = `${directions[cellValue - 1]} (?)`;
          }          
        }
      }
    } else {
      console.error("Nombre Kua invalide");
    }
  
    let loShuTable = "<table>";
for (let i = 0; i < loShuGrid.length; i++) {
  loShuTable += "<tr>";
  for (let j = 0; j < loShuGrid[i].length; j++) {
    let cellClass = "";
    if (loShuGrid[i][j].includes("(F)")) {
      cellClass = "loShufavorable";
    } else if (loShuGrid[i][j].includes("(D)")) {
      cellClass = "loShuunfavorable";
    } else if (loShuGrid[i][j] === "Centre") {
      cellClass = "loShucenter";
    }
    loShuTable += `<td class="${cellClass}">${loShuGrid[i][j]}</td>`;
  }
  loShuTable += "</tr>";
}
loShuTable += "</table>";

  return loShuTable;
}

function displayLoShu(loShuTable) {
  document.getElementById("loShuResult").innerHTML = loShuTable;
}

const detailLoShu = document.querySelector(".detailLoShu");
const showDetailLoShu = document.getElementById("showDetailLoShu");
let detailLoShuVisible = false;
  
showDetailLoShu.addEventListener("click", () => {
    if (detailLoShuVisible) {
      detailLoShu.innerHTML = "";
    } else {
      detailLoShu.innerHTML = `
          <p>Une fois que vous avez calculé votre chiffre Kua, vous pouvez déterminer vos directions favorables et défavorables en utilisant le tableau suivant :</p>
          <table>
              <thead>
                  <tr>
                      <th>Chiffre Kua</th>
                      <th>Favorables</th>
                      <th>Défavorables</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>1</td>
                      <td>Nord, Sud, Est, Sud-Est</td>
                      <td>Ouest, Nord-Ouest, Sud-Ouest, Nord-Est</td>
                  </tr>
                  <tr>
                      <td>2</td>
                      <td>Ouest, Nord-Ouest, Sud-Ouest, Nord-Est</td>
                      <td>Nord, Sud, Est, Sud-Est</td>
                  </tr>
                  <tr>
                      <td>3</td>
                      <td>Sud, Nord, Sud-Est, Est</td>
                      <td>Ouest, Nord-Ouest, Sud-Ouest, Nord-Est</td>
                  </tr>
                  <tr>
                      <td>4</td>
                      <td>Sud, Nord, Sud-Est, Est</td>
                      <td>Ouest, Nord-Ouest, Sud-Ouest, Nord-Est</td>
                  </tr>
                  <tr>
                      <td>5 (homme)</td>
                      <td>Ouest, Nord-Ouest, Sud-Ouest, Nord-Est</td>
                      <td>Nord, Sud, Est, Sud-Est</td>
                  </tr>
                  <tr>
                      <td>5 (femme)</td>
                      <td>Sud, Nord, Sud-Est, Est</td>
                      <td>Ouest, Nord-Ouest, Sud-Ouest, Nord-Est</td>
                  </tr>
                  <tr>
                      <td>6</td>
                      <td>Ouest, Nord-Ouest, Sud-Ouest, Nord-Est</td>
                      <td>Nord, Sud, Est, Sud-Est</td>
                  </tr>
                  <tr>
                      <td>7</td>
                      <td>Nord, Sud, Est, Sud-Est</td>
                      <td>Ouest, Nord-Ouest, Sud-Ouest, Nord-Est</td>
                  </tr>
                  <tr>
                      <td>8</td>
                      <td>Ouest, Nord-Ouest, Sud-Ouest, Nord-Est</td>
                      <td>Nord, Sud, Est, Sud-Est</td>
                  </tr>
                  <tr>
                      <td>9</td>
                      <td>Nord, Sud, Est, Sud-Est</td>
                      <td>Ouest, Nord-Ouest, Sud-Ouest, Nord-Est</td>
                  </tr>
              </tbody>
          </table>
          <p>Ces directions peuvent être utilisées pour orienter votre lit, votre bureau ou d'autres aspects de l'aménagement.</p>`;
    }
    detailLoShuVisible = !detailLoShuVisible;
  
  });