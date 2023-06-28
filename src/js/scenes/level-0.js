import * as ex from "excalibur";
import { TiledMapResource } from "@excaliburjs/plugin-tiled";
import { Taxi } from "../players/player-1";
import { Resources, ResourceLoader } from "../resources.js";
import { deathScreen } from "../scenes/death-screen.js";


export class TutorialLevel extends ex.Scene {
    constructor() {
        super();
    }

    
    onInitialize(engine) {
        console.log("tutorial level");
        Resources.TutorialMap.addTiledMapToScene(engine.currentScene);

        let tiledMapData = Resources.TutorialMap.data.getExcaliburObjects();
        let player1spawnPos = tiledMapData[0]["objects"][0];
        let p1spawnPosX = player1spawnPos.x;
        let p1spawnPosY = player1spawnPos.y;
        
        for (let obj in tiledMapData[0]["objects"]) {

            if (obj <= 1) {//skips taxi and waterbus as objects
                continue;
            }
            
            let ObjPos = ex.vec(tiledMapData[0]["objects"][obj].x, tiledMapData[0]["objects"][obj].y);
            this.NewObstacle = new ex.Actor({
                pos: ObjPos,
                anchor: ex.vec(0, 1),
                collisionType: ex.CollisionType.Passive,
                width: tiledMapData[0]["objects"][obj]["properties"][1].value,
                height: tiledMapData[0]["objects"][obj]["properties"][0].value,
                name: tiledMapData[0]["objects"][obj]["name"]
            })
            this.NewObstacle.on('collisionstart', (ev) => {//checks if Taxi actor collides based on _name of Taxi
                if (ev.other._name === 'taxi') {
                    // console.log("boop")
                }
            })
            this.add(this.NewObstacle);
        }


        const taxi = new Taxi(p1spawnPosX, p1spawnPosY);
        this.add(taxi);

        let cam = this.camera;
        cam.pos.x = p1spawnPosX;
        cam.strategy.lockToActorAxis(taxi, ex.Axis.Y);
        this.camera.zoom = 1.5;
    

        const deathscreen = new deathScreen();
        engine.addScene("deathScene", deathscreen);

        if (engine.input.keyboard.wasPressed(ex.Input.Keys  .Q)) {
            console.log("input");
      
            const deathscreen = new deathScreen();
            engine.addScene("deathScene", deathscreen);
            engine.goToScene("deathScene");
          }
    }
}


