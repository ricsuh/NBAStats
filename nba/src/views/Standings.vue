<template>
<div class="container">
   <h1>Standings</h1>
   <div class="table-responsive">
      <table class="table table-hover">
         <thead>
            <tr>
               <th colspan="9">EASTERN CONFERENCE</th>
            </tr>
         </thead>
         <thead>
            <tr>
               <th scope="col">Rank</th>
               <th scope="col">Team</th>
               <th scope="col">W - L</th>
               <th scope="col">PCT</th>
               <th scope="col">Div</th>
               <th scope="col">Conf</th>
               <th scope="col">Home</th>
               <th scope="col">Away</th>
               <th scope="col">GB</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="team in eastStandings" :key="team.teamId">
               <td>{{ team.conference.rank }}</td>
               <td>{{ apiDict[Number(team.teamId)] }}</td>
               <td>{{ team.win }} - {{ team.loss }}</td>
               <td>{{ team.winPercentage }}</td>
               <td>{{ team.division.win}} - {{ team.division.loss }}</td>
               <td>{{ team.conference.win }} - {{ team.conference.loss }}</td>
               <td>{{ team.home.win }} - {{ team.home.loss }}</td>
               <td>{{ team.away.win }} - {{ team.away.loss }}</td>
               <td>{{ team.gamesBehind }}</td>
            </tr>
         </tbody>
      </table>
   </div>
      <div class="table-responsive">
      <table class="table table-hover">
         <thead>
            <tr>
               <th colspan="9">WESTERN CONFERENCE</th>
            </tr>
         </thead>
         <thead>
            <tr>
               <th scope="col">Rank</th>
               <th scope="col">Team</th>
               <th scope="col">W - L</th>
               <th scope="col">PCT</th>
               <th scope="col">Div</th>
               <th scope="col">Conf</th>
               <th scope="col">Home</th>
               <th scope="col">Away</th>
               <th scope="col">GB</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="team in westStandings" :key="team.teamId">
               <td>{{ team.conference.rank }}</td>
               <td>{{ apiDict[Number(team.teamId)] }}</td>
               <td>{{ team.win }} - {{ team.loss }}</td>
               <td>{{ team.winPercentage }}</td>
               <td>{{ team.division.win}} - {{ team.division.loss }}</td>
               <td>{{ team.conference.win }} - {{ team.conference.loss }}</td>
               <td>{{ team.home.win }} - {{ team.home.loss }}</td>
               <td>{{ team.away.win }} - {{ team.away.loss }}</td>
               <td>{{ team.gamesBehind }}</td>
            </tr>
         </tbody>
      </table>
   </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
   name: 'Standings',
   data() {
      return {
         eastStandings: [],
         westStandings: [],
         apiDict: {
            1: "Atlanta Hawks",
            2: "Boston Celtics",
            4: "Brooklyn Nets",
            5: "Charlotte Hornets",
            6: "Chicago Bulls",
            7: "Cleveland Cavaliers",
            8: "Dallas Mavericks",
            9: "Denver Nuggets",
            10: "Detroit Pistons",
            11: "Golden State Warriors",
            14: "Houston Rockets",
            15: "Indiana Pacers",
            16: "Los Angeles Clippers",
            17: "Los Angeles Lakers",
            19: "Memphis Grizzlies",
            20: "Miami Heat",
            21: "Milwaukee Bucks",
            22: "Minnesota Timberwolves",
            23: "New Orlean Pelicans",
            24: "New York Knicks",
            25: "Oklahoma City Thunder",
            26: "Orlando Magic",
            27: "Philadelphia 76ers",
            28: "Phoenix Suns",
            29: "Portland Trail Blazers",
            30: "Sacramento Kings",
            31: "San Antonio Spurs",
            38: "Toronto Raptors",
            40: "Utah Jazz",
            41: "Washington Wizards"
         }
      }
   },
   methods: {
      fetchStandings() {
         axios.get("https://api-nba-v1.p.rapidapi.com/standings/standard/2019",
            {
               headers: {
                  "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
                  "x-rapidapi-key": "cfb6a4fd7bmshf84cff832b6e524p13094cjsn45e16ba54f13"
               }
            }
         ).then(response => {
            let standings = response.data.api.standings
            let east = standings.filter(team => team.conference.name === "east")
            this.eastStandings = east.sort((a, b) => a.conference.rank - b.conference.rank)
            let west = standings.filter(team => team.conference.name === "west")
            this.westStandings = west.sort((a, b) => a.conference.rank - b.conference.rank)
         }).catch(error => {
            console.log(error)
         });
      },
      teamName(teamId) {
         let currTeam = this.$root.$data.teams.filter(team => team.id === Number(teamId))[0]
         // console.log(currTeam["team"])
         // return this.$root.$data.teams.filter(team => team.id === Number(teamId))
         return currTeam.team
      }
   },
   computed: {
   },
   created() {
      this.fetchStandings()
   },
}
</script>

<style scoped>
h1 {
   margin: 60px;
   text-align: center;
}

.table-responsive {
   margin-bottom: 70px;
}
</style>