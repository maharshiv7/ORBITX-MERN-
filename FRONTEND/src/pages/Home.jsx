import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import * as THREE from 'three';

function Home() {
    // State: Check karne ke liye ki user ne 'Tap' kiya ya nahi
    const [entered, setEntered] = useState(false);
    
    // Refs: Canvas aur speed ko control karne ke liye
    const mountRef = useRef(null);
    const speedRef = useRef(0.5); // Shuru mein stars fast rahenge

    useEffect(() => {
        // ==========================================
        // 🌌 THREE.JS STARFIELD ENGINE
        // ==========================================
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

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
        const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, transparent: true, opacity: 0.8 });
        const stars = new THREE.Points(starGeo, starMat);
        scene.add(stars);

        let animationId;
        const animate = () => {
            const positions = starGeo.attributes.position.array;
            for(let i=0; i<starCount; i++) {
                let zIndex = i * 3 + 2; 
                positions[zIndex] += speedRef.current; // Speed ref se control hogi
                if(positions[zIndex] > 200) positions[zIndex] = -400;
            }
            starGeo.attributes.position.needsUpdate = true;
            stars.rotation.z += 0.001;
            
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        animate();

        // Window resize fix
        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        // Cleanup function (React best practice)
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            if(mountRef.current) mountRef.current.removeChild(renderer.domElement);
            starGeo.dispose();
            starMat.dispose();
        };
    }, []);

    // Jab user screen par tap karega
    const handleEnter = () => {
        setEntered(true);
        speedRef.current = 0.1; // Warp speed kam kardo
    };

    return (
        <>
            {/* 3D Background */}
            <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, width: '100%', height: '100%' }}></div>

            <div id="ui-layer" style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                
                {/* Navbar */}
                <Navbar />
                
                {/* Conditional Rendering: Agar enter nahi kiya toh Landing Page dikhao */}
                {!entered ? (
                    <div id="landing-screen" onClick={handleEnter} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, cursor: 'pointer' }}>
                        <h1 className="main-title">Welcome to OrbitX</h1>
                        <div className="pulse-text">Tap anywhere to continue</div>
                    </div>
                ) : (
                    // Agar tap kar diya toh Main Menu dikhao
                    <div id="main-menu" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '120px', paddingBottom: '80px', width: '100%', animation: 'fadeIn 1s ease' }}>
                        <h2 className="menu-title">Select Intelligence Module</h2>
                        <div className="card-grid">
                            
                            <Link to="/planets" className="module-card">
                                <h3>Solar System</h3>
                                <p>Interactive 3D orrery featuring all major planets, their data, and orbital mechanics.</p>
                            </Link>

                            <Link to="/deepspace" className="module-card" style={{ borderColor: 'rgba(255, 0, 204, 0.3)' }}>
                                <h3 style={{ color: '#ff00cc' }}>Deep Space</h3>
                                <p>Explore Nebulae, Black Holes, and Constellations across the universe.</p>
                            </Link>

                            <Link to="/exoplanets" className="module-card" style={{ borderColor: 'rgba(0, 255, 136, 0.3)' }}>
                                <h3 style={{ color: '#00ff88' }}>
                                    Exoplanets <i className="fas fa-lock" style={{ fontSize: '16px', marginLeft: '5px' }}></i>
                                </h3>
                                <p>Live query engine. Filter thousands of alien worlds using NASA's massive database.</p>
                            </Link>

                            <Link to="/classified" className="module-card" style={{ borderColor: 'rgba(255, 68, 68, 0.3)' }}>
                                <h3 style={{ color: '#ff4444' }}>
                                    Classified <i className="fas fa-lock" style={{ fontSize: '16px', marginLeft: '5px' }}></i>
                                </h3>
                                <p>Top Secret FBI/NASA dossiers. Cosmic anomalies and unsolved mysteries.</p>
                            </Link>

                            <Link to="/neo" className="module-card" style={{ borderColor: 'rgba(255, 170, 0, 0.3)' }}>
                                <h3 style={{ color: '#ffaa00' }}>NEO Radar</h3>
                                <p>Live NASA telemetry. Track potentially hazardous asteroids approaching Earth in real-time.</p>
                            </Link>
                            
                            <Link to="/solar" className="module-card" style={{ borderColor: 'rgba(255, 221, 0, 0.3)' }}>
                                <h3 style={{ color: '#ffdd00' }}>Solar Weather</h3>
                                <p>NASA DONKI Telemetry. Monitor Coronal Mass Ejections (CME) and geomagnetic threats.</p>
                            </Link>

                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Home;