package cornerContourSamples.hxCanvas;

import cornerContourSamples.hxCanvas.CanvasSetup;
import cornerContour.drawTarget.CanvasDraw;

import cornerContourSamples.svg.All;
import cornerContour.Pen2D;

function main() new SvgExample();
class SvgExample {
    public var canvasSetup = new CanvasSetup();
    public function new(){
        trace( 'Svg example on Canvas' );
        var pen = new Pen2D( 0xFF0000FF );
        var g   = canvasSetup.surface;
        svgs( pen );                       // svg.all
        rearrangeDrawData( pen, g );       // drawTarget.CanvasDraw
    }
}