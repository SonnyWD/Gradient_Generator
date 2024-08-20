
const colorPickerInputs = [...document.querySelectorAll("input[type='color']")]
const inputRange = document.querySelector("input[type='range']")
const labelRange = document.querySelector("label[for='range']")
const pasteButton = document.querySelector(".paste")
const randomButton = document.querySelector(".random")
const colorLabels = [...document.querySelectorAll(".container-input .labelColor")]

// const labelColorOne = document.querySelector("label[for='color-one']")
// const labelColorTwo = document.querySelector("label[for='color-two']")

// je stocke dans un objet mes valeurs d'input

const gradientData = {
    angle: 180,
    colors: ["#60cb59", "#00c683"]
  }

// Je créer la fonction qui modifiera les inputs a chaque changement

function changeUI(){
    colorLabels[0].textContent = gradientData.colors[0];
    colorLabels[1].textContent = gradientData.colors[1];
  
    colorPickerInputs[0].value = gradientData.colors[0];
    colorPickerInputs[1].value = gradientData.colors[1];
  
    colorLabels[0].style.background = gradientData.colors[0]
    colorLabels[1].style.background = gradientData.colors[1]
  
    document.body.style.background = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`;
  
    labelRange.textContent = `Orientation : ${gradientData.angle}°`;
  
    adaptInputsColor()
  }

changeUI()

function adaptInputsColor(){
    colorLabels.forEach(label => {
      const hexColor = label.textContent.replace("#", "");
      const red = parseInt(hexColor.slice(0,2), 16)
      const green = parseInt(hexColor.slice(2,4), 16)
      const blue = parseInt(hexColor.slice(4,6), 16)
  
      const yiq = (red * 299 + green * 587 + blue * 144) / 1000;
      console.log(yiq);
   
      if(yiq >= 128) {
        label.style.color = "#111"
      }
      else {
        label.style.color = "#f1f1f1"
      }
    })
  }
// Je créer ensuite une fonction pour modifier le HTML de l'input range en fonction des changements

inputRange.addEventListener("input", handleRange);

function handleRange(){

    gradientData.angle = inputRange.value;
    labelRange.textContent = `Orientation : ${gradientData.angle}°`;
     changeUI();
    
}

//  Ensuite je créer une fonction pour changer la couleur lorsque l'on veut directement la choisir en cliquant sur le label 

colorPickerInputs.forEach(input => input.addEventListener("input", colorInputModification))

function colorInputModification(e){

    const currentIndex = colorPickerInputs.indexOf(e.target);
    gradientData.colors[currentIndex] = e.target.value.toUpperCase();

    changeUI();
}

// Je créer la fonction d'événement au click lié au bouton random pour générer des couleurs aléatoires 

randomButton.addEventListener("click", handleClick)

function handleClick(){
    
    const HEXA = "0123456789ABCDEF";
    let color = '#';
    let colorTwo = '#';

    for(let i = 0; i < 6; i++){
        
        color += HEXA[Math.floor(Math.random()* 16)];
        colorTwo += HEXA[Math.floor(Math.random()* 16)];
             
    }

    gradientData.colors[0] = color
    gradientData.colors[1] = colorTwo;

    changeUI()
}

// je finis en créant la fonctionnalité de copier sur le button

pasteButton.addEventListener("click", handlePaste)

let lock = false;

function handlePaste(){

    const gradientCopy = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`;

    navigator.clipboard.writeText(gradientCopy)

    if(lock) return;

    lock = true;
    pasteButton.classList.add("active")

    setTimeout(() => {
    pasteButton.classList.remove("active")    
    lock = false;     
    }, 1000);
}

