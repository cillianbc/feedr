/**
 * Project 2: Feedr
 * ====
 *
 * See the README.md for instructions
 */

(function() {
	delegate('#container', 'click', '.article',(event) => {
  renderPop()
})
  


	var container = document.querySelector('#container')
	var header = document.querySelector('header')

	var state = {
		newsSource:["The Guardian","Reddit","Mashable","Chuck"],
		chuckURL:"http://api.icndb.com/jokes/random/10",
		mashableURL : "https://crossorigin.me/http://mashable.com/stories.json",
		redditURL : "https://www.reddit.com/top.json",
		guardURL : "http://content.guardianapis.com/search?api-key=2b9272f0-a832-4fe2-9fca-c004a4fa70a3",
	  loading :"<div id='pop-up' class='loader'></div>",
	 	articles:[],
	 	articleReset:function(){
	 		state.articles.forEach((el)=>{
	 			el = ""
	 		})
	 	}
	}
		
	 

	function getChuck(){
	  	fetch(state.chuckURL).then((response)=>{
	    return response.json()
	  }).then((callback)=>{
	  		state.articleReset()
	      callback.value.forEach((joke)=>{
	  	  	state.articles.push({
	  	  		content:joke.joke,
	  	  		image:"images/chuck.jpg",
	  	  		social:0,
	  	  		title:"Chuck Jokes"})
	  		})
	  		renderNews(state,container)
	  	}).catch((error)=>{
	  		renderError(error,container)
			})
	  }

	function getMash(){
	  	fetch(state.mashableURL).then((response)=>{
	    return response.json()
	  }).then((callback)=>{
	  		state.articleReset()
	  		callback.new.forEach((mash)=>{
	  			state.articles.push({
	  				content:mash.excerpt,
	  				image:mash.image,
	  				link:mash.link,
	  				title:mash.display_title,
	  				social:mash.shares.total
	  			})
	  			renderNews(state,container)
	  		})
	  	}).catch((error)=>{
	  		renderError(error,container)
			})

	  }

	function getRed(){
	  	fetch(state.redditURL).then((response)=>{
	    return response.json()
		}).then((callback)=>{
	      state.articleReset()
	      callback.data.children.forEach((red)=>{
	      	state.articles.push({
	      		content:red.data.post_hint,
	  				image:red.data.thumbnail,
	  				link:red.data.permalink,
	  				title:red.data.title,
	  				social:red.data.score

	      	})
	      	renderNews(state,container)
	      })
	  	}).catch((error)=>{
	  		renderError(error,container)
			})

	  }

	function getGuard(){
	  	fetch(state.guardURL).then((response)=>{
	    return response.json()
		}).then((callback)=>{
	  		articleReset()
	  		callback.response.results.forEach((guard)=>{
	  			state.articles.push({
	  				content:guard.type,
	  				image:"images/guardian.jpg",
	  				link:guard.webUrl,
	  				title:guard.webTitle,
	  				social:0
	  			})
	  			renderNews(state,container)
	  		})
	  	}).catch((error)=>{
	  		renderError(error,container)
			})
		}

	renderHeader(state, header)
	// The functions below will call the api fetch and populate the state.articles array
	//   // getGuard()
	//   // getRed()
	getMash()
	//   // getChuck()



	 function renderHeader(data, into) {
	 	into.innerHTML = `
	 		<section class="wrapper">
		    <a href="index.html"><h1>Feedr</h1></a>
		    <nav>
			    <section id="search">
			      <input type="text" name="name" value="">
			      <div id="search-icon"><img src="images/search.png" alt="" /></div>
			    </section>
			    <ul>
			      <li><a href="#">News Source: <span></span></a>
					    <ul>
						    <li id="mash"><a href="#">Mashable</a></li>
						    <li id="red"><a href="#">Reddit</a></li>
						    <li id="guard"><a href="#">The Guardian</a></li>
					    </ul>
			    	</li>
			    </ul>
		    </nav>
		    <div class="clearfix"></div>
	    </section>
	  `
	}
	 
	function renderArticle(article) {
		return `
			<article class="article">
				<section class="featured-image">
		    	<img src="${article.image}" alt="" />
		    </section>
		    <section class="article-content">
		    	<a href="#"><h3>${article.title}</h3></a>
		      <h6>${article.content}</h6>
		     </section>
		     <section class="impressions">${article.social}</section>
		     <div class="clearfix"></div>
	   </article>
		`
	}

	function renderNews(data, into) {
		into.innerHTML = `
	    <section id="main" class="wrapper">
				${state.articles.map((article)=>{
					return `${renderArticle(article)}`
				}).join("")}
	    </section>
	  `
	}

	function renderLoading(data, into) {
		into.innerHTML = `${data.loading}`
	}

	function renderError(err,into){
	 into.innerHTML = `
		<div id="pop-up">
	  	<a href="#" class="close-pop-up">X</a>
	    <div class="wrapper">
	    	<h3>Sorry We couldn't load your requested news, please try again</h3>
	    </div>
	  </div>
	 `
	 console.log(err)
	}

	function renderPop(article){
		return `
			<div id="pop-up">
      <a href="#" class="close-pop-up">X</a>
      	<div class="wrapper">
        	<h1>Temp</h1>
        	<p>
        		Temp
        	</p>
        	<a href="Temp" class="pop-up-action" target="_blank">Read more from source</a>
      	</div>
    	</div>
    `

	}


delegate('#container', 'click', '.article',(event) => {
	console.log(event.delegateTarget)
})

})()



