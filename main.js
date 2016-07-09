/**
 * Project 2: Feedr
 * ====
 *
 * See the README.md for instructions
 */

(function() {
  
  var hackerURL = "https://hacker-news.firebaseio.com/v0/"
  var chuckURL = "http://api.icndb.com/jokes/random/10"
  var redditURL = "https://www.reddit.com/top.json"
  var mashableURL = "http://mashable.com/stories.json"


  var container = document.querySelector('#container')
  var header = document.querySelector('header')

  var state = {
  	feedURL: [
	  	{chuckURL:"http://api.icndb.com/jokes/random/10"},
	  	{mashableURL : "http://mashable.com/stories.json"},
	  	{redditURL : "https://www.reddit.com/top.json"},
	  	{hackerURL : "https://hacker-news.firebaseio.com/v0/"}
  	],
  	loading :"<div id='pop-up' class='loader'></div>",
 		articles:[
 			],
 			reset:function(){
 				state.articles.forEach((el)=>{
 					el = ""
 				})
 			}
  }
  renderHeader(state, header)
	


  function getChuck(){
  	fetch(state.feedURL[0].chuckURL).then((response)=>{
    return response.json()
  }).then((callback)=>{
      callback.value.forEach((joke)=>{
  	  state.articles.push({
  	  	content:joke.joke,
  	  	image:"images/chuck.jpg",
  	  	social:0,
  	  	title:"Chuck Jokes"})
  		})
  		renderNews(state,container)
  	})
  	}

	function getMash(){
  	fetch(state.feedURL[0].mashableURL).then((response)=>{
    return response.json()
  }).then((callback)=>{
  
  	})
	}

	function getRed(){
  	fetch(state.feedURL[0].chuckURL).then((response)=>{
    return response.json()
  }).then((callback)=>{
      callback.value.forEach((joke)=>{
  	  	state.articles.push(joke.joke)
  		})
  	})
	}

	function getHack(){
  	fetch(state.feedURL[0].chuckURL).then((response)=>{
    return response.json()
  }).then((callback)=>{
      callback.value.forEach((joke)=>{
  	  	state.articles.push(joke.joke)
  		})
  	})
	}

  getChuck()

  // function renderNews(into) {
  // 	return ``
     
  // }


  function renderHeader(data, into) {
    into.innerHTML = `<section class="wrapper">
      <a href="index.html"><h1>Feedr</h1></a>
      <nav>
        <section id="search">
          <input type="text" name="name" value="">
          <div id="search-icon"><img src="images/search.png" alt="" /></div>
        </section>
        <ul>
          <li><a href="#">News Source: <span>Source Name</span></a>
          <ul>
            <li><a href="#">Mashable</a></li>
            <li><a href="#">Reddit</a></li>
            <li><a href="#">Hacker News</a></li>
          </ul>
          </li>
        </ul>
      </nav>
      <div class="clearfix"></div>
    </section>`
  }
 
function renderArticle(article) {
	return `
		<section class="featured-image">
    	<img src="${article.image}" alt="" />
    </section>
    <section class="article-content">
    	<a href="#"><h3>${article.title}</h3></a>
      <h6>${article.content}</h6>
     </section>
     <section class="impressions">${article.social}</section>
     <div class="clearfix"></div>
	`
}

 function renderNews(data, into) {
    into.innerHTML = `
    <section id="main" class="wrapper">
			<article class="article">
			${state.articles.map((article)=>{
				return `${renderArticle(article)}`
			})}
      </article>
    </section>
    `
  }

  function renderLoading(data, into) {
    into.innerHTML = `${data.loading}`
  }
})()
