package cornerContourSamples.hxCeramic;

import cornerContourSamples.hxCeramic.SvgExample;
import ceramic.Entity;
import ceramic.Color;
import ceramic.InitSettings;

class Project extends Entity {

    function new(settings:InitSettings) {

        super();

        settings.antialiasing = 2;
        settings.background = Color.BLACK;
        settings.targetWidth = 1024;
        settings.targetHeight = 768;
        settings.scaling = FIT;
        settings.resizable = false;

        app.onceReady(this, ready);

    }

    function ready() {

        // Set MainScene as the current scene (see MainScene.hx)
        app.scenes.main = new cornerContourSamples.hxCeramic.SvgExample();

    }

}
