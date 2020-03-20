<template>
<div class="container">
   <div class="players">
      <div class="player" v-for="player in players" :key="player.id">
         <div class="image">
            <img :src="'/images/players/' + player.image">
         </div>
         <div class="info">
            <h3>{{ player.firstName }} {{ player.lastName }}</h3>
            <p>{{ player.team }}</p>
         </div>
      </div>
   </div>
</div>
</template>

<script>
export default {
   name: 'Players',
   props: {
      players: Array
   }
}
</script>

<style scoped>
.container {
   display: flex;
   align-items: center;
   justify-content: center;
}

.players {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
}

.player {
   margin: 10px;
   margin-top: 50px;
   width: 200px;
}

.image img {
   border: 1px solid #333;
   height: 200px;
   width: 200px;
   object-fit: cover;
}

.info {
   text-align: center;
}

.info h3 {
   margin-top: 5px;
   margin-bottom: 0;
   font-size: 20px;
}

.info p {
   margin: 0;
}
</style>