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
    
    /* find the correct article using the selector (value of 'href' attribute) */
    
    const targetArticle = document.querySelector(articleSelector);
    
    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };
  
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';
    
    

  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks() {

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
  
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles){
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      titleList.insertAdjacentHTML('beforeend', linkHTML);
    }

    const links = document.querySelectorAll('.titles a');
  
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  }

  generateTitleLinks();

  // eslint-disable-next-line no-inner-declarations
  function generateTags(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles){
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector)
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* START LOOP: for each tag */
      
      for (let tag of articleTagsArray){
        /* generate HTML of the link */
        
        /* add generated code to html variable */
       
        const tagHTML = tag;
        /* insert HTML of all the links into the tags wrapper */
        const tagListHTML = '<li><a href="#tag-' + tagHTML + '">' + tagHTML + '</a></li>&nbsp';
        tagsWrapper.insertAdjacentHTML('beforeend', tagListHTML);
        
      }  
      /* END LOOP: for each tag */
      
    /* END LOOP: for every article: */
    }

  }
  
  generateTags();

  function generateAuthors (){
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles){
      /* find author wrapper */
      const authorsWrapper = article.querySelector(optArticleAuthorSelector)
            
      /* get authors from data-author attribute */
      const articleAuthors = article.getAttribute('data-auhor');

      /* split tags into array */
      const articleAuthorArray = articleAuthors.split(' ');

      // console.log(articleAuthorArray);
            
      for (let author of articleAuthorArray){
                
        /* add generated code to html variable */
        const authorHTML = author;
        // console.log(authorHTML);
        /* insert HTML of all the links into the tags wrapper */
        const authorListHTML = authorHTML + '&nbsp';
        authorsWrapper.insertAdjacentHTML('beforeend', authorListHTML);
      }  
    }  
  }

  generateAuthors();
  
  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = document.querySelectorAll('a.active[href^="#tag-"]');
    
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = '';
    /* find all tag links with class active */
  
    /* START LOOP: for each active tag link */
  
      /* remove class active */
  
    /* END LOOP: for each active tag link */
  
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for ( let tagLink of tagLinks){

    }
      /* add class active */
  
    /* END LOOP: for each found tag link */
  
    /* execute function "generateTitleLinks" with article selector as argument */
  }
  
  function addClickListenersToTags(){
    /* find all links to tags */
  
    /* START LOOP: for each link */
  
      /* add tagClickHandler as event listener for that link */
  
    /* END LOOP: for each link */
  }
  
  addClickListenersToTags();
  

}