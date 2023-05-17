var problems={
    können_Fähigkeit: ["die Fähigkeit haben","fähig sein","imstande sein","in der Lage sein","vermögen"],
    können_Möglichkeit: ["die Möglichkeit haben","sein zu Inf (nicht müssen)","es ist möglich","sich lassen Inf"],
    dürfen_oder_können_Erlaubnis: ["die Erlaubnis haben","können","es ist gestattet","es ist erlaubt","die Erlaubnis haben","die Zustimmung erhalten","die Genehmigung bekommen","neg: es ist verboten"],
    wollen_Wille_Absicht_Bereitschaft: ["die Absicht haben","die Intention haben","beabsichtigen","bereit sein","die Bereitschaft zeigen","vorhaben","bestrebt sein"],
    möchten_Wunsch_Lust: ["den Wunsch haben","wünschen","Lust haben","würde gern Inf"],
    müssen_Notwendigkeit_Zwang_Pflicht: ["gezwung sein","verpflichtet sein","die Pflicht haben","es ist nötig","es ist notwendig","es ist erforderlich","es ist unumgänglich","haben zu Inf","sein zu Inf (nicht können)","neg:brauchen(zu) nicht","neg:kaum, kein, nur"],
    sollen_Auftrag_fremderWille_Erwartung: ["beauftragt sein","den Auftrag haben","es wird erwartet"],
    sollen_Empfehlung: ["es ist ratsam","empfehlenswert","es wäre besser, wenn"],
    sollen_wiedergabe_gegenwartkonjunktivI_vergangenekonjuktivII: ["Man erzählt sich","Man sagt","Man behauptet","Man hört dass...","es heißt","wird behauptet","gesagt dass...","angeblich ..."],
    wollen_behauptung_gegenwartkonjunktivI_vergangenekonjunktivII: ["Jemand behauptet","Jemand sagt von sich selbst","jemand gibt vor dass ..."]
}

const keys = Object.keys(problems);
var new_problems = {};
keys.forEach((key)=>{
    new_problems[problems[key]]=key;
})

problems = new_problems;

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
}

var correct = 0;
var total = 0;

const loadQuestions = ()=>{
    const questionBox = document.getElementById("question");
    const scoreBox = document.getElementById("score");
    const choicesBox = document.getElementById("choices");
    const commentBox = document.getElementById('comment');
    questionBox.innerHTML="";
    scoreBox.innerHTML="";
    choicesBox.innerHTML="";
    commentBox.innerHTML="";    

    scoreBox.innerText=correct+"/"+total;

    const keys = Object.keys(problems);
    let question = keys[Math.floor(Math.random()*keys.length)];
    let answer = problems[question];
    let question_array = question.split(',');
    let question_selection = question_array[Math.floor(Math.random()*question_array.length)];

    let questionText = document.createTextNode(question_selection);
    questionBox.appendChild(questionText);

    let choices = [answer];

    for(let i =0;i<3;i++){
        let choice = problems[keys[Math.floor(Math.random()*keys.length)]];
        while(true){
            let choice = problems[keys[Math.floor(Math.random()*keys.length)]];
            if(!choices.includes(choice)){
                choices.push(choice);
                break;
            }
        }

    }
    
    let weiter = document.createElement('button');
    weiter.innerText = 'Abgeben';
    weiter.addEventListener('click',(event)=>{
        let commentBox = document.getElementById('comment');
        let chosen = -1;
        let radios = document.getElementsByTagName('input');
        for(let i = 0; i < radios.length; i++){
            if(radios[i].checked===true){
                chosen = radios[i].value;
            }
        }
        total+=1;
        if(chosen === answer){
            commentBox.innerText='Korrekt!';
            correct +=1;
            if(correct==100 && total==100){
                commentBox.innerText="Korrekt! Du hast eine Schokolade von Hans verdient. Mach ein Foto von dieser Webseite und schick Hans das Foto.";
                window.alert("Du hast die Wirtschaftpruefung bestanden. Prost! Auf dich!")
            }
        }
        else{
            commentBox.innerText='Falsh! Die Lösung ist : '+answer;
        }
        weiter.disabled='disabled';
        let next = document.createElement('button');
        next.innerText='Weiter';
        next.addEventListener('click',(event)=>{
            loadQuestions();
        })
        choicesBox.appendChild(next);
    })

    shuffleArray(choices);
    console.log(choices);
    weiter.disabled='disabled';
    choices.forEach(choice=>{
        let input = document.createElement('input');
        input.type = 'radio';
        input.value = choice;
        input.id=choice;
        input.addEventListener('change',(event)=>{
            var radios = document.getElementsByTagName('input');
            for(let i = 0; i < radios.length; i++){
                radios[i].checked=false;
            }
            input.checked=true;
            weiter.disabled=false;
        })
    
        let label = document.createElement('label');
        label.innerText= choice;
        label.htmlFor=choice;
    
        let labelHolder = document.createElement('div');
        labelHolder.appendChild(input);
        labelHolder.appendChild(label);
        choicesBox.appendChild(labelHolder);    
    })
    choicesBox.appendChild(weiter);
}

loadQuestions();