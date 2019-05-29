function myFunction1() {
    document.getElementById("Venusaur").innerHTML = "Health: 100 <br> Atack: 50 <br> Defense: 60";
  }
  function myFunction2() {
    document.getElementById("Jigglypuff").innerHTML = "Health: 74 <br> Atack: 75 <br> Defense: 89";
  }
  function myFunction3() {
    document.getElementById("Topegi").innerHTML = "Health: 70 <br> Atack: 50 <br> Defense: 20";
  }
  
  function myFunction4() {
    document.getElementById("Charmander").innerHTML = "Health: 40 <br> Atack: 70 <br> Defense: 34<br>";
  }
  $(".scene").hide();
  $("#game_over1").hide();
  $("#fight").hide();
  
  
  var player = {};
  var opponent = {};
  var opponent_count = 0;
  var creatures = ["Snolaf", "Picachu", "Jigglypuff", "Eevee", "Psyduck"];
  var imgPath = ["https://i.kinja-img.com/gawker-media/image/upload/s--NQoOebDt--/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/784828513967302289.jpg","https://cdn.animenewsnetwork.com/thumbnails/max1000x1500/cms/interest/89083/pikachu_2.jpg", 
                 "https://i.kinja-img.com/gawker-media/image/upload/s--NQoOebDt--/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/784828513967302289.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyUqGAn2MBViqWEdvNkO8I1Vepx_L7ZGHRCiMhRzm3LwR8xfHm",
                 
                 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSqDi7O172lKjF8w3KuPI2Ogp6wG_0bksmzB8eCK-OPPwFHjx0"];
  
  function start(){
    var name = document.getElementById("character_name").value;
   // document.getElementById("character_image").value;
    var species = document.getElementById("character_species").value;
    if(!name||!species){
      alert('Please, fill everything.');
    }
    else{
    var health = Math.floor((Math.random() * 50) + 41);
    var attack = Math.floor((Math.random() * 50) + 41);
    var defense = Math.floor((Math.random() * 50) + 41);
    
    player = {
      name: name,
      health: health,
      attack: attack,
      defense: defense,
    };
      
   
    $(".n").html(name);
    $(".s").html(species);
    // $(".c").html(picture);
    $(".h").html(health);
    $(".a").html(attack);
    $(".d").html(defense);
    $(".chooseCharacter").hide();
    $(".scene").show();
    $(".battle").hide();
    }
  }
  
  var img = new Image();
  var div = document.getElementById('opponent_image');
  
  function start_battle(){
    $(".random_box").hide();
    $(".random_box_result").hide();
    $(".random_box_result_number").hide();
    $("#fight").show();
    document.getElementById("fight").disabled = false;
    $("#start_battle").hide();
    $(".opponent_health_damage").html("");
    
    $(".h").css("color", "pink");
    $(".a").css("color", "pink");
    $(".d").css("color", "pink");
    
    /*$(".n").html(player.name);
    $(".s").html(player.species);
    $(".h").html(player.health);
    $(".a").html(player.attack);
    $(".d").html(player.defense);*/
    
    var opponent_health = Math.floor((Math.random() * 50) + 21);
    var opponent_attack = Math.floor((Math.random() * 50) + 21);
    var opponent_defense = Math.floor((Math.random() * 50) + 21);
    
    var opponent_count_number = opponent_count +1;
    var z = Math.floor(Math.random()*4);
    var opponent_species = creatures[z];
    
    $(".opponent_name").html(opponent_species);
  
    img.onload = function() {
      div.appendChild(img);
    };
  
    img.src = imgPath[z];
    img.style.width = "100%";
    
    $(".opponent_health").html("Health: " + opponent_health);
    $(".opponent_attack").html("Attack: " + opponent_attack);
    $(".opponent_defense").html("Defense: " + opponent_defense);
    
    opponent = {
      health: opponent_health,
      attack: opponent_attack,
      defense: opponent_defense,
    };
    
    $(".battle").show();
  }
  
  function fight(){
    var playerisattacking_number = (100/(player.attack + opponent.defense))*player.attack;
    var opponentisattacking_number = (100/(opponent.attack + player.defense))*opponent.attack;
    var player_attack_number = Math.random() * 100;
    var opponent_attack_number = Math.random() * 100;
    
    if(playerisattacking_number > player_attack_number){
      var opponent_damage = Math.floor((player.attack/2.5)+(Math.random() * player.attack/5));
    }
    else{
      var opponent_damage = Math.floor(Math.random() * (player.attack/10));
    }
    
    if(opponentisattacking_number > opponent_attack_number){
      var player_damage = Math.floor((opponent.attack/2.5)+(Math.random() * opponent.attack/5));
    }
    else{
      var player_damage = Math.floor(Math.random() * (opponent.attack/10));
    }
    
    player.health -= player_damage;
    opponent.health -= opponent_damage;
    
    if(player.health <= 0){
      document.getElementById("fight").disabled = true;
      $(".h").html("0");
      $(".player_health_damage").html(" -" + player_damage);
      
      function game_over(){
        $(".chooseCharacter").hide();
        $("#start_battle").hide();
        $(".scene").hide();
        $(".your_score").html("Your Score is " + opponent_count + ".");
        $("#game_over1").show();
      }
      setTimeout(game_over, 2000);
    }
    
    if(player.health <= 0 && opponent.health <= 0){
      document.getElementById("fight").disabled = true;
      $(".h").html("0");
      $(".player_health_damage").html(" -" + player_damage);
      $(".opponent_health").html("Health: 0");
      $(".opponent_health_damage").html(" -" + opponent_damage);
      
      function game_over(){
        $(".chooseCharacter").hide();
        $("#start_battle").hide();
        $(".scene").hide();
        $(".your_score").html("Your Score is " + opponent_count + ".");
        $("#game_over1").show();
      }
      setTimeout(game_over, 2000);
    }
    
    else if(opponent.health <= 0){
      document.getElementById("fight").disabled = true;
      player.health -= player_damage;
      $(".h").html(player.health);
      $(".player_health_damage").html(" -" + player_damage);
      $(".opponent_health").html("Health: 0");
      $(".opponent_health_damage").html(" -" + opponent_damage);
      opponent_count += 1;
      $("#img").remove();
      
      /*function refresh(){
        start_battle();
      }
      setTimeout(refresh, 2000);*/
      function randombox(){
        $(".battle").hide();
        $(".random_box").show();
      }
      setTimeout(randombox, 3000);
    }
    else if(player.health > 0 && opponent.health > 0){
      $(".h").html(player.health);
      $(".opponent_health").html("Health: " + opponent.health);
      $(".player_health_damage").html(" -" + player_damage);
      $(".opponent_health_damage").html(" -" + opponent_damage); 
    }
  }
  
  function random_box_yes(){
    function refresh(){
      start_battle();
    }
    
    var r = Math.floor((Math.random()*3)+1);
    var p = Math.floor((Math.random()*2)+1);
    $(".random_box").hide();
    $(".random_box_result").show();
    
    var random_box_number = (Math.floor((Math.random()*(player.health/5))+1));
    
    if(r===1){
      if(p===1){
        $(".random_box_result").html("You found a healing elixir.");
        player.health += random_box_number 
        $(".random_box_result_number").html("Health: +" + random_box_number);
        $(".random_box_result_number").css("color", "#A4DDA0");
        $(".random_box_result_number").show();
        $(".h").html(player.health);
        $(".h").css("color", "#A4DDA0");
        setTimeout(refresh, 5000);
      }
      else{
        $(".random_box_result").html("You drank the wrong elixir.");
        player.health -= random_box_number 
        $(".random_box_result_number").html("Health: -" + random_box_number);
        $(".random_box_result_number").css("color", "#FE8484");
        $(".random_box_result_number").show();
        $(".h").html(player.health);
        $(".h").css("color", "#FE8484");
        setTimeout(refresh, 5000);
      }
    }
    else if(r===2){
      if(p===1){
        $(".random_box_result").html("You found a magical sword.");
        player.attack += random_box_number 
        $(".random_box_result_number").html("Attack: +" + random_box_number);
        $(".random_box_result_number").css("color", "#A4DDA0");
        $(".random_box_result_number").show();
        $(".a").html(player.attack);
        $(".a").css("color", "#A4DDA0");
        setTimeout(refresh, 5000);
      }
      else{
        $(".random_box_result").html("You lost your weapons.");
        player.attack -= random_box_number 
        $(".random_box_result_number").html("Attack: -" + random_box_number);
        $(".random_box_result_number").css("color", "#FE8484");
        $(".random_box_result_number").show();
        $(".a").html(player.attack);
        $(".a").css("color", "#FE8484");
        setTimeout(refresh, 5000);
      }
    }
    else{
      if(p===1){
        $(".random_box_result").html("You found a magical shield.");
        player.defense += random_box_number 
        $(".random_box_result_number").html("Defense: +" + random_box_number);
        $(".random_box_result_number").css("color", "#A4DDA0");
        $(".random_box_result_number").show();
        $(".d").html(player.defense);
        $(".d").css("color", "#A4DDA0");
        setTimeout(refresh, 5000);
      }
      else{
        $(".random_box_result").html("You lost your armor.");
        player.defense -= random_box_number 
        $(".random_box_result_number").html("Defense: -" + random_box_number);
        $(".random_box_result_number").css("color", "#FE8484");
        $(".random_box_result_number").show();
        $(".d").html(player.defense);
        $(".d").css("color", "#black");
        setTimeout(refresh, 5000);
      }
    }
  }
  
  function random_box_no(){
    start_battle();
  }