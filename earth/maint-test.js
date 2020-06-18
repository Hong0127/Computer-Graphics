function init() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.SphereGeometry(1, 32, 32);
    var material = new THREE.MeshPhongMaterial();
    var earthmesh = new THREE.Mesh(geometry, material);

    material.map    = THREE.ImageUtils.loadTexture('images/earthmap1k.jpg');
    material.bumpMap = THREE.ImageUtils.loadTexture('images/earthbump1k.jpg');     
    material.bumpScale = 0.05;
    material.specularMap = THREE.ImageUtils.loadTexture('images/earthspec1k.jpg')
    material.specular = new THREE.Color('grey')

    updateFcts.push(function(delta, now) {
        cloudMesh.rotation.y += 1 / 8 * delta;
        earthMesh.rotation.y += 1 / 16 * delta;
    })

    scene.add(earthmesh);

    camera.position.set( -30, 40, 30 );
    camera.lookAt(scene.position)

}

function render() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
}
render();