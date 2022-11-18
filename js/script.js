{
    const titleClickHandler = function(event){
    event.preventDefault();
    
    const clickedElement = this;

    /* [done] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    /* [done] add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* [done] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    
    console.log(articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */
    
    const targetArticle = document.querySelector(articleSelector);
    console.log(document.querySelector('.active').href);
    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  }
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */

  // const clearLinkList = function (){
  //   document.querySelectorAll('li').innerHTML = '';
  // }

  // const listElements = querySelectorAll('li');
  // for(let listElement of listElelemnts){
  //   listElement.innerHTML = '';
  // }

  //po co usuwamy te linki skoro potem usuwamy je manualnie w hatmlu?

  /* for each article */
  const articles = document.querySelectorAll('.titles'); //czy da sie wstawić tutaj po prostu stałą?
  
    /* get the article id */
    for (let )
    /* find the title element */

    /* get the title from the title element */

    /* create HTML of the link */

    /* insert link into titleList */

}

generateTitleLinks();

}