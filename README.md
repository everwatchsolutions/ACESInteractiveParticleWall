## ACES Interactive Particle Wall

During our last hiring event here at ACES in Colorado, we decided to geek out a little and do something fun.  @andrewserff threw together a quick demo that we could project on the wall during the hiring event that people could interact with. 

### An Interactive Particle Wall?
Let's quickly explain what this is all about. ACES develops many applications, but we have a good deal of experience developing web applications, using javascript frameworks, and other web technologies.  Our R&D department also get's to play with some cool things like the [Leap Motion](http://leapmotion.com) controller and so we decided to throw the two together in an interactive way.  

We decided to build a simple web page that would show a Welcome to ACES sign that we could project on a wall in our large conference room where the hiring event was being held. On the screen, you would see some random particles floating around the wall. If you walked up to the wall and held you hand over the Leap Motion controller, you could interact with the particles. Waving your hand around would select particles and tapping with your hand would cause particles to explode from where you tapped. It was a simple interaction, but gave us something to talk about with other developers who came to our hiring event.  

####Here's what is looked like
![image](http://acesinc.github.io/ACESInteractiveParticleWall/images/ParticleWallPreview.png)

### How was this implemented?
The implementation started with a simple HTML/CSS page that has very little content. It mainly builds the Welcome to ACES sign and sets up the scene for the particles. 

The particles are generated using a cool javascript libray called [particles.js](https://github.com/VincentGarreau/particles.js/).  We started with an example they had and changed the styling a bit to be more visible on the projector.  

Next we had to integrate the Leap Motion controller and luckily there is a great [JavaScript driver](https://github.com/leapmotion/leapjs) for the Leap Motion we were able to use.  We also found a great plugin for the Leap Motion JavaScript driver called [Leap Cursor](https://github.com/roboleary/LeapCursor.js). Leap Cursor just provides us a visual representation of where the users hand it on the screen, it does not provide the interaction with the particles or the clicking action we were after.  

In order to get the hand movement to affect the particles on the screen, we had to use the Leap Motion JavaScript library and dig into particles.js a bit. The Leap Motion will provide the users Hand Position on the screen, and while particles.js will let you interact with the particles with your mouse out of the box, it doesn't recognize the movement of the Leap Motion.  So we had to convert the screen position events, which we get every frame in the `Leap.loop` handler, into mouse positions and make particles.js think the mouse moved.  We also did a little bit of scaling on the position to match the screen a little better. This bioled down to a pretty simple bit of JavaScript you can see here:

```
Leap.loop({
    hand: function (hand) {

        var pos = hand.screenPosition();
        if (pJS) {

            pJS.interactivity.mouse.pos_x = pos[0] + 100;
            pJS.interactivity.mouse.pos_y = pos[1] + 350;

            if (pJS.retina) {
                pJS.interactivity.mouse.pos_x *= pJS.canvas.pxratio;
                pJS.interactivity.mouse.pos_y *= pJS.canvas.pxratio;
            }

            pJS.interactivity.status = 'mousemove';
        }
    }

}).use('screenPosition', {scale: 0.70});  
```

The same was true about allowing the user to click on the screen with a tap of the hand. We had to convert the click event from the Leap Motion into an event that triggered an explosion of particles on the screen. 

All in all, it is a pretty simple solution, but the integration of all these technologies takes a bit of time and digging to find just the right mix of code to make it all work right.  

### Demo
I bet you'd love to see it for yourself huh?  We'll you're in luck! Before you jump over, if you have a Leap Motion, be sure to plug it in and you'll be able to interact with it just like we were, but without the projector. 

Find the [demo here](http://acesinc.github.io/ACESInteractiveParticleWall/)!