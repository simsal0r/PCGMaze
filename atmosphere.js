function getAtmosphere(atmosphere, sound, item) {
    if(atmosphere == "horror" && sound == "horror") {
        switch(item) {
            case "font-family": return "scaryFont"; break;
            case "chest_items": return ["zoom_out", "jump_scare", "move_to_start", "rotate_maze", "light_darker", "increase_time", "decrease_time", "random_teleportation"]; break;
            case "chest_probabilities": return [0.3, 0.07,          0.03,           0.13,           0.07,           0.15,           0.15,           0.1]; break;
            case "chest_texture": return THREE.ImageUtils.loadTexture('./assets/chest.jpg'); break;
            case "head_texture": return THREE.ImageUtils.loadTexture('./assets/hair.jpg'); break;
            case "player_texture": return THREE.ImageUtils.loadTexture('./assets/cloak.jpg'); break;
            case "ground_texture": return THREE.ImageUtils.loadTexture('./assets/dark_ground2.jpg'); break;
            case "wall_texture": return THREE.ImageUtils.loadTexture('./assets/hedge.jpg'); break;
            case "background_music": return "assets/background.mp3"; break;
            case "death_sound": return "assets/gong.wav"; break;
            case "end_sound": return "assets/ghastlyboom.mp3"; break;
            case "step_sound": return "assets/10-2 closeEnd.wav"; break;
            case "light_intensity": return 0.5; break;
            case "enemy_texture": return THREE.ImageUtils.loadTexture('./assets/ghost.jpg');
        }
    }
    else if(atmosphere == "happy" && sound == "happy") {
        switch(item) {
            case "font-family": return "happyFont"; break;
            case "chest_items": return ["zoom_out", "jump_happy", "move_to_start", "rotate_maze", "increase_time", "decrease_time", "random_teleportation"]; break;
            case "chest_probabilities": return [0, 1,              0,           0,           0,           0,0]; break;
            case "chest_texture": return THREE.ImageUtils.loadTexture('./assets/chest1.jpg'); break;
            case "head_texture": return THREE.ImageUtils.loadTexture('./assets/hairHappy.jpg'); break;
            case "player_texture": return THREE.ImageUtils.loadTexture('./assets/cloakHappy.png'); break;
            case "ground_texture": return THREE.ImageUtils.loadTexture('./assets/ground1.jpg'); break;
            case "wall_texture": return THREE.ImageUtils.loadTexture('./assets/flowerHedge.jpg'); break;
            case "background_music": return "assets/payday.mp3"; break;
            case "light_intensity": return 1; break;
            case "death_sound": return "assets/jingle_fail.wav"; break;
            case "end_sound": return "assets/shipsbell.wav"; break;
            case "step_sound": return "assets/piano1.wav"; break;
        }
    }
    else if(atmosphere == "happy" && sound == "horror") {
        switch(item) {
            case "font-family": return "happyFont"; break;
            case "chest_items": return ["zoom_out", "jump_happy", "move_to_start", "rotate_maze", "increase_time", "decrease_time", "random_teleportation"]; break;
            case "chest_probabilities": return [0, 1,              0,           0,           0,           0,0]; break;
            case "chest_texture": return THREE.ImageUtils.loadTexture('./assets/chest1.jpg'); break;
            case "head_texture": return THREE.ImageUtils.loadTexture('./assets/hairHappy.jpg'); break;
            case "player_texture": return THREE.ImageUtils.loadTexture('./assets/cloakHappy.png'); break;
            case "ground_texture": return THREE.ImageUtils.loadTexture('./assets/ground1.jpg'); break;
            case "wall_texture": return THREE.ImageUtils.loadTexture('./assets/flowerHedge.jpg'); break;
            case "light_intensity": return 1; break;
            case "background_music": return "assets/background.mp3"; break;
            case "death_sound": return "assets/gong.wav"; break;
            case "end_sound": return "assets/ghastlyboom.mp3"; break;
            case "step_sound": return "assets/10-2 closeEnd.wav"; break;
        }
    }
    else if(atmosphere == "horror" && sound == "happy") {
        switch(item) {
            case "font-family": return "scaryFont"; break;
            case "chest_items": return ["zoom_out", "jump_scare", "move_to_start", "rotate_maze", "light_darker", "increase_time", "decrease_time", "random_teleportation"]; break;
            case "chest_probabilities": return [0.3, 0.07,          0.03,           0.13,           0.07,           0.15,           0.15,           0.1]; break;
            case "chest_texture": return THREE.ImageUtils.loadTexture('./assets/chest.jpg'); break;
            case "head_texture": return THREE.ImageUtils.loadTexture('./assets/hair.jpg'); break;
            case "player_texture": return THREE.ImageUtils.loadTexture('./assets/cloak.jpg'); break;
            case "ground_texture": return THREE.ImageUtils.loadTexture('./assets/dark_ground2.jpg'); break;
            case "wall_texture": return THREE.ImageUtils.loadTexture('./assets/hedge.jpg'); break;
            case "background_music": return "assets/payday.mp3"; break;
            case "death_sound": return "assets/jingle_fail.wav"; break;
            case "end_sound": return "assets/shipsbell.wav"; break;
            case "step_sound": return "assets/piano1.wav"; break;
            case "light_intensity": return 0.5; break;
            case "enemy_texture": return THREE.ImageUtils.loadTexture('./assets/ghost.jpg');
        }
    }
}