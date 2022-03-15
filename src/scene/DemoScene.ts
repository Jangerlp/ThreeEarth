import * as THREE from "three";

import earthMapIMG from "../assets/earthmap10k.jpg";
import earthBumpIMG from "../assets/earthbump10k.jpg";
import cloudMapIMG from "../assets/earthCloud.png";
import starsMapIMG from "../assets/galaxy.png"

export class DemoScene extends THREE.Scene {
    earth: THREE.Mesh;
    clouds: THREE.Mesh;
    stars: THREE.Mesh;
    sun: THREE.PointLight;

    constructor(onReady: () => void) {
        super();

        this.earth = new THREE.Mesh();
        this.clouds = new THREE.Mesh();
        this.stars = new THREE.Mesh();
        this.sun = new THREE.PointLight();

        this.init().then(() => {
            onReady();
        })
    }

    /**
     * Helper function to initialize the scene
     */
    private async init() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        this.sun = new THREE.PointLight(0xffffff, 1);
        this.sun.position.set(5, 3, 5);

        const textureLoader = new THREE.TextureLoader();

        this.earth = await this.createEarth(textureLoader);
        this.clouds = await this.createClouds(textureLoader);
        this.stars = await this.createStars(textureLoader);

        this.add(this.earth);
        this.add(this.clouds);
        this.add(this.stars);
        this.add(this.sun);
        this.add(ambientLight);
    }

    /**
     * is rendering the earth inside the scene
     *
     * @param textureLoader THREE.Textureloader to load all textures
     */
    private async createEarth(textureLoader: THREE.TextureLoader): Promise<THREE.Mesh> {
        const earthMap = await textureLoader.loadAsync(earthMapIMG);
        const earthBump = await textureLoader.loadAsync(earthBumpIMG);

        const earthGeometry = new THREE.SphereGeometry(0.6, 2000, 2000);
        const earthMaterial = new THREE.MeshPhongMaterial({
            map: earthMap,
            displacementMap: earthBump,
            displacementScale: 0.02
        });

        return new THREE.Mesh(earthGeometry, earthMaterial);
    }

    /**
     * is rendering the clouds inside the scene
     *
     * @param textureLoader THREE.Textureloader to load all textures
     */
    private async createClouds(textureLoader: THREE.TextureLoader): Promise<THREE.Mesh> {
        const cloudMap = await textureLoader.load(cloudMapIMG);

        const cloudGeometry = new THREE.SphereGeometry(0.63, 100, 100);
        const cloudMaterial = new THREE.MeshStandardMaterial({
            map: cloudMap,
            transparent: true
        });

        return new THREE.Mesh(cloudGeometry, cloudMaterial);
    }

    /**
     * is rendering the stars inside the scene
     *
     * @param textureLoader THREE.Textureloader to load all textures
     */
    private async createStars(textureLoader: THREE.TextureLoader): Promise<THREE.Mesh> {
        const starsMap = await textureLoader.load(starsMapIMG);

        const starsGeometry = new THREE.SphereGeometry(80, 64, 64);
        const starsMaterial = new THREE.MeshStandardMaterial({
            map: starsMap,
            side: THREE.BackSide
        })

        return new THREE.Mesh(starsGeometry, starsMaterial);
    }

    /**
     * main loop which handles rotating all objects slightly
     */
    animate() {
        this.earth.rotateY(0.001);
        this.clouds.rotateY(0.0008);
        this.stars.rotateY(-0.0001);
    }
}
