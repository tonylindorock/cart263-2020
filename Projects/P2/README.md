R.K.B.V.G.
By Yichen Wang

BACKGROUND
R.K.B.V.G. stands for Random Keywords Based Video Generator. It is a system developed by Good Media Inc. in the 90s - 00s. It is used to generate videos from an immersive video database. By using 5 random keywords, the build-in A.I. can make a video in seconds and upload the video automatically. 
 
ABOUT THIS PROJECT
In reality, R.K.B.V.G. is a fantasy computer system. I got the inspiration from Pico-8 (https://www.lexaloffle.com/pico-8.php), a fantasy console for creating simple games and programs. The reason I went for this style is just for aesthetics, and to achieve it, in my opinion, p5 is the most suitable library to use. Phaser could be a great alternative, but I find p5 more familiar to work with. 

From making everything boxy to using a limited range of colours, a lot of the UI elements are made to create the aesthetics of a fantasy console. Making the input of this game keyboard-only and hiding the mouse all the time is not a necessary step; however, it indeed made the game (therefore the fantasy computer) appear obsolete. And this unnecessary step led to another unnecessary step. I had to code a nearly-entire "focus" system inside my game. Without a mouse, how the user interacts with the program is only by arrow-keys and a confirm key (SPACE in this case). A focus on a button shows where the invisible cursor is, and using the keys to change the focus to other buttons and confirming it is the only way to navigate in this game. It was time-consuming, and I probably would not attempt to do this again in p5.

ABOUT THE GAMEPLAY
You will play as a video creator who makes videos for a living. You will start with $1000 in your account, and you have to make sure that you have enough money to pay for the monthly charge ($500). How you create the video is solely based on the keywords that you have.

In each video-making session, you will have 5 randomly-chosen keywords. They are from 3 JSON files filled with words, including adjectives, nouns, and verbs. These words can be categorized into 3 groups, safe for children, controversial, and not safe for children. The words, then, will be formatted into a phrase so that they will make some sense as a title. Because it is entirely random, the phrase it generates sometimes is hilarious, and sometimes, it is extremely disturbing and maybe graphical. Maybe half of the time, the phrase it comes up with fortunately does not make any sense. Nevertheless, it does not make this game safe for work.

Once you decide your video title, you can accept the phrase and let the A.I. do the work for you. After the video is uploaded, you will start to get views and fans. The rate of you getting these views and fans entirely depends on the total values of all the videos you uploaded. Typically, words that are not safe for children will have more values than words that are safe, and these 5 keywords will be added up to decide the total value of the video. Having more values means more engaging content so you will get more views and fans. It then means you will get paid more because you get more views in a week.

The income from views, yes, is based on the views. I used to have the rating to have some influence on it, but later I decided to make it all about the views. The rating is the average rating of all videos. If the video itself is safe or controversial or not safe for kids, it is rated as 100%, 66%, and 33% respectively. The rating does not have any effect on the gameplay, but it is there to show if you have been posting non-kid-friendly videos. 

To make the game more interesting, I decided to award players with some special cards. These ones are purple, and the game will ignore the keyword even though it literally says "rape" or "gory". These cards will have some effects like reducing the risk level of a video or adding an additional 10 to the value. 

This game reflects some topics from James Bridle's essay, like using A.I. to do most of the work, which ends up with some products that are incredibly inappropriate. Or weird stuff being posted on the Internet. Or corporations maximize profits. Or people exploiting the system. It also reflects other disturbing facts in our society, like some videos receive way more views than those videos that are more well-made and meaningful. Or videos with "baiting" elements that attract more viewers. Or videos with completely unsatisfying ratings (not safe for children, dangerous home experiment maybe) are available to kids. 

There are a lot of things that we need to change on the Internet. Who would know that Good Media Inc. will fine you if they find a non-kid-friendly video while still providing you with some "purple cards" so that you can make more money and not get caught? Or cancelling your membership when you just do not have $500 in your account?
