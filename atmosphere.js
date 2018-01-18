function getAtmosphere(atmosphere, item) {
    if(atmosphere == "horror") {
        switch(item) {
            case "font-family": return "scaryFont"; break;
            case "chest_items": return ["zoom_out", "jump_scare", "move_to_start", "rotate_maze", "light_darker", "increase_time", "decrease_time", "random_teleportation"]; break;
            case "chest_probabilities": return [0.3, 0.1, 0.04, 0.05, 0.05, 0.18, 0.18, 0.1]; break;
        }
    }
    else if(atmosphere == "happy") {
        switch(item) {
            case "font-family": return "happyFont"; break;
            case "chest_items": return ["zoom_out", "jump_scare", "move_to_start", "rotate_maze", "light_darker", "increase_time", "decrease_time", "random_teleportation"]; break;
            case "chest_probabilities": return [0.3, 0.1, 0.04, 0.05, 0.05, 0.18, 0.18, 0.1]; break;
        }
    }
}