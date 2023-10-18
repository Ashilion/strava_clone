const CTL_TIME = 42;
const ATL_TIME = 7;


function next_ctl(ctl_yesterday, trimp_score){
    let ctl_today = ctl_yesterday + (trimp_score-ctl_yesterday)/CTL_TIME;
    console.log(ctl_today)
    return ctl_today;
}

function next_atl(atl_yesterday, trimp_score){
    let atl_today = atl_yesterday + (trimp_score-atl_yesterday)/ATL_TIME;
    return atl_today;
}

function tsb(ctl_yesterday, atl_yesterday){
    return ctl_yesterday-atl_yesterday;
}

function calcul_atl_ctl_fitness(trimp_daily, ctl_depart= 0, atl_depart= 0){
    let tab_fitness=[[ctl_depart],[atl_depart],[tsb(ctl_depart,atl_depart)]]
    for(let i=1 ; i<=trimp_daily.length;i++){
        tab_fitness[0].push(next_ctl(tab_fitness[0][i-1],trimp_daily[i-1])) 
        tab_fitness[1].push(next_atl(tab_fitness[1][i-1],trimp_daily[i-1]))
        tab_fitness[2].push(tsb(tab_fitness[0][i-1], tab_fitness[1][i-1]))
    }
    return tab_fitness
}


function getRandomTRIMP() {
    // Générer un score TRIMP simulé entre 50 et 200
    return (Math.random() * (200 - 50) + 50).toFixed(0);
  }
  
function generateTRIMPScores(num) {
    const trimpScores = [];
    for (let i = 0; i < num; i++) {
        let randomTrimp = getRandomTRIMP();
        if (randomTrimp %3 ==0){
            trimpScores.push(0);}
        else{
            trimpScores.push(randomTrimp)}
    }
    return trimpScores;
}

function x_values(taille){
    let x_tab= []
    for(let i= 0 ; i< taille; i++){
        x_tab.push(i)
    }
    return x_tab
}

const numberOfTRIMPScores = 200;
const trimpScores = generateTRIMPScores(numberOfTRIMPScores);

let tab = calcul_atl_ctl_fitness(trimpScores, 50,50)

function nivo_line_data(fitness_data,trimp_data){
    let res = [{
        id:"ATL",
        color:"green",
        data:[]
    },
    {
        id:"CTL",
        color:"red",
        data:[]
    },
    {
        id:"TSB",
        color:"blue",
        data:[]
    },
    {
        id:"Trimp",
        color:"blue",
        data:[],
    }
  ]
  
  for(let i = 0; i< trimp_data.length; i++){
    res[0].data.push(fitness_data[0][i]);
    res[0].data.push(fitness_data[1][i]);
    res[0].data.push(fitness_data[2][i]);
    res[0].data.push(trimp_data[i]);
  }
  return res
}

export default {calcul_atl_ctl_fitness, nivo_line_data};