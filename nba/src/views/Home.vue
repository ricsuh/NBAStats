<template>
<div class="container">
   <h1>Players</h1>
   <div class="search">
      <form class="pure-form">
         <i class="fas fa-search"></i>
         <input id="searchInput" v-model="searchText" placeholder="Search for a player"/>
      </form>
   </div>
   <p><em>*Images could not be found for some players.</em></p>
   <Players :players="players" />
</div>
</template>

<script>
import Players from "../components/Players.vue"

export default {
   name: 'Home',
   components: {
      Players
   },
   data() {
      return {
         searchText: '',
      }
   },
   methods: {

   },
   computed: {
      players() {
         return this.$root.$data.players.filter(player => {
            return player.firstName.toLowerCase().search(this.searchText) >= 0 || 
                  player.lastName.toLowerCase().search(this.searchText) >= 0
         });
      },
   }
}
</script>

<style scoped>
h1 {
   text-align: center;
   margin: 60px;
}

.search {
   border: 1px solid #ccc;
   border-radius: 4px;
   width: 50%;
   margin: 30px auto;
}

form {
   display: table;
   width: 100%;
}

i {
   display: table-cell;
   padding-left: 10px;
   width: 1px;
}

input {
   display: table-cell;
   font-size: 20px;
   border: none !important;
   box-shadow: none !important;
   width: 100%;
   height: 40px;
}
</style>
