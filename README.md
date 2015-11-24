



Imagining Ancient Corinth

Manifesto

































Drupal
Headless Drupal
Entity Types
Database
Services
Views
Modules
Management
		
Reclaim Hosting
File Structure

HTML
Bootstrap
Dynamic Creation

CSS
App.css
Bootstrap
Responsiveness

JS
App.js
Leaflet - Mapping Application
Querying Drupal






Drupal - ImaginingAncientCorinth.com/cms

Drupal is the content management system chosen for this project.  Drupal's main strengths lie in the power and flexibility of its back-end; its primary value to users is its ability display complex content models.  However, the front-end of Drupal does not fit our needs.  The scope of this project was outside the realm of a Drupal website. To deal with this issue, we implemented Headless Drupal.  In this situation, Drupal stores the data and visitors will not interact with Drupal directly. Rather, visitors will be taken to a website developed with our Javascript framework, Bootstrap. This implementation gives us the flexibility to utilize Drupal’s enhanced content management system and the ability to create a front end that satisfies our needs. 
The current implementation of Drupal includes 2 entity types, Passage and Media. These entities are separate from each other in Drupal’s database.  The intent behind this decision was that a single piece of media could be referenced by several passages.  This allows the normalization of our database.  Passages are the culmination of the content that we would like to show our visitors. Passages contain a title, passage number, story, passage content, glossed words, pre-reading, post-reading, and coordinates for the map.  Also, the passage entity references the media entity. The media entity contains a title, description, credits, and a file. A third entity will need to be added in the future. This entity will contain Culture Essays and their relevant data.
Querying Drupal does not include calls to tables in a database.  Instead Drupal utilizes Services and Views. Services are a solution for building API's so that external clients can communicate with Drupal.  Services allow our website to pull in information from Drupal.  However, the services are unaware of the information they need to query from drupal. Views solve that problem. Views allow the user to specify which information they want to query from the database. The views are returned in JSON format to the website via services.  In our case there are two views. The first view, passageNumber, gathers all of the passages and grabs their passage number and story.  The passage numbers allow the user to transverse from one passage to another in an ordered fashion.  The story field allows the scripting to build a dynamic table of contents.  The second view, Rest, returns all of the relevant information for a certain passage. This contains the passage entity that we would like to present to a user.  This view returns a single passage.  In the Javascript, the view is passed a passage number, which the database can then query by the passage number.  Services and views take data stored in Drupal and bring them to the user’s browser.
Management in Drupal is done with an admin account.  The current admin account username is go0ioc and the password is IAC2015.  Most changes will likely be done in the structure and configuration tabs.  In Structure, one can edit Content Types (entities) and Views. This will allows a user to change what information can be stored and what can be queried.  In Configuration the admin can change other parts of the backend such as users, user interface and settings.

Reclaim Hosting
ReclaimHosting.com is the hosting website used for this project.  The domain is owned by Brooke Bergantzel.  She will be able to create an account for any user. Once the user has an account and is signed-in to the website, navigate to cPanel. Inside cPanel, go to File Manager.  This is the file explorer for websites associated with the Reclaim Hosting account.  To navigate to this project’s files, click the folder www.ImaginingAncientCorinth.com. This folder contains all of the files associated with the website. There are two important files, index.html and corinth-geo.js.  Index.html is the first page loaded when a visitor comes to the website.  The other file, corinth-geo.js, is a GeoJSON file of all of mapped shapes on the map.  One can also view four folders. Assets contains CSS, IMG, and JS.  This is where one can find the main CSS (app.css) and JS (app.js) files associated with the website. The Leaflet folder contains JS and CSS files for using leaflet.  cgi-bin and cms contain data for Drupal.








HTML - JS & CSS

The page is displayed when a user visits the website is a HTML document.  This document utilizes the JS frameworks Bootstrap and JQuery.  It also loads in a JS file, app.js, and a CSS file, app.css. Bootstrap was the framework chosen for this project because it gives the website responsiveness and a sleek, stylish display.  The HTML document does contain some important JS scripting.  The map is created in the HTML document.  It is populated with the GeoJSON file. Secondly, the first query of Drupal occurs in HTML document.  The first query is the passageNumbers query.  This builds a JSON object that contains an object for every passage.  These passage objects will have a passage number and a story.  The passage numbers allow the website to keep track of which passage the user is on, along with the previous and next passages. Story is also contained so a Table of Contents can be dynamically created.  
Once the first query is completed, the script checks local storage. If local storage exists, it will then do a query of Drupal to grab the passage that the user was last on.  If local storage does not exist, the website will load the very first passage in the database. This works because the passages are sorted and returned in ascending order. 
The CSS for the website is contained in the app.css file.  The CSS uses some user code, while also using Bootstrap styling.  The CSS is not in a normalized Bootstrap form at some points.  However, it should be  responsive.
The code was tested on Chrome and Firefox.  It may not run or respond correctly on other browsers.
