package cornerContourSamples.hxLuxe;

// Luxe is no longer supported but still have old repo so test to see if still works.

import luxe.Sprite;
import luxe.Color;
import phoenix.Batcher.PrimitiveType;
import phoenix.Vector;
import phoenix.geometry.Vertex;
import luxe.Input;
import luxe.Vector;
import phoenix.geometry.Geometry;
import luxe.Color;

import cornerContour.drawTarget.LuxeDraw;
import cornerContourSamples.svg.All;
import cornerContour.Pen2D;

class SvgExample extends luxe.Game {
    var g: Geometry;
    var pen:   Pen2D;
    override function ready() {
        if( g != null ) g.drop();
        g = createMesh();
        var pen = new Pen2D( 0xFF0000FF );
        svgs( pen );
        renderToTriangles( pen, g );
    }
    override
    function onmousemove( event: MouseEvent ) {
        // mousemove update
    }
    override
    function onkeyup( e:KeyEvent ) {
        if(e.keycode == Key.escape) {
            Luxe.shutdown();
        }
    }
    override
    function onkeydown( e: KeyEvent ) {
        var keyCode = e.keycode;
        // add key code if you need.
    }
    override
    function update( delta: Float ) {
        // update if pen changed
        // g.drop();
        // g = createMesh();
        // renderToTriangles( pen2D, g );
    }
    override
    function config( config: luxe.GameConfig ) {
        config.window.width = 1024;
        config.window.height = 768;
        config.render.antialiasing = 4;
        return config;
    }
}