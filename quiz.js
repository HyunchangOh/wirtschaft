var problems={
    Inflation: 'Erhöhung des Preisniveaus für die in einer Volkswirtschaft produzierten Güter und erbrachten Dienstleistungen',
    Inflationsrate: "Das Maß, mit dem eine Inflation gemessen wird.",
    Umsatz: "Summe aller Einnahmen für Dienstleistungen, Waren und Produkte eines Unternehmens",
    Nachfrage: "die Absicht von Haushalten und Unternehmen, Waren und Dienstleistungen gegen Geld oder andere Waren im Tausch zu erwerben.",
    Kaufkraft: "das verfügbare Einkommen aller Bevölkerungsschichten in einer bestimmten Region",
    Dienstleistung: "eine besondere Art wirtschaftlicher Güter, bei der eine Leistung erbracht wird, die nicht lagerfähig ist und bei der Herstellung und Verbrauch gleichzeitig stattfinden",
    Deflation: "eine Absenkung des allgemeinen Preisniveaus",
    Angebotsüberhang: "Situation am Markt, in der die angebotene Menge an Gütern größer ist als die Nachfrage nach diesen Gütern.",
    Liquidität:"*** eines Unternehmens bestimmt, ob es in der Lage ist, seinen Zahlungsverpflichtungen nachzukommen",
    Haushalt: "eine ökonomische Größe verstanden, die einen einheitlichen Willen bilden und einheitlich handeln können",
    Konjunkturphasen: "vier einzelne Abschnitte in der Volkswirtschaft, die sich innerhalb eines gesamten Konjunkturzyklus wiederholen",
    Globalsteuerung: "die Beeinflussung volkswirtschaftlicher Gesamtgrößen wie Wachstum, Volkseinkommen, Preisniveau, Investitionen, Außenhandel oder Beschäftigung durch die Wirtschafts- und Geldpolitik",
    Arbeitslosenquote: "das Verhältnis der Zahl der Arbeitslosen zur Zahl der Erwerbspersonen (Erwerbstätige und Arbeitslose)",
    Phillipskurve: " Zusammenhang zwischen der Zuwachsrate der Nominallöhne und der Arbeitslosenquote",
    AngebotsorientierteWirtschaftsPolitk: "Maßnahmen der Wirtschaftspolitik, die auf der Angebotsseite der Volkswirtschaft ansetzen.",
    Liquiditätsfalle: "unendlich zinselastische Geldnachfrage",
    Arbeitsangebot: "steigt selbstverständlich mit steigenden Reallöhnen. Die Leute bekommen mehr Geld für die gleiche Arbeit. Die Opportunitätskosten von Freizeit steigen. Dementsprechend möchten die Leute mehr arbeiten.",
    Opportunitätskosten:"Vielmehr möchte man damit den entgangenen Gewinn oder Nutzen beziffern. Dieser verlorengegangene Gewinn oder Nutzen entsteht, wenn man sich zwischen verschiedenen Alternativen entscheidet. Das Gegenteil der Opportunitätskosten sind die sogenannten Opportunitätserlöse.",
    
}

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

    let questionText = document.createTextNode(question);
    questionBox.appendChild(questionText);

    let choices = [answer];

    for(let i =0;i<3;i++){
        let choice = problems[keys[Math.floor(Math.random()*keys.length)]];
        choices.push(choice);
    }
    
    shuffleArray(choices);
    console.log(choices);
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
        })
    
        let label = document.createElement('label');
        label.innerText= choice;
        label.htmlFor=choice;
    
        let labelHolder = document.createElement('div');
        labelHolder.appendChild(input);
        labelHolder.appendChild(label);
        choicesBox.appendChild(labelHolder);    
    })

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
            commentBox.innerText='Correct!';
            correct +=1;
        }
        else{
            commentBox.innerText='Wrong! Answer is : '+answer;
        }
        weiter.disabled='disabled';
        let next = document.createElement('button');
        next.innerText='Weiter';
        next.addEventListener('click',(event)=>{
            loadQuestions();
        })
        choicesBox.appendChild(next);
    })
    choicesBox.appendChild(weiter);
}

loadQuestions();