package cornerContourSamples.hxFlixel;

import flixel.FlxState;
import cornerContour.drawTarget.FlxView;

// contour code
import cornerContourSamples.svg.All;
import cornerContour.Pen2D;
import cornerContour.StyleSketch;
import cornerContour.StyleEndLine;

import flixel.FlxGame;
import openfl.display.Sprite;

class SvgExample extends Sprite{
    public function new(){
        super();
        addChild(new FlxGame(0, 0, Basic));
    }
}

class Basic extends FlxState {
    override public function create(){
        super.create();
        var view = new FlxView( 0, 0, StyleSketch.Fine, StyleEndLine.no  );
        add( view );
        // render svg
        var pen = view.pen2D;
        svgs( pen );                       // svg.all
        view.rearrangeDrawDataFast();
    }
    override public function update( elapsed: Float ){
        super.update( elapsed );
    }
}