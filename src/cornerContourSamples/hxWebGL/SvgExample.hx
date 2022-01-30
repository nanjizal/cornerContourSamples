package cornerContourSamples.hxWebGL;

import cornerContour.web.Sheet;
import cornerContour.web.DivertTrace;

import cornerContour.web.Renderer;

import cornerContour.drawTarget.CanvasDraw;
import js.html.webgl.RenderingContext;
import cornerContour.web.HelpGL;
import cornerContourSamples.svg.All;
import cornerContour.Pen2D;

function main() new SvgExample();
class SvgExample {
    var width:            Int;
    var height:           Int;
    var mainSheet:        Sheet;
    var divertTrace:             DivertTrace;
    var renderer:                Renderer;
    var gl:               RenderingContext;
    public function new(){
        divertTrace = new DivertTrace();
        trace('SVG WebGL Contour Test');
        width = 1024;
        height = 768;
        mainSheet = new Sheet();
        mainSheet.create( width, height, true );
        gl = mainSheet.gl;
        var pen2D = new Pen2D( 0xFF0000FF );
        pen2D.currentColor = 0xFF0000FF;
        var s = Std.int( pen2D.pos );
        svgs( pen2D );                       // svg.all
        var e = Std.int( pen2D.pos - 1 );
        renderer = { gl: gl, pen: pen2D, width: width, height: height };
        renderer.rearrangeData();
        renderer.setup();
        renderer.updateData();
        clearAll( gl, width, height, 0., 0., 0., 1. );
        renderer.drawData( s...e );
    }
}