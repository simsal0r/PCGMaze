function getAtmosphere(atmosphere, item) {
    if(atmosphere == "horror") {
        switch(item) {
            case "font-family": return "scaryFont"; break;
            case "chest_items": return ["zoom_out", "jump_scare", "move_to_start", "rotate_maze", "light_darker", "increase_time", "decrease_time", "random_teleportation"]; break;
            case "chest_probabilities": return [0.3, 0.04, 0.05, 0.14, 0.05, 0.16, 0.16, 0.1]; break;
            case "chest_texture": return THREE.ImageUtils.loadTexture('./assets/chest.jpg'); break;
            case "head_texture": return THREE.ImageUtils.loadTexture('./assets/hair.jpg'); break;
            case "player_texture": return THREE.ImageUtils.loadTexture('./assets/cloak.jpg'); break;
            case "ground_texture": return THREE.ImageUtils.loadTexture('./assets/dark_ground2.jpg'); break;
            case "wall_texture": return THREE.ImageUtils.loadTexture('./assets/hedge.jpg'); break;
            case "background_music": return "assets/background.mp3"; break;
            case "light_intensity": return 0.5; break;
        }
    }
    else if(atmosphere == "happy") {
        switch(item) {
            case "font-family": return "happyFont"; break;
            case "chest_items": return ["zoom_out", "move_to_start", "rotate_maze", "increase_time", "decrease_time", "random_teleportation"]; break;
            case "chest_probabilities": return [0.3, 0.04, 0.06, 0.25, 0.25, 0.1]; break;
            case "chest_texture": return THREE.ImageUtils.loadTexture('./assets/crystal.jpg'); break;
            case "head_texture": return THREE.ImageUtils.loadTexture('./assets/hair.jpg'); break;
            case "player_texture": return THREE.ImageUtils.loadTexture('./assets/cloak.jpg'); break;
            case "ground_texture": return THREE.ImageUtils.loadTexture('./assets/grass.jpg'); break;
            case "wall_texture": return THREE.ImageUtils.loadTexture('./assets/flower.jpg'); break;
            case "background_music": return "assets/happyBackground.mp3"; break;
            case "light_intensity": return 2; break;
        }
    }
}