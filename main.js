/**
 * Project 2: Feedr
 * ====
 *
 * See the README.md for instructions
 */

(function() {

	var container = document.querySelector('#container')
	var header = document.querySelector('header')
	var popUpContainer = document.querySelector('#temp')

	var state = {
		newsSource:["The Guardian","Reddit","Mashable"],
		mashableURL : "https://crossorigin.me/http://mashable.com/stories.json",
		redditURL : "https://www.reddit.com/top.json",
		guardURL : "https://content.guardianapis.com/search?api-key=2b9272f0-a832-4fe2-9fca-c004a4fa70a3",
	  loading :"<div id='pop-up' class='loader'></div>",
	 	articles:[],
	 	popReset:"",
	 	articleReset:function(){
	 		state.articles =[]
	 	}
	}

	function getMash(){
      renderLoading(state,container)
	  	fetch(state.mashableURL).then((response)=>{
	    return response.json()
	  	}).then((callback)=>{
				state.articleReset()
	  		callback.new.forEach((mash,index)=>{
	  			id = index
	  			state.articles.push({
	  				content:mash.excerpt,
	  				image:mash.image,
	  				link:mash.link,
	  				title:mash.display_title,
	  				social:mash.shares.total,
	  				id:id
	  			})
	  		})
				renderHeader("Mashable",header)
				renderNews(state,container)
	  		}).catch((error)=>{
	  		renderError(error,container)
			})
		}

	function getRed(){
      renderLoading(state,container)
	  	fetch(state.redditURL).then((response)=>{
	    return response.json()
		}).then((callback)=>{
	      state.articleReset()
	      callback.data.children.forEach((red,index)=>{
	      	id = index
	      	state.articles.push({
	      		content:red.data.post_hint,
	  				image:red.data.thumbnail,
	  				link:red.data.url,
	  				title:red.data.title,
	  				social:red.data.score,
	  				id:id

	      	})
	      })
				renderHeader("Reddit",header)
				renderNews(state,container)
	  	}).catch((error)=>{
	  		renderError(error,container)
			})

	  }

	function getGuard(){
      renderLoading(state,container)
	  	fetch(state.guardURL).then((response)=>{
	    return response.json()
		}).then((callback)=>{
	  		state.articleReset()
	  		callback.response.results.forEach((guard,index)=>{
	  			id = index
	  			state.articles.push({
	  				content:guard.type,
	  				image:"images/guardian.jpg",
	  				link:guard.webUrl,
	  				title:guard.webTitle,
	  				social:0,
	  				id:id

	  			})
	  		})
				renderHeader("The Guardian",header)
				renderNews(state,container)
	  	}).catch((error)=>{
	  		renderError(error,container)
			})
		}

	// renderHeader(state, header)
	// The functions below will call the api fetch and populate the state.articles array



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
			      <li><a href="#">News Source: ${data} <span></span></a>
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
			<article data-id="${article.id}" class="article">
				<section class="featured-image">
		    	<img src="${article.image}" alt="" />
		    </section>
		    <section class="article-content">
		    	<a href="#"><h3>${article.title}</h3></a>
		      <h6>${article.content}</h6>
		     </section>
		     <section class="impressions">${article.social}</section>
		     <div class="clearfix"></div>
		     <div id="temp"></div>
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
	}

// TO-DO add image to pop up

	function renderPop(article,into){
		into.innerHTML = `
			<div id="pop-up">
      <a href="#" class="close-pop-up">X</a>
      	<div class="wrapper">
        	<h1>${article.title}</h1>
        	<p>
        		${article.content}
        	</p>
        	<a href="${article.link}" class="pop-up-action" target="_blank">Read more from source</a>
					<img class="pop-source" src="${article.image}" alt="" />
      	</div>
    	</div>
    `

	}

	// Event listeners below

	delegate('header', 'click', 'li',(event) => {
		var linkClicked = event.delegateTarget.id
		console.log(linkClicked)
		if(linkClicked == "mash"){getMash()}
		else if(linkClicked == "red"){getRed()}
		else if(linkClicked == "guard"){getGuard()}
	})

	delegate('#container', 'click', '.article',(event) => {
		var popId = event.delegateTarget.getAttribute("data-id")
		var closePop = event.delegateTarget.querySelector(".close-pop-up")
		state.articles.forEach((article)=>{
			var popUp = document.querySelector('#temp')
			if (article.id == popId){
				renderPop(article,popUp)
			}
			if(closePop){
				popUp.innerHTML = ""
			}
		})
	})

	getGuard()
	// Calls an initial news source for when page first opens

})()
