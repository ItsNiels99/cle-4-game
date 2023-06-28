import * as ex from "excalibur";
import { Actor, Vector, Input } from "excalibur";
import { Resources, ResourceLoader } from "/src/js/resources.js";

export class Taxi extends Actor {

  p1spawnPosX
  p1spawnPosY
  
  constructor(p1spawnPosX, p1spawnPosY) {
    super();
    this._name = "taxi";
    this.pos = new Vector(p1spawnPosX, p1spawnPosY);
    this.graphics.use(Resources.Taxi.toSprite());
    this.collider.useBoxCollider(21, 10, Vector.Half, new Vector(0, 0)); 
    this.useGraphicBounds = true;
    this.z = 2;
  }

  onInitialize(engine) {
    this.rotation = (270 * Math.PI) / 180;
    this.body.collisionType = ex.CollisionType.Active;
    this.healthAmount = 3
    this.on('collisionStart', (ev) => {
      this.onHit(ev, engine);
  })

  }

  onPreUpdate(engine) {
    let speed = 60;

    if (speed < 60) {
      speed += 2
    }

    // cursor keys is direction
    if (engine.input.keyboard.isHeld(Input.Keys.Right)) {
      if (this.rotation <= (320 * Math.PI) / 180) {
        this.rotation += 0.02;
      }
    }
    if (engine.input.keyboard.isHeld(Input.Keys.Left)) {
      if (this.rotation >= (220 * Math.PI) / 180) {
        this.rotation -= 0.02;
      }
    }

    // direction is the cosine/sine of the angle!
    let direction = new Vector(
      Math.cos(this.rotation) * speed,
      Math.sin(this.rotation) * speed
    );

    this.vel = direction;
  }
  
  onHit(ev, engine) {
    console.log("blabla");
    console.log(ev)
    if (ev.other._name ='Finish'){
      console.log('Player 1 wint')
      engine.winner = 'Player 1';
    }
    if (ev.other._name = 'Warf'){
      
    }

    if (ev.other._name = 'Buoy'){
      console.log('You hit a buoy')
      ev.other.kill();
    } 
    
    
    if (this.healthAmount === 1) {
        engine.winner = 'player 2';
        engine.goToScene('deathScene')
    }
    if (this.healthAmount === 2) {
        ev.other.kill();
        this.healthAmount = 1
      speed -= 20;
    }
    if (this.healthAmount === 3) {
        
      ev.other.kill();
      this.healthAmount = 2;
      speed -= 20;
    }
    console.log(this.healthAmount)
}
}
