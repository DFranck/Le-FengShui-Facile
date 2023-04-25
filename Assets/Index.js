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


//==calculateKuaNumber==
document.getElementById('kuaForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const birthDate = document.getElementById('birthDate').value;
    const birthYear = new Date(birthDate).getFullYear();
    const gender = document.getElementById('gender').value;

    const kuaNumber = calculateKuaNumber(birthYear, gender);
    document.getElementById('kuaResult').textContent = "Votre nombre Kua est : " + kuaNumber;
});

function calculateKuaNumber(birthYear, gender) {
    const lastTwoDigits = birthYear % 100;
    const reducedNumber = (lastTwoDigits % 10) + Math.floor(lastTwoDigits / 10);

    let kuaNumber;
    if (gender === 'male') {
        kuaNumber = 10 - reducedNumber;
    } else if (gender === 'female') {
        kuaNumber = reducedNumber + 5;
    }

    if (kuaNumber === 5) {
        kuaNumber = gender === 'male' ? 2 : 8;
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
showDetailKua.addEventListener('click', () => {
    if (detailKuaVisible) {
        detailKua.innerHTML = '';
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

