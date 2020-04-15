<h1>QUESTIONABLE LOGIC: THE CUBE</h1>
<h3>-- Artist's Statement --</h3>
<br>
Yichen Wang
<br>
<br>
Before starting working on this game, I had two ideas. The first one would be “The Art of Being Artistic,” and the second one would be “The Art of Cooking.” They were fascinating concepts and possibly fun to keep working on, but I decided not to continue making neither of them and determined to finish this instead.
<br>
<br>
“Questionable Logic” was a title of my own original animated short film. I have finished the script since 2018, but I realized that completing the animation alone was not going to work. Rather than letting it rot, last month, I decided to use the title to create a game series. The series, however, has nothing to do with this project, but I really could not think of anything to make. So “Questionable Logic: The Cube” was born.
<br>
<b>STYLE</b>
I would say this project was heavily inspired by the Cube Escape (http://www.cubeescape.com). It is about solving puzzles in a room. This project is basically the same. The whole concept is to keep the game simple. Everything is plain. There is no shadow at all. There are minimal numbers of objects and items. Putting too much stuff might just distract players.
<br>
<b>CODE</b>
I decided to use only p5 and jQuery (and jQuery UI) so that I can use the canvas and manipulate html elements more easily. Basically, the visual of the game is handled by p5, and the interaction is handled by jQuery UI.
<br>
<br>
Creating buttons is so much simpler in jQuery than in p5. Buttons are not just an illusion anymore.
<br>
<br>
I originally wanted to make the inventory system in p5, but I suddenly realized that I can just use a few elements of a custom class inside of a div. It also solved the problem of how to organize items automatically in a vertical strip.
<br>
<b>GAMEPLAY</b>
It is a very generic point-and-click puzzle game. All you do is clicking somewhere on the screen, hoping you might just get something out of it, but nothing happens usually. One of the reasons to go minimal is to solve this problem. Players should not guess where the secret is, but instead, they should know where to click exactly.
<br>
<br>
The plot is that the player is trapping inside of a room, and they need to find out the passcode for the exit to complete the escape. Before obtaining the passcode, players will need to finish every small puzzle in the room.
<br>
<br>
After a playthrough from a friend, I realized minimalism is not too friendly to the player. I thought about creating a tip system so that players can see some tips when they are stuck. However, I found it a little bit distracting, so I scrap the idea. As a result, I added some writings on each wall in the room. They can be tips or messages left by Oliver, a character from the game. I suppose it helps and also adds some story-telling elements.
<br>
<b>SOUND EFFECTS</b>
A unique sound will be played when you interact with an object. In this way, the game is more responsive. I wanted to have ambient music playing in the background while the player is in the game. However, in my opinion, I found it distracting, so the music will only play in the end.
