import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

function DeepSpace() {
    const mountRef = useRef(null);

    useEffect(() => {
        // ==========================================
        // 🌌 THREE.JS SLOW STARFIELD ENGINE
        // ==========================================
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Append canvas to our specific div
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        const starGeo = new THREE.BufferGeometry();
        const starCount = 6000;
        const starVertices = [];

        for(let i=0; i<starCount; i++) {
            starVertices.push(
                (Math.random() - 0.5) * 600, 
                (Math.random() - 0.5) * 600, 
                (Math.random() - 0.5) * 600
            );
        }

        starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, transparent: true, opacity: 0.6 });
        const stars = new THREE.Points(starGeo, starMat);
        scene.add(stars);

        let animationId;
        const animate = () => {
            stars.rotation.y += 0.0005; // Slow ambient rotation
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        animate();

        // Responsive Resizing
        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            starGeo.dispose();
            starMat.dispose();
        };
    }, []);

    return (
        <>
            {/* 3D Background */}
            <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, width: '100%', height: '100%' }}></div>

            <div id="ui-layer" style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                
                {/* EXIT BUTTON */}
                <Link to="/" id="exit-btn" style={{ position: 'absolute', top: '25px', right: '30px', color: '#ff4444', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px', border: '1px solid rgba(255, 68, 68, 0.4)', padding: '8px 16px', borderRadius: '20px', background: 'rgba(15, 20, 30, 0.6)', backdropFilter: 'blur(5px)', transition: 'all 0.3s', zIndex: 2000, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fas fa-door-open"></i> EXIT
                </Link>

                <h2 className="menu-title" style={{ fontSize: '3rem', marginBottom: '10px', color: '#fff', letterSpacing: '4px', textTransform: 'uppercase', textShadow: '0 0 20px rgba(255, 0, 204, 0.5)' }}>Deep Space</h2>
                <div className="subtitle" style={{ color: '#ff00cc', letterSpacing: '2px', marginBottom: '50px' }}>SELECT TARGET CATEGORY</div>

                <div className="card-grid" style={{ width: '80%', maxWidth: '1200px' }}>
                    
                    <Link to="/nebulae" className="module-card card-nebula">
                        <h3 style={{ color: '#ff00cc' }}>Nebulae</h3>
                        <p>Explore stellar nurseries, planetary nebulae, and supernova remnants.</p>
                    </Link>

                    <Link to="/blackholes" className="module-card card-blackhole">
                        <h3 style={{ color: '#ff3333' }}>Black Holes</h3>
                        <p>Simulate event horizons and explore the most extreme objects in the universe.</p>
                    </Link>

                    <Link to="/constellations" className="module-card card-const">
                        <h3 style={{ color: '#ffdd00' }}>Constellations</h3>
                        <p>Discover night sky patterns, mythologies, and astronomical facts.</p>
                    </Link>

                </div>
            </div>
        </>
    );
}

export default DeepSpace;