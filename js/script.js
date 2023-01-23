{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    // tagCloudLink: Handlebars.compile(document.querySelector('#templates.tagCloudLink').innerHTML)
  }
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
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.list.tags',
    optCloudClassCount = 5,
    optAuthorListSelector =".list.authors";
    // optCloudClassPrefix = 'tag-size-'; 
    

  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks(customSelector = '') {

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
  
    const articles = document.querySelectorAll(optArticleSelector+customSelector);

    for (let article of articles){
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      titleList.insertAdjacentHTML('beforeend', linkHTML);
    }

    const links = document.querySelectorAll('.titles a');
  
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
    // console.log(titleList);
    // console.log(articles);
  }

  generateTitleLinks();


  function calculateTagsParams(tags){
    const params = {
      min: 99999,
      max: 0
    }
    for (let tag in tags){
      // console.log(tag + ' is used ' + tags[tag] + ' times');
      if (tags[tag] > params.max){
        params.max = tags[tag];
        
      }
      if (tags[tag]<params.min){
        params.min=tags[tag];
      }
    }
    
    return params;
  }

  function calculateTagClass(count,params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    console.log(classNumber);
    return classNumber;
    
  }

  
  function generateTags(){
    /* create a variable allTags with an empty array */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles){
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector)
      // console.log(tagsWrapper);
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
        // console.log(tag);
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]){
          /* [NEW] add tag to allTags object*/
          allTags[tag]=1;
        }else {
          allTags[tag]++;
        }


        /* insert HTML of all the links into the tags wrapper */
        // const tagListHTML = '<li><a href="#tag-' + tagHTML + '">' + tagHTML + '</a></li>&nbsp';
        const linkHTMLData = {id: tagHTML};
        const linkHTML = templates.tagLink(linkHTMLData); 
        tagsWrapper.insertAdjacentHTML('beforeend', linkHTML);
      }  
      

    }
    /* [NEW] find list of tags in right column */
    const tagListWrapper = document.querySelector(optTagsListSelector);
    // console.log(tagListWrapper); 

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';
    // const allTagsData = {tags: []};
    
    //  

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="tagcloud-' +calculateTagClass(allTags[tag],tagsParams) + '">' + tag + ' <a/></li>';
      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsHTML += tagLinkHTML;
      // allTagsHTML += '<li><a href="#tag-' + tag + '" class="tagcloud-' +calculateTagClass(allTags[tag],tagsParams) + '">' + tag + ' (' + allTags[tag] + ') <a/></li>';
     
    // console.log(allTagsHTML);
    /* [NEW] END LOOP: for each tag in allTags: */
    }
    /*[NEW] add HTML from allTagsHTML to tagList */

    tagListWrapper.innerHTML = allTagsHTML;
  }
  
  generateTags();

  function generateAuthors (){
    let allAuthors ={};
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
        /* [NEW] check if this link is NOT already in allAuthors */
        if(!allAuthors[author]){
          /* [NEW] add tag to allTags object*/
          allAuthors[author]=1;
        }else {
          allAuthors[author]++;
        }

        /* insert HTML of all the links into the tags wrapper */
        // const authorListHTML = authorHTML + '&nbsp';
        const linkHTMLData = {id: authorHTML};
        const linkHTML = templates.authorLink(linkHTMLData); 
        authorsWrapper.insertAdjacentHTML('beforeend', linkHTML);
      }  
    }
    /* [NEW] find list of authors in right column */
    const authorListWrapper = document.querySelector(optAuthorListSelector);
    // console.log(authorListWrapper); 

    
    /* [NEW] create variable for all links HTML code */
    let allAuthorsHTML = '';
    /* [NEW] START LOOP: for each author in allAuthors: */
    for(let author in allAuthors){
      /* [NEW] generate code of a link and add it to allAuthorsHTML */
      const authorLinkHTML = '<li><a href="#"><span class="author-name">' + author + ' (' + allAuthors[author] + ')</span><a/></li>';   
      allAuthorsHTML += authorLinkHTML;
      
     /* [NEW] END LOOP: for each author in allAuthors: */
    }
    /*[NEW] add HTML from allAuthorsHTML to authorListWrapper */

    authorListWrapper.innerHTML = allAuthorsHTML;  
  }

  generateAuthors();

  // do dokończenia funkcje tagClickHandler i authorClickHandler!
  
  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = document.querySelectorAll('a.active[href^="#tag-"]');
    // Podobnie, dla wszystkich linków do tego samego tagu, możemy użyć selektora:
    // 'a[href="' + href + '"]'
    
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    
    /* find all tag links with class active */
  
    /* START LOOP: for each active tag link */
  
      /* remove class active */
  
    /* END LOOP: for each active tag link */
  
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for ( let tagLink of tagLinks){

    
      /* add class active */
  
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  
  function addClickListenersToTags(){
    /* find all links to tags */
  
    /* START LOOP: for each link */
  
      /* add tagClickHandler as event listener for that link */
  
    /* END LOOP: for each link */
  }
  
  addClickListenersToTags();
  
  function authorsClickHandler(event){

  }

  function addClickListenersToAuthors(){

  }

    

}