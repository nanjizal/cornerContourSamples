package cornerContourSamples.svg;

import cornerContourSamples.svg.Curves;
import cornerContourSamples.svg.Ellipses;
import cornerContourSamples.svg.Kiwi;
import cornerContour.Pen2D;

function svgs( pen2D: Pen2D ){
    // render svg
    arcSvg( pen2D );
    pen2D.currentColor = 0xFF0000FF;
    kiwiSvg( pen2D );
    cubicSvg( pen2D );
    quadSvg( pen2D );
}