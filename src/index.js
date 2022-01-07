import './style/style.css';
import axios from "axios";
import _ from 'lodash';


//#############  Structure  ######################

const MainDiv = document.getElementById('wrapped')

//Title

const title = document.createElement('h1');
title.innerHTML = 'City Life';
MainDiv.appendChild(title);

//Text input

const textInput = document.createElement('p');
textInput.innerHTML = 'The quality of life in your city';
textInput.setAttribute('class', 'title2')

MainDiv.appendChild(textInput);

//Searchbar

const searchbar = document.createElement('div');
MainDiv.appendChild(searchbar);

//Input

const mainForm = document.createElement('form');
const mainInput = document.createElement('input');
searchbar.appendChild(mainForm);
mainForm.appendChild(mainInput);

mainForm.setAttribute('name', 'myForm');
mainForm.setAttribute('id', 'myForm');

mainInput.setAttribute('name', 'input');
mainInput.setAttribute('id', 'input');
mainInput.setAttribute('placeHolder', 'city ex rome');
mainInput.focus();

//Button Search
const btn1 = document.createElement('button');
mainForm.appendChild(btn1);
btn1.innerHTML = 'search';


//####################  Error Div Section  ##############################


const errorDiv = document.createElement('div')
MainDiv.appendChild(errorDiv);

const errorEmpty = document.createElement('p');
errorEmpty.setAttribute('class', 'error-text');
errorEmpty.style.display = 'none';
errorEmpty.innerHTML = 'Insert city please';

const errorQuery = document.createElement('p');
errorQuery.setAttribute('class', 'error-text');
errorQuery.style.display = 'none';
errorQuery.innerHTML = 'City not Found';

const errorNetwork = document.createElement('p');
errorNetwork.setAttribute('class', 'error-text');
errorNetwork.style.display = 'none';
errorNetwork.innerHTML = 'Internet Disconnected';



errorDiv.appendChild(errorEmpty);
errorDiv.appendChild(errorQuery);
errorDiv.appendChild(errorNetwork);


//####################### Info Div #################################


const infoContainerDiv = document.createElement('div'); //crea il div info

const nameCity = document.createElement('h2');        //crea H3 nome città(
const scoreCyty = document.createElement('h3');

const categoriesDiv = document.createElement('div');  //crea sezione categorie

const categoriesContainerTitle = document.createElement('div');
const categoriesTitle = document.createElement('h3');
const categoriesBtn = document.createElement('button');
const categoriesList = document.createElement('ul');
categoriesTitle.innerHTML = 'Categories'; //&nabla;
categoriesBtn.innerHTML = 'Less'

const summaryDiv = document.createElement('div');  // crea summary
const summaryContainerTitle = document.createElement('div');
const summaryTitle = document.createElement('h3');
const summaryBtn = document.createElement('button');
summaryTitle.innerHTML = 'Summary';
summaryBtn.innerHTML = 'Less';



//##################  STYLES  #################

infoContainerDiv.setAttribute('id', 'infoContainerDiv');
infoContainerDiv.style.display = 'none';

nameCity.setAttribute('id', 'nameCity');
nameCity.innerHTML= `Città` ;


categoriesDiv.setAttribute('class', 'categories-section');
categoriesDiv.style.display = '';
categoriesContainerTitle.setAttribute('class', 'container-title');
categoriesTitle.setAttribute('class', 'section-title' );
categoriesBtn.setAttribute( 'id', 'categoriesBtn');


scoreCyty.setAttribute('id', 'scoreCity');

summaryDiv.setAttribute('id', 'sumaryDiv');
summaryDiv.style.dispaly = '';
summaryContainerTitle.setAttribute('class', 'container-title');
summaryTitle.setAttribute('class', 'section-title');
summaryBtn.setAttribute('id', 'summaryBtn');

//##################  AppendChild Info Div ########################

MainDiv.appendChild(infoContainerDiv); //appende il tutto al div principale

infoContainerDiv.appendChild(nameCity);
infoContainerDiv.appendChild(scoreCyty);

infoContainerDiv.appendChild(categoriesDiv);
categoriesDiv.appendChild(categoriesContainerTitle);
categoriesContainerTitle.appendChild(categoriesTitle);
categoriesContainerTitle.appendChild(categoriesBtn);

categoriesDiv.appendChild(categoriesList);

summaryContainerTitle.appendChild(summaryTitle);
summaryContainerTitle.appendChild(summaryBtn);
infoContainerDiv.appendChild(summaryContainerTitle);
infoContainerDiv.appendChild(summaryDiv);

//######################  Class Info Div  ###################################

class cityDiv{

   constructor(data){
      this.data = data;
   }

   // Function element's maker category
   itemCategoryMaker(color, name, score, id){
      return(        
            `<li id='category${id}' style='border-left:10px solid ${color}'>
                  <span class='nameCategory'>${name}:</span>

                  <div class='bar'>
                     <span class='line' style='background-color:${color}; width: 100%'></span>
                     <span class='score' style='border: 4px solid${color}'>${score.toFixed()}</span>
                  </div>
                  
            </li>`
      )
   }
 
   //handle get data
   async elaboraDati(data){   
      console.log(data);   

      scoreCyty.innerHTML = _.get(data, "teleport_city_score", "-").toFixed() + ' %';

      categoriesList.innerHTML = data.categories.map((category, id) => {

         let color = category.color;
         let name = category.name;
         let score = category.score_out_of_10;

         return this.itemCategoryMaker(color, name, score, id)

      }).toString().replace(/,/g,"");
            
      summaryDiv.innerHTML = _.get(data, 'summary', '-');

      this.show(infoContainerDiv)
   };

   show(element) {
      element.style.display = '';
   }  
}

let citta = new cityDiv();

//##############  Request Data API  ####################

async function getCity(query){
   axios.get(`https://api.teleport.org/api/urban_areas/slug:${query}/scores/`)
   .then(res => {
     // handle success
     console.log(res);
     errorQuery.style.display = 'none';

     return res&&citta.elaboraDati(res.data)
   })
   .catch(function (error) {
      // handle error
    
   if(error.message === 'Network Error'){
      errorNetwork.style.display = '';
      infoContainerDiv.style.display = 'none';
      mainInput.focus();

   } else {
      console.log(error.message);
      errorQuery.style.display = '';
      infoContainerDiv.style.display = 'none';
      mainInput.focus();
     }
   })
}


//###############  Handle Input  ####################

myForm.addEventListener("submit", (e) =>{
   e.preventDefault();
   console.log('Ho provato a fare il submit');

   let query = mainInput.value.replace(/\s/g , "-");

   let empty = () =>{

      errorNetwork.style.display = 'none';
      errorEmpty.style.display = '';
      infoContainerDiv.style.display = 'none';
      mainInput.focus();
   }

   let request = () => {
      nameCity.innerHTML= `${query.replace(/\-/g , " ")}`;
      console.log(query);
      mainInput.value = '';

      errorEmpty.style.display = 'none';
      summaryDiv.style.display = '';
      categoriesList.style.display = '';
      categoriesBtn.innerHTML = 'Less';
      summaryBtn.innerHTML = 'Less';

      return getCity(query)
   }

   query === '' ? empty() : request();

});

//#############  Handle Button Section  ################

categoriesBtn.addEventListener('click', handleDiv);
summaryBtn.addEventListener('click', handleDiv);

function handleDiv(element){

   
   let el = element.target.id;
   console.log(element);
   function changeText(btn){
      btn.innerHTML === 'Less' ? 
         btn.innerHTML = 'More' 
         : btn.innerHTML = 'Less';
   }
   
   function hide(el) {
      
      console.log(el);
      
      el.style.display === '' ?
         el.style.display = 'none'
         : el.style.display ='';      
   }
   
   //console.log('click');
   //console.log(element.target.id); //debug
   switch(el){
      case 'categoriesBtn':
         changeText(categoriesBtn)
         hide(categoriesList);
         break;
      case 'summaryBtn':
         changeText(summaryBtn)
         hide(summaryDiv);
         break;
   }
}