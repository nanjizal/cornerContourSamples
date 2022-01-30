package cornerContourSamples.hxCeramic;
import ceramic.Text;
import ceramic.Quad;
import ceramic.Scene;
import ceramic.Mesh;
import ceramic.Color;
import ceramic.AlphaColor;
import cornerContour.drawTarget.CeramicDraw;
import cornerContour.Pen2D;
import cornerContourSamples.svg.All;
class MainScene extends Scene {
    var mesh: Mesh;
    var sketcher:       Sketcher;
    var pen2D:          Pen2D;
    override
    function preload() {
        // Add any asset you want to load here
    }
    override
    function create() {
        // Called when scene has finished preloading
        pen2D = new Pen2D( 0xFF0000FF );
        svgs( pen2D );                   // from svg.All
        mesh = new Mesh();
        drawMesh();
        mesh.anchor(0, 0);
        mesh.pos(0, 0);
        mesh.scale( 1 );
        mesh.alpha = 1;
        mesh.colorMapping = VERTICES;
        rearrageDrawData( pen2D, mesh );  // from CeramicDraw
        add(mesh);
        // Print some log
        log.success('cornerContour SVG example using Ceramic)');
    }
    override
    function update(delta:Float) {
        // Here, you can add code that will be executed at every frame
    }
    override
    function resize(width:Float, height:Float) {
        // Called everytime the scene size has changed
    }
    override
    function destroy() {
        // Perform any cleanup before final destroy
        super.destroy();
    }
}