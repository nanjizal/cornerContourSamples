package cornerContourSamples.hxHeaps;

import h2d.Graphics;
import cornerContour.drawTarget.HeapsDraw;

import cornerContourSamples.svg.All;
import cornerContour.Pen2D;

function main() new SvgExample();
class SvgExample extends hxd.App {
    var g:    h2d.Graphics; 
    override
    function init() {
        engine.backgroundColor = 0xFF000000;
        g       = new h2d.Graphics( s2d );
        var pen = new Pen2D( 0xFF0000FF );
        svgs( pen );                       // svg.all
        rearrangeDrawData( pen, g );       // drawTarget.CanvasDraw
    }
}
