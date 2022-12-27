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
    optArticleTagsSelector = '.post-tags .list';
    
    

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
        console.log(tag);
        const singleTag = '';
        /* add generated code to html variable */
       
        const tagHTML = tag.innerHTML;
        /* insert HTML of all the links into the tags wrapper */
        const tagListHTML = '<li><a href=#tag-' + tagHTML + '">' + tagHTML + '</a></li>';
        tagsWrapper.insertAdjacentHTML('beforeend', tagListHTML);
        
        // const tagString = tag.querySelector();
      }  
      /* END LOOP: for each tag */
  
      
      
    /* END LOOP: for every article: */
    }

  }
  
  generateTags();
  

}