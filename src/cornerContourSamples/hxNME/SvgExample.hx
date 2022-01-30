package cornerContourSamples.hxNME;
import nme.display.Sprite;

import flash.Lib;
import flash.display.Sprite;
import flash.events.Event;
import flash.display.Graphics;

// contour code
import cornerContourSamples.svg.All;
import cornerContour.Pen2D;
import cornerContour.drawTarget.NMEdraw;

// draw version, likely also for NME will be a shader version.
function main(): Void { Lib.current.addChild( new SvgExample() ); }
class SvgExample extends Sprite {
    var viewSprite: Sprite;
    public function new(){
        super();
        var current = Lib.current;
        var stage = current.stage;
        viewSprite = new Sprite();
        var g = viewSprite.graphics;
        addChild( viewSprite );
        var pen = new Pen2D( 0xFF0000FF );
        svgs( pen );                       // svg.all
        rearrangeDrawData( pen, g );       // drawTarget.CanvasDraw
        current.graphics.beginFill(0xFFFFFF, 1. );
        current.graphics.drawRect( 0., 0., 70., 40. );
        current.graphics.endFill();
        current.addChild( new nme.display.FPS() );
    }
}