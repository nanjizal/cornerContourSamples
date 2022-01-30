package cornerContourSamples.hxLime;

import lime.graphics.RenderContext;
import lime.graphics.WebGLRenderContext;
import lime.app.Application;
import lime.graphics.opengl.GLProgram;
//import lime.utils.Float32Array;
import lime.graphics.opengl.GLBuffer;

import cornerContour.io.Float32Array;

// contour code
import cornerContourSamples.svg.All;
import cornerContour.Pen2D;
//import cornerContour.StyleSketch;
//import cornerContour.StyleEndLine;

// webgl gl stuff
import cornerContour.shaderTarget.limeTarget.ShaderColor2D;
import cornerContour.shaderTarget.limeTarget.HelpGL;
import cornerContour.shaderTarget.limeTarget.BufferGL;

// html stuff
#if js
import cornerContour.web.DivertTrace;
#end

function main() new SvgExample();
class SvgExample extends Application {
    
    // cornerContour specific code
    var pen2D:          Pen2D;
    // general inputs
    final vertexPosition         = 'vertexPosition';
    final vertexColor            = 'vertexColor';
    
    // Color
    public var programColor:     GLProgram;
    public var bufColor:         GLBuffer;
    
    var arr32:                   haxe.io.Float32Array;
    var len:                     Int;
    var totalTriangles:          Int;
    var bufferLength:            Int;
    
    var ready: Bool = false;
    var runSeconds: Float = 0; // maybe delay to start.
    var program: GLProgram;
    var width: Int;
    var height: Int;
    
    public function new() {
        super();
        #if js
        var divertTrace = new DivertTrace();
        trace('cornerContour SVG Lime example');
        #end
        
    }
    public override
    function onWindowCreate ( ): Void {
        var context = window.context;
        width  = window.width;
        height = window.height;
        switch( context.type ){
            case OPENGL, OPENGLES, WEBGL:
                var gl: WebGLRenderContext = context.webgl;
                programColor = programSetup( gl, vertexString, fragmentString );
                drawContours();
                rearrageDrawData();
                gl.bindBuffer( gl.ARRAY_BUFFER, null );
                gl.useProgram( programColor );
                bufColor = interleaveXY_RGBA( gl
                               , programColor
                               , arr32
                               , vertexPosition, vertexColor, true );
                               
            case CAIRO, CANVAS, DOM, FLASH, CUSTOM:
                // NOT YET IMPLEMENTED
        }
        ready = true;
    }
    public override
    function update( deltaTime: Int ): Void {
        runSeconds = deltaTime /1000;
        if( !ready ) return;
    }
    public override
    function render ( context: RenderContext ): Void {
        if( !ready ) return;
        switch( context.type ){
            case OPENGL, OPENGLES, WEBGL:
                var gl: WebGLRenderContext = context.webgl;
                clearAll( gl, width, height );
                gl.bindBuffer( gl.ARRAY_BUFFER, bufColor );
                gl.useProgram( programColor );
                gl.drawArrays( gl.TRIANGLES, 0, bufferLength );
                
            case CAIRO, CANVAS, DOM, FLASH, CUSTOM:
                // NOT YET IMPLEMENTED
        }
    }
    public
    function drawContours(){
        trace( 'drawContours' );
        pen2D = new Pen2D( 0xFF0000FF );
        svgs( pen2D );
    }
    public
    function rearrageDrawData(){
        trace( 'rearrangeDrawData' );
        var pen = pen2D;
        var data = pen.arr;
        var red    = 0.;   
        var green  = 0.;
        var blue   = 0.; 
        var alpha  = 0.;
        var color: Int  = 0;
        // triangle length
        totalTriangles = Std.int( data.size/7 );
        bufferLength = totalTriangles*3;
         // xy rgba = 6
        len = Std.int( totalTriangles * 6 * 3 );
        var j = 0;
        arr32 = new haxe.io.Float32Array( len );
        for( i in 0...totalTriangles ){
            pen.pos = i;
            color = Std.int( data.color );
            alpha = alphaChannel( color );
            red   = redChannel(   color );
            green = greenChannel( color );
            blue  = blueChannel(  color );
            // populate arr32.
            arr32[ j ] = gx( data.ax );
            j++;
            arr32[ j ] = gy( data.ay );
            j++;
            arr32[ j ] = red;
            j++;
            arr32[ j ] = green;
            j++;
            arr32[ j ] = blue;
            j++;
            arr32[ j ] = alpha;
            j++;
            arr32[ j ] = gx( data.bx );
            j++;
            arr32[ j ] = gy( data.by );
            j++;
            arr32[ j ] = red;
            j++;
            arr32[ j ] = green;
            j++;
            arr32[ j ] = blue;
            j++;
            arr32[ j ] = alpha;
            j++;
            arr32[ j ] = gx( data.cx );
            j++;
            arr32[ j ] = gy( data.cy );
            j++;
            arr32[ j ] = red;
            j++;
            arr32[ j ] = green;
            j++;
            arr32[ j ] = blue;
            j++;
            arr32[ j ] = alpha;
            j++;
        }
    }
    public static inline
    function alphaChannel( int: Int ) : Float
        return ((int >> 24) & 255) / 255;
    public static inline
    function redChannel( int: Int ) : Float
        return ((int >> 16) & 255) / 255;
    public static inline
    function greenChannel( int: Int ) : Float
        return ((int >> 8) & 255) / 255;
    public static inline
    function blueChannel( int: Int ) : Float
        return (int & 255) / 255;
    public inline
    function gx( v: Float ): Float {
        return -( 1 - 2*v/width );
    }
    public inline
    function gy( v: Float ): Float {
        return ( 1 - 2*v/height );
    }
}