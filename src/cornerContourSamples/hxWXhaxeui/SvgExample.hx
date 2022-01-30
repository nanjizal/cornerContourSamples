package cornerContourSamples.hxWXhaxeui;

import hx.widgets.*;
import hx.widgets.styles.*;
import cornerContour.color.ColorHelp;
// contour code
import cornerContourSamples.svg.All;
import cornerContour.Pen2D;

import cpp.Pointer;
import cpp.RawPointer;
import haxe.io.Bytes;

function main() new SvgExample();
class SvgExample {
    var pen2D: Pen2D;
    public function new(){
        var app = new App();
        app.init();
        var frame = new Frame( null, "hxWidgets" );
        var width = 1024;
        var height = 768;
        var l = Std.int( width*height);
        frame.resize(width,height);
        var panel = new Panel( frame );
        var image = new hx.widgets.Image(width,height );
        
        var pen = new Pen2D( 0xFF0000FF );
        // DRAW SVGS
        svgs( pen );                       // svg.all
        
        var rgbs    = new haxe.io.UInt8Array( l*3 );
        var alphas  = new haxe.io.UInt8Array( l*3 );
        var penData = pen2D.arr;
        var totalTriangles = Std.int( penData.size/7 );
        for( i in 0...totalTriangles ){
            pen2D.pos = i;
            penData.fillaRGBs( rgbs, alphas, width );
        }
        // transfer to Image
        var rawPointerData  = @:privateAccess image.imageRef.ptr.getData();
        var rawPointerAlpha = @:privateAccess image.imageRef.ptr.getAlpha();
        var data: Pointer<cpp.UInt8> =  Pointer.fromRaw( rawPointerData );
        var alpha: Pointer<cpp.UInt8> =  Pointer.fromRaw( rawPointerAlpha );
        var j = 0;
        for( i in 0...width*height ){
                if( alpha != null ) alpha[ i ] = alphas[ i ];
                data[ j ]     = rgbs[ j ];
                data[ j + 1 ] = rgbs[ j + 1 ];
                data[ j + 2 ] = rgbs[ j + 2 ];
                j+=3;
        }
        var b = new Bitmap(image);
        var bmp:StaticBitmap = new StaticBitmap(frame, b);
        frame.layout();
        frame.show();
        app.run();
        app.exit();
    }
}