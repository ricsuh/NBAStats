<template>
<div class="container">
   <h1>Teams</h1>
   <div class="teams">
      <div class="division">
         <button class="btn btn-dark btn-lg" @click="showAtlantic = !showAtlantic">
            <strong>ATLANTIC</strong>
         </button>
         <div class="team" v-for="team in atlanticTeams" :key="team.id" v-show="showAtlantic">
            <a @click="select(team.team)" href="#">
               <img :src="'/images/teams/'+team.image">
               <p>{{ team.team }}</p>
            </a>
         </div>
      </div>
      <div class="division">
         <button class="btn btn-dark btn-lg" @click="showPacific = !showPacific">
            <strong>PACIFIC</strong>
         </button>
         <div class="team" v-for="team in pacificTeams" :key="team.id" v-show="showPacific">
            <a @click="select(team.team)" href="#">
               <img :src="'/images/teams/'+team.image">
               <p>{{ team.team }}</p>
            </a>
         </div>
      </div>
      <div class="division">
         <button class="btn btn-dark btn-lg" @click="showCentral = !showCentral">
            <strong>CENTRAL</strong>
         </button>
         <div class="team" v-for="team in centralTeams" :key="team.id" v-show="showCentral">
            <a @click="select(team.team)" href="#">
               <img :src="'/images/teams/'+team.image">
               <p>{{ team.team }}</p>
            </a>
         </div>
      </div>
      <div class="division">
         <button class="btn btn-dark btn-lg" @click="showSouthwest = !showSouthwest">
            <strong>SOUTHWEST</strong>
         </button>
         <div class="team" v-for="team in southwestTeams" :key="team.id" v-show="showSouthwest">
            <a @click="select(team.team)" href="#">
               <img :src="'/images/teams/'+team.image">
               <p>{{ team.team }}</p>
            </a>
         </div>
      </div>
      <div class="division">
         <button class="btn btn-dark btn-lg" @click="showSoutheast = !showSoutheast">
            <strong>SOUTHWEST</strong>
         </button>
         <div class="team" v-for="team in southeastTeams" :key="team.id" v-show="showSoutheast">
            <a @click="select(team.team)" href="#">
               <img :src="'/images/teams/'+team.image">
               <p>{{ team.team }}</p>
            </a>
         </div>
      </div>
      <div class="division">
         <button class="btn btn-dark btn-lg" @click="showNorthwest = !showNorthwest">
            <strong>NORTHWEST</strong>
         </button>
         <div class="team" v-for="team in northwestTeams" :key="team.id" v-show="showNorthwest">
            <a @click="select(team.team)" href="#">
               <img :src="'/images/teams/'+team.image">
               <p>{{ team.team }}</p>
            </a>
         </div>
      </div>
   </div>
   <p><em>* Images could not be found for some players.</em></p>
   <h2>{{ team }}</h2>
   <Players :players="players" />
</div>
</template>

<script>
import Players from "../components/Players.vue"

export default {
   name: 'Teams',
   components: {
      Players
   },
   data() {
      return {
         team: '',
         showAtlantic: false,
         showPacific: false,
         showCentral: false,
         showSouthwest: false,
         showSoutheast: false,
         showNorthwest: false,
      }
   },
   computed: {
      players() {
         return this.$root.$data.players.filter(player => player.team === this.team)
      },
      atlanticTeams() {
         return this.$root.$data.teams.filter(team => team.division === "Atlantic")
      },
      pacificTeams() {
         return this.$root.$data.teams.filter(team => team.division === "Pacific")
      },
      centralTeams() {
         return this.$root.$data.teams.filter(team => team.division === "Central")
      },
      southwestTeams() {
         return this.$root.$data.teams.filter(team => team.division === "Southwest")
      },
      southeastTeams() {
         return this.$root.$data.teams.filter(team => team.division === "Southeast")
      },
      northwestTeams() {
         return this.$root.$data.teams.filter(team => team.division === "Northwest")
      }
   },
   methods: {
      select(team) {
         this.team = team
      }
   }
}
</script>

<style scoped>
h1 {
   text-align: center;
   margin: 60px;
}

h2 {
   text-align: center;
   margin-top: 60px;
}

.teams {
   margin: 20px auto;
   display: grid;
   grid-template: auto auto auto / 1fr 1fr 1fr;
   grid-column-gap: 10px;
   grid-row-gap: 30px;
}

.division {
   text-align: center;
}

.division p {
   margin: 0;
}

.division button {
   margin-bottom: 10px;
}

.teams {
   margin-bottom: 0;
}

.team a {
   display: flex;
   align-items: center;
   justify-content: center;
}

/* ------------------------------------------------------------------*/

/* Mobile Styles */
@media only screen and (max-width: 650px) {
   .teams {
      margin: 20px auto;
      display: grid;
      grid-template: auto / 1fr;
      grid-column-gap: 10px;
      grid-row-gap: 30px;
   }
}

/* Tablet Styles */
@media only screen and (min-width: 651px) and (max-width: 900px) {

}

/* Desktop Styles */
@media only screen and (min-width: 901px) {

}
</style>