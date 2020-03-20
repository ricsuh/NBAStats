<template>
<div id="app">

   <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">NBA for Dummies</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
         <b-navbar-nav class="ml-auto">
            <router-link to="/">
               <b-nav-item href="/">Players</b-nav-item>
            </router-link>
            <router-link to="/teams">
               <b-nav-item href="/teams">Teams</b-nav-item>
            </router-link>
            <router-link to="/standings">
               <b-nav-item href="/standings">Standings</b-nav-item>
            </router-link>
         </b-navbar-nav>
      </b-collapse>
   </b-navbar>

   <div class="content">
      <router-view/>
   </div>

   <div class="footer">
      <hr/><br/><br/>
      <a class="link" href="https://github.com/ercsuh/NBAStats">
         <img src='/images/github-logo.svg' width='50'/><br/>MY GITHUB
      </a>
      <br/><br/>
      <a class="link" href="https://rapidapi.com/api-sports/api/api-nba">API-NBA</a><br/>
      CS 260: Creative Project 3
   </div>

</div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.content {
   margin: 70px;
}

.footer {
   clear: both;
   bottom:0;
   text-align: center;
   padding: 20px;
   padding-bottom: 100px;
}

.link, .link:hover {
   color: black;
}

/* On screens that are less than 700px wide, make the sidebar into a topbar */
@media screen and (max-width: 700px) {

}

/* On screens that are less than 400px, display the bar vertically, instead of horizontally */
@media screen and (max-width: 400px) {
   .content {
      margin: 30px;
   }

}
</style>
