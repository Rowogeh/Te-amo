// ==============================================
//  3D Pink Flower – Three.js Background
//  Ported from pink flower.py (matplotlib)
// ==============================================
(function () {
    'use strict';

    const canvas = document.getElementById('flowerCanvas');
    if (!canvas) return;

    /* ── Scene ─────────────────────────────────── */
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    /* ── Colormap (RdPu_r – dark purple → pink → white) ── */
    function rdPuR(t) {
        t = Math.max(0, Math.min(1, t));
        const stops = [
            [0.29, 0.00, 0.29],   // 0.0  dark purple
            [0.55, 0.08, 0.42],   // 0.15
            [0.80, 0.22, 0.52],   // 0.30
            [0.92, 0.40, 0.65],   // 0.45
            [0.97, 0.58, 0.76],   // 0.60
            [0.99, 0.76, 0.87],   // 0.75
            [1.00, 0.92, 0.95],   // 0.90
            [1.00, 0.97, 0.98],   // 1.0  near white
        ];
        const n   = stops.length - 1;
        const idx = t * n;
        const i   = Math.min(Math.floor(idx), n - 1);
        const f   = idx - i;
        return [
            stops[i][0] + f * (stops[i + 1][0] - stops[i][0]),
            stops[i][1] + f * (stops[i + 1][1] - stops[i][1]),
            stops[i][2] + f * (stops[i + 1][2] - stops[i][2]),
        ];
    }

    /* ── Flower geometry (exact port of Python math) ── */
    const NUM_X     = 25;    // radial samples   (Python: 30)
    const NUM_THETA = 500;   // angular samples   (Python: 1200)

    const positions = [];
    const hArr      = [];          // heights for colour mapping
    let hMin =  Infinity;
    let hMax = -Infinity;

    for (let j = 0; j < NUM_THETA; j++) {
        for (let i = 0; i < NUM_X; i++) {
            const xVal     = i / (NUM_X - 1);                              // 0 → 1
            const thetaVal = (j / (NUM_THETA - 1)) * 2 * Math.PI * 8;     // 0 → 16π

            const fVal  = 0.5 * Math.PI * Math.exp(-thetaVal / 30);
            const noise = Math.sin(thetaVal) / 10;
            const u     = 0.5 + Math.abs(Math.sin(1.65 * thetaVal)) / 2 + noise;

            const yVal = 2 * Math.pow(xVal * xVal - xVal, 2) * Math.sin(fVal);
            const r    = u * (xVal * Math.cos(fVal) + yVal * Math.sin(fVal));
            const h    = u * (xVal * Math.sin(fVal) - yVal * Math.cos(fVal));

            const X = r * Math.cos(thetaVal);
            const Y = r * Math.sin(thetaVal);

            positions.push(X, h, Y);   // Three.js Y-up
            hArr.push(h);

            if (h < hMin) hMin = h;
            if (h > hMax) hMax = h;
        }
    }

    /* Vertex colours (mapped by height like matplotlib) */
    const vertColors = [];
    const hRange     = hMax - hMin || 1;
    for (let k = 0; k < hArr.length; k++) {
        const t        = (hArr[k] - hMin) / hRange;
        const [cr, cg, cb] = rdPuR(t);
        vertColors.push(cr, cg, cb);
    }

    /* Triangle indices */
    const indices = [];
    for (let j = 0; j < NUM_THETA - 1; j++) {
        for (let i = 0; i < NUM_X - 1; i++) {
            const a = j * NUM_X + i;
            const b = a + 1;
            const c = (j + 1) * NUM_X + i;
            const d = c + 1;
            indices.push(a, b, c);
            indices.push(b, d, c);
        }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions,  3));
    geo.setAttribute('color',    new THREE.Float32BufferAttribute(vertColors, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();

    const mat = new THREE.MeshPhongMaterial({
        vertexColors : true,
        side         : THREE.DoubleSide,
        shininess    : 80,
        specular     : new THREE.Color(0xffb6c1),
    });

    const flower = new THREE.Mesh(geo, mat);
    scene.add(flower);

    /* ── Lighting ──────────────────────────────── */
    scene.add(new THREE.AmbientLight(0xffc0cb, 0.55));

    const dir = new THREE.DirectionalLight(0xffffff, 1.0);
    dir.position.set(5, 10, 5);
    scene.add(dir);

    const pt = new THREE.PointLight(0xff69b4, 0.4, 20);
    pt.position.set(-3, 5, -3);
    scene.add(pt);

    /* ── Camera orbit (mirrors Python animate()) ── */
    const CAM_RADIUS = 3.0;
    let frame = 0;

    function animate() {
        requestAnimationFrame(animate);

        frame += 0.35;                            // slow, ambient rotation
        const azim    = (frame * Math.PI) / 180;  // radians
        const cycle   = frame % 360;
        const elevDeg = cycle <= 180
            ? 17 + 0.1 * cycle
            : 35 - 0.1 * (cycle - 180);
        const elevRad = (elevDeg * Math.PI) / 180;

        camera.position.x = CAM_RADIUS * Math.cos(elevRad) * Math.sin(azim);
        camera.position.y = CAM_RADIUS * Math.sin(elevRad);
        camera.position.z = CAM_RADIUS * Math.cos(elevRad) * Math.cos(azim);
        camera.lookAt(0, 0.15, 0);

        renderer.render(scene, camera);
    }

    animate();

    /* ── Resize ────────────────────────────────── */
    window.addEventListener('resize', () => {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
    });
})();
