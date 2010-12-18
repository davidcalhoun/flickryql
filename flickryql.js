var flickrYql = (function() {
  var container, username, size, query, results;
  
  var getImageHTML = function(obj) {
    // Default values
    obj.size || (obj.size = 's');  // default to thumbnail size
    
    console.log(obj);
    if(obj.farm && obj.server && obj.id && obj.secret) {
      return '<a href="http://www.flickr.com/photos/' + username + '/' + obj.id + '/"><img src="http://farm' + obj.farm + '.static.flickr.com/' + obj.server + '/' + obj.id + '_' + obj.secret + '_' + obj.size + '.jpg' + '"></a>';
    } else {
      return '';
    }
  };
  
  var callback = function(obj) {
    var photos, i, len, outputHTML;
    
    photos = obj.query.results.photo;
    outputHTML = '';
    
    for(i=0, len=photos.length; i<len; i++) {
      outputHTML += getImageHTML(photos[i]); 
    }
    
    container.innerHTML = outputHTML;
  };
  
  var init = function(config) {
    container = document.getElementById(config.containerID);
    username = config.username;
    results = config.results || 10;
    
    if(container && username) {
      // JSONP
      var script;
      
      query = 'select * from flickr.photos.search where user_id in (select id from flickr.people.findbyusername where username="' + username + '") limit ' + results;

      script = document.createElement('script');
      script.src = 'http://query.yahooapis.com/v1/public/yql?format=json&callback=flickrYql.callback&q=' + escape(query);

      document.getElementsByTagName('script')[0].parentNode.insertBefore(script);
    };
  };
  
  return {
    init: init,
    callback: callback
  }
})();