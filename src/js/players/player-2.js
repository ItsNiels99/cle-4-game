import * as ex from "excalibur";
import { Actor, Vector, Input } from "excalibur";
import { Resources, ResourceLoader } from "/src/js/resources.js";

export class Waterbus extends Actor {
  constructor() {
    super();
  }
  onInitialize(engine) {
    this.graphics.use(Resources.Waterbus.toSprite());
    this.pos = new Vector(200, 400);
    this.rotation = (270 * Math.PI) / 180;
    this.z = 2;

    this.on('collisionStart', (ev) => {
      this.onHit(ev, engine);
    })
  }

  onPreUpdate(engine) {
    let speed = 60;

    // cursor keys is direction
    if (engine.input.keyboard.isHeld(Input.Keys.A)) {
      if (this.rotation <= (320 * Math.PI) / 180) {
        this.rotation += 0.02;
      }
    }
    if (engine.input.keyboard.isHeld(Input.Keys.D)) {
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
    if (ev.other._name = 'Finish') {
      console.log('Player 2 wint')
    }
    if (ev.other._name = 'Warf') {
      this.boosterCooldown = new Timer({
        fcn: () => console.log("false cooldown"),
        repeats: false,
        interval: 1200,
        fcn: () => this.boosterOnCooldown = false
        // speed = -80;
      })
    }

    if (ev.other._name = 'Buoy') {
      console.log('You hit a buoy')
    }
    console.log("You hit Something!")
}

}
