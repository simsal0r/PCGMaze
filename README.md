# Spooky Horror PCG Maze Adventure

A WebGL maze game built with Three.js and Box2dWeb.  
Play it here: https://ms-lolstars.github.io/PCGMaze/

Attention: It's spooky.

To start the game locally

The rootfolder contains:
* Index.html + Index_happy.html
These two html files display the menu of the game. If you press the start button you will be forwarded to the game. The actual game is created in the game.js

* Game.js
This files acts as a wrapper file which references all important game elements, assets and the maze creation.

* Maze.js
The Maze.js contains the algorithm used to create the maze starting at line 16.
Moreover it contains the computation of the maze coefficient starting at line 176.
It creates three copies of the initial created maze and places an exit in one copy at top left corner, an exit on the top right corner in the other copy and an exit on the bottom left corner in the last copy. Afterwards a value of the mace coefficient for each of these mazes will be created. Currently we apply a naive selection method where we just choose the mace with the highest value of the mace coefficient to be used in the game.
The mace coefficient currently involves the following parameters (line 290)
* length of the direct way out
* length of all deadends
* number of deadends
* depth of deadends
* crossroads on the direct way out
Besides it contains the hardcoded mazes used in the survey starting at line 305

* Assets Folder
The folder assests contains all files (pictures/jump scares/sounds) to create the different settings _horror_ and _happy_

* Game Elements Folder
The folder gameElements contains javascript files for the different game elements like the player, chests, enemies.

* Libraries Folder
All external libraries used are gathered in this folder.

* PCG Folder
The folder PCG contains other intermediate maze algorithms. We don't use them in the actual game.
They were early implementations of different maze algorithms.

* Scene Elements Folder
The sceneElements folder contains all javascript, which influences camera and light settings. Also includes a javascript file for the timer and a javascript file which wraps up all sounds.

* Survey Folder
The folder survey contains the results of our survey in a csv file. Furthermore it exhibits the R code which was used for the analysis.
The survey can be found (and altered) on [Google forms](https://docs.google.com/forms/d/1NG5tnVk6JZseTEiQFpUveccg316Xh50umTtDE8_65Io/edit?usp=sharing).
The survey used 5 different mazes which are hardcoded in both settings.
You can find those mazes in the maze.js file (in the rootfolder) in line 305.
To enable the survey mode in our game, you have to set the following line (line 11) in the gameloop.js to **true**

> var IN_SURVEY_MODE = false;
