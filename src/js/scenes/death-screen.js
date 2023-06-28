import { Color, Font, FontUnit, Label, Scene, Vector, Actor, CollisionType, vec,
} from "excalibur";
import { Resources, ResourceLoader } from "../resources.js";
import { TutorialLevel } from "./level-0.js";

export class deathScreen extends Scene {
  constructor() {
    super();
  }

  
  onInitialize(engine) {

    console.log(engine.winner);


    // voegt de opnieuw knop toe aan de eindscene
    this.button = new Actor({
      z: 100,
      x: 400,
      y: 300,
      width: Resources.Reload.width,
      height: Resources.Reload.height,
      collisionType: CollisionType.PreventCollision,
    });
    this.button.graphics.use(Resources.Reload.toSprite());
    this.button.actions.scaleTo(vec(0, 1));
    this.button.on("pointerup", () => {
      location.reload();
    });
    this.add(this.button);
  }

  onActivate(ctx) {
    // voegt de achtergrond toe aan de eindscene
    const Background = new Actor({
      x: 0,
      y: 0,
    });
    Background.graphics.use(Resources.Background.toSprite());
    this.add(Background);
    Background.scale = new Vector(4, 4);
  }
}
