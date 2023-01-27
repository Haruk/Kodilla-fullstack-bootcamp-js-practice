{
  const templates = {
    articleLinkTpl: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLinkTpl: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLinkTpl: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML)
  }
 
  const select = {
    all: {
      articles: '.post',
      linksTo: {
        tags: 'a[href^="#tag-"]',
        tagsActive: 'a.active[href^="#tag-"]',
        authors: 'a[href^="#author-"]',
        authorsActive: 'a.active[href^="#author-"]'
      },
    },
    article: {
      title: '.post-title',
      tags: '.post-tags .list',
      tagLink: '.post-tags .list a',
      author: '.post-author',
      authorLink: '.post-author a'
    },
    listOf: {
      titles: '.titles',
      tags: '.tags',
      tagLink: '.tags a',
      authors: '.authors',
      authorLink: '.authors a'
    },
  };
  
  const optCloudClassCount = 5;
  // const optArticleSelector = '.post',
  //   optTitleSelector = '.post-title',
  //   optTitleListSelector = '.titles',
  //   optArticleTagsSelector = '.post-tags .list',
  //   optArticleAuthorSelector = '.post-author',
  //   optTagsListSelector = '.list.tags',

  //   optAuthorListSelector =".list.authors";
  
  /*ALL POST COLLUMN*/ 

  function showFilteredPostList() {
    let articlesListHeading = document.getElementById('articles-list-heading');
    const activeAuthorLinksCheck = document.querySelectorAll(select.all.linksTo.authorsActive);
    const activeTagLinksCheck = document.querySelectorAll(select.all.linksTo.tagsActive);
    if ((activeTagLinksCheck.length != 0) || (activeAuthorLinksCheck.length != 0)) {
      articlesListHeading.innerHTML = 'Filtered posts';}
  }
  
  const titleClickHandler = function(event){
      event.preventDefault();
      
      const clickedElement = this;

      /* remove class 'active' from all article links  */
      const activeLinks = document.querySelectorAll('.titles a.active');

      for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
      }

      /* add class 'active' to the clicked link */
      clickedElement.classList.add('active');

      /* remove class 'active' from all articles */
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

      showFilteredPostList();
    };

  function generateTitleLinks(customSelector = '') {
    /*remove contents of titleList */
    const titleList = document.querySelector(select.listOf.titles);
    titleList.innerHTML = '';
    let articlesListHTML = document.getElementById('articles-list');

    const articles = document.querySelectorAll(select.all.articles+customSelector);
    /*for each article*/
    for (let article of articles){
      /*get the article ID*/
      const articleId = article.getAttribute('id');
      /* find the title element and get the title from the title element */
      const articleTitle = article.querySelector(select.article.title).innerHTML;

      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLinkTpl(linkHTMLData);
      /*inser link into titleList */
      articlesListHTML.insertAdjacentHTML('beforeend', linkHTML);
    }

    const links = document.querySelectorAll('.titles a');
  
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
    
  }

  generateTitleLinks();

  /*TAGS*/ 

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
    const tagClass = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    return tagClass;
  }

  function generateTags(){
    /* create a variable allTags with an empty array */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles);

    /* START LOOP: for every article: */
    for (let article of articles){
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(select.article.tags);
    
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* START LOOP: for each tag */
      
      for (let tag of articleTagsArray){
        /* generate HTML of the link */
        
        /* add generated code to html variable */
       
        const tagHTMLData = {tagTpl: tag};
        const tagHTML = templates.tagLinkTpl(tagHTMLData);
        /* insert HTML of all the links into the tags wrapper */
        tagsWrapper.insertAdjacentHTML('beforeend', tagHTML);

        
        /*check if this link is NOT already in allTags */
        if(!allTags[tag]){
          /* add tag to allTags object*/
          allTags[tag]=1;
        }else {
          allTags[tag]++;
        }      
      }  
    }
    /* find list of tags in right column */
    const tagListWrapper = document.querySelector('.tags');
    // console.log(tagListWrapper); 

    const tagsParams = calculateTagsParams(allTags);
    
    /* create variable for all links HTML code */
    const allTagsData = {tags: []};
    
    /*[Handlebars] initialize sorting*/ 
    const tagsAndTheirCount = [];
    function compareTagCounts(a, b){
      return b.tagCount - a.tagCount;
    }
    /* START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* generate code of a link and add it to column */
      let tagAndItsCount = {tagName: tag, tagCount: allTags[tag]};
      tagsAndTheirCount.push(tagAndItsCount);
    }
    tagsAndTheirCount.sort(compareTagCounts);
    for(let tag in tagsAndTheirCount){
      // [Handlebars]
      allTagsData.tags.push ({
        listTagTpl: tag,
        tagCountTpl: allTags[tagsAndTheirCount[tag].tagName],
        tagClassTpl: calculateTagClass(allTags[tagsAndTheirCount[tag].tagName], tagsParams),
        tagNameTpl: tagsAndTheirCount[tag].tagName
      });
    }
    /*add HTML to tagList */

    tagListWrapper.innerHTML += templates.tagCloudLink(allTagsData);
  }

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const linkHref = clickedElement.getAttribute('href');
       
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = linkHref.replace('#tag-', '');
    
    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll(select.all.linksTo.tagsActive);
    /* START LOOP: for each active tag link */
    for (let activeTagLink of activeTagLinks){
      /* remove class active */
      activeTagLink.classList.remove('active');
    }
      
    /*If any authors are now shown active, deactivate them */
    const activeAuthorLinks = document.querySelectorAll(select.all.linksTo.authorsActive);
    /*for each activeAuthorLink remove class active*/ 
    for(let activeAuthorLink of activeAuthorLinks){
      activeAuthorLink.classList.remove('active');
    }
  
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + linkHref + '"]');
    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks){
      /* add class active */
      tagLink.classList.add('active');
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');

    showFilteredPostList();
  }
  
  function addClickListenersToTags(){
      /* find all links to tags in articles */
    const links = document.querySelectorAll(select.article.tagLink);
      /* START LOOP: for each link */
    for (let link of links){
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    }
      
      /* find all links to tags in tag clud*/
    const tagCloudLinks = document.querySelectorAll(select.listOf.tagLink);
      /* START LOOP: for each link */
    for ( let tagCloudLink of tagCloudLinks) {
      /* add tagClickHandler as event listener for that link */
      tagCloudLink.addEventListener('click',tagClickHandler);
    }
  
  }
  
  generateTags();
  addClickListenersToTags();

  /*AUTHORS*/ 

  function generateAuthors (){
    let allAuthors ={};
    /*find all articles*/ 
    const articles = document.querySelectorAll(select.all.articles);

    for (let article of articles){
      /* find author wrapper */
      const authorWrapper = article.querySelector(select.article.author)
            
      /* get authors from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');

      /* split tags into array */
      const articleAuthorArray = articleAuthor.replace(' ', '_');

      /* generate HTML of the tag link */
      const authorHTMLData = {authorTpl: articleAuthor, authorNoSpaceTpl: articleAuthorArray};
      const authorHTML = templates.authorLinkTpl(authorHTMLData);
      authorWrapper.insertAdjacentHTML('beforeend', authorHTML);
            

      /*check if this link is NOT already in allTags */
      if(!allAuthors.hasOwnProperty(articleAuthorArray)){
        /*add generated code to allAuthorsArticleCounts array */
        allAuthors[articleAuthorArray] = 1;
      } else {
        allAuthors[articleAuthorArray]++;
      }
    }
        /*find list of authors in right column*/ 
    const authorList  = document.querySelector(select.listOf.authors);

    /*create variable for all links in HTML*/
    const allAuthorsNames = {authors: []};
    
    /* START LOOP: for each author in allAuthors: */
    for(let author in allAuthors){
      /* generate code of a link and add it to allAuthorsHTML */
      const authorLinkHTML = author.replace('_', ' ');
        allAuthorsNames.authors.push({
          authorNoSpaceTpl:author,
          authorNameTpl: authorLinkHTML
        });
      
    
      }
    /*add HTML from allAuthorsHTML to authorListWrapper */

    authorList.innerHTML = templates.authorListLink(allAuthorsNames); 
  }
  
  function authorsClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    
    /*make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    
    /*make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "articleAuthor" and extract author name from the "href" constant */
    const articleAuthor = href.replace('#author-', '').replace('_', ' ');
    /* find all author links with class active */
    const activeAuthorLinks = document.querySelectorAll(select.all.linksTo.authorsActive);
    
    /*START LOOP: for each active author link */
    for(let activeAuthorLink of activeAuthorLinks){
      /* remove class active */
      activeAuthorLink.classList.remove('active');
     }
     /* If any tags are now shown active, deactivate them */
    const activeTagLinks = document.querySelectorAll(select.all.linksTo.tagsActive);
    
    /*START LOOP: for each active tag link */
    for(let activeTagLink of activeTagLinks){
      /* remove class active */
      activeTagLink.classList.remove('active');
    }
    
    /* find all author links with "href" attribute equal to the "href" constant */
    const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
    
    /* START LOOP: for each found author link */
    for(let authorLink of hrefAuthorLinks){
      /* add class active */
       authorLink.classList.add('active');
    }
    
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + articleAuthor + '"]');
    
    showFilteredPostList();
  }

  function addClickListenersToAuthor(authorLinkSelector){
    const links = document.querySelectorAll(authorLinkSelector);
    
    for (let link of links){
      link.addEventListener('click', authorsClickHandler);
    }
  }

  generateAuthors();
  addClickListenersToAuthor(select.article.authorLink);
  addClickListenersToAuthor(select.listOf.authorLink);
}