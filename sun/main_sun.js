(function () {
    var webglEl = document.getElementById('webgl');

    var width = window.innerWidth;
    var height = window.innerHeight;

    var radius = 1,
        segment = 32,
        rotation = 6;

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera( 40, width / height, 0.1, 1000 );
    camera.position.z = 2;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    

    scene.add(new THREE.AmbientLight(0x333333));

    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set( 5, 3, 5 );
    scene.add(light);

    var planet = Planet(radius, segment);
    planet.rotation.y = rotation;
    scene.add(planet);

    var stars = Stars(90, 40);
    scene.add(stars);

    document.body.appendChild( renderer.domElement );

    render();

    function render() {
		controls.update();
		sphere.rotation.y += 0.0005;
		clouds.rotation.y += 0.0005;		
		requestAnimationFrame(render);
		renderer.render(scene, camera);
    }
    
    function Planet(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('sunmap.jpg'),
				specular:    new THREE.Color('grey')								
			})
		);
    }
    
    function Stars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments), 
			new THREE.MeshBasicMaterial({
				map:  THREE.ImageUtils.loadTexture('../galaxy_starfield.png'), 
				side: THREE.BackSide
			})
		);
	}

}());