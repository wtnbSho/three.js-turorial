let scene, camera, renderer, cube;

function init() {
	/* シーン */
	scene = new THREE.Scene();

	/* カメラ */
	camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);

	/* レンダラー */
	renderer = new THREE.WebGLRenderer({antialias: true}); // ブラウザで3d表現

	renderer.setSize(window.innerWidth, window.innerHeight); //サイズ指定

	document.body.appendChild(renderer.domElement); //bodyに追加

	/* ボックスのサイズ決定、メッシュ、追加 */
	const geometry = new THREE.BoxGeometry(2,2,2);// 幅、高さ、奥行き
	// const material = new THREE.MeshBasicMaterial({color: 0x0000ff}); // 光源を必要としない関数
	const texture = new THREE.TextureLoader().load("./textures/san5.webp");
	const material = new THREE.MeshBasicMaterial({map: texture});
	cube = new THREE.Mesh(geometry, material); // ボックスとカラーをメッシュで合わせてキューブとして表現
	scene.add(cube); //sceneに対してcubeをaddする

	camera.position.z = 5;
}

/* アニメーション制御 */
function animate() {
	requestAnimationFrame(animate); // コールバック関数。フレーム単位で何度も何度もanimate関数を呼んで３dを表現している

	cube.rotation.x += .01;
	cube.rotation.y += .01;

	renderer.render(scene, camera);// sceneとcameraで僕スを表現
}

/* window変更時にサイズを維持する処理 */
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize);

init();
animate();