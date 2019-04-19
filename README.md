# Bamazon

Online shopping was never easier for customers and managers alike. 

Bamazon is an online shopping app with three levels of access and functionality. Customers can run the app and 

# Customer Access
# Liri -- Siri's Node-based Cousin

Want to hear a snippet of that song your best friend recommended? Liri can help. Want to know where your favorite band is playing? Put the question to Liri. Looking for more info about the latest Hollywood blockbuster - actors, language, Rotten Tomatoes score, and more? Nothing could be easier when you ask Liri.

Liri is a node-based app that looks up concert, song, and movie information and displays it in your terminal. Here's how it works:

# Concert Info

To get the latest tour schedule of your favorite group, type "node liri concert-this" followed by the name of the group, like The Black Keys or Mountain Goats or Parkay Courts. You'll see upcoming shows of your band - city, venue, and date - so you can jump over to Ticketmaster or SeatGeek and buy tickets. Here's what it looks like: ![Concert Search](/images/concert-the-black-keys.jpg). 

Liri tells you when the group you want to see isn't touring, too. ![Not On Tour](/images/concert-chuck-berry.jpg) 

# Spotify Song List

Liri digs deep into Spotify to give you up-to-date info on any song in the Spotify library. Simply type "node liri spotify-this-song" followed by the name of the song you're seeking, and Liri generates a list of songs and artists that match your search: ![Spotify Search Results](/images/spotify-results.jpg) If available, Liri will even give you a Preview URL for that song. 

Of course, Liri tells you if your search produces no hits so you can look for another tune. ![Spotify No Results](/images/spotify-not-found.jpg). 

# Movie Details

Liri can help you decide what to watch tonight (or any night!) through its movie search which pulls details on any film in the Online Movie Database library. Type "movie-this" and the name of the film you're considering, and Liri returns information on that film that helps you make a decision: IMDB rating, Rotten Tomatoes score, principal cast, a brief plot summary, and more. ![Movie results](/images/movie-search.jpg)

# Let Liri Decide

Can't decide what to do? Just ask Liri. Type "do-what-it-says," and Liri will recommend a movie, song, or concert.

# Observations

Liri was a fun app to develop. It's deceivingly complex, primarily because of the Spotify API, which required significant time to identify the information I was looking for in the results. Although the app runs in a different environment, the functionality and the code used in the Node app were essentially the same as various things we've alreadyin the bootcamp. 

Nevertheless, the homework allowed me to work with a number of new items, including:
- Using Node modules (in this project: Spotify, Axios, moment.js, and fs)
- Using process.argv to capture user input
- Using a switch instead of "if...else" statements, then wrapping that switch in a function
- Using "keys.js" to keep my Spotify key out of GitHub



