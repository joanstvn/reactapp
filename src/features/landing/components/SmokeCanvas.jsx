import { useEffect, useRef } from 'react';

/* ── WebGL Shader: Humo interactivo en paleta púrpura de softapp ── */
const VERTEX_SHADER_SRC = `
    attribute vec2 a_pos;
    void main() {
        gl_Position = vec4(a_pos, 0.0, 1.0);
    }
`;

const FRAGMENT_SHADER_SRC = `
    precision highp float;
    uniform vec2  u_resolution;
    uniform float u_time;
    uniform float u_intensity;

    float hash(vec2 p){
        vec3 p3 = fract(vec3(p.xyx) * 0.1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
    }
    float noise(vec2 p){
        vec2 i = floor(p); vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    float fbm(vec2 p){
        float v = 0.0; float amp = 0.5;
        for(int i = 0; i < 4; i++){
            v += amp * noise(p);
            p *= 2.0;
            amp *= 0.5;
        }
        return v;
    }

    void main(){
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 p = uv;
        p.x *= aspect;

        float t = u_time * 0.045;

        vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(4.3, -t * 0.7)));
        float n  = fbm(p * 1.1 + 1.4 * q + vec2(t * 0.30, 0.0));
        float n2 = fbm(p * 1.8 + 1.1 * q + vec2(-t * 0.25, t * 0.20));

        vec3 purpleTop = vec3(0.48, 0.12, 0.82); // #7b1fd1
        vec3 purpleMid = vec3(0.66, 0.38, 0.94); // #a861f0
        vec3 white     = vec3(0.984, 0.984, 0.992);

        float vert = uv.y;
        vec3 col = mix(white, purpleMid, smoothstep(0.0, 0.8, vert));
        col = mix(col, purpleTop, smoothstep(0.5, 1.0, vert));

        float bloom = smoothstep(0.46, 0.92, n2);
        col = mix(col, white, bloom * 0.85 * (1.0 - vert * 0.35));

        float diag = p.x * 0.6 + p.y * 0.4;
        float streak = smoothstep(0.48, 1.0, n + 0.30 * sin(diag * 2.4 - t * 1.3));
        col = mix(col, white, streak * 0.50);

        col = mix(col, purpleTop, smoothstep(0.6, 1.0, n) * 0.25 * vert);

        float vig = smoothstep(1.35, 0.25, length(uv - vec2(0.5, 0.55)));
        col = mix(col, col * 1.02, vig);

        float gseed = mod(floor(u_time * 16.0), 1024.0);
        float g = hash(gl_FragCoord.xy + gseed);
        col += (g - 0.5) * 0.02;

        col = mix(col, mix(col, white, 0.45), 1.0 - u_intensity);

        gl_FragColor = vec4(col, 1.0);
    }
`;

export const SmokeCanvas = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
        if (!gl) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function compileShader(type, src) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, src);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.warn(gl.getShaderInfoLog(shader));
                return null;
            }
            return shader;
        }

        const vertShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
        const fragShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
        if (!vertShader || !fragShader) return;

        const program = gl.createProgram();
        gl.attachShader(program, vertShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
        gl.useProgram(program);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

        const aPos = gl.getAttribLocation(program, 'a_pos');
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        const uRes = gl.getUniformLocation(program, 'u_resolution');
        const uTime = gl.getUniformLocation(program, 'u_time');
        const uIntensity = gl.getUniformLocation(program, 'u_intensity');

        gl.uniform1f(uIntensity, 1.0);

        const scale = 0.5;
        function resize() {
            const width = Math.max(2, Math.floor(container.clientWidth * scale));
            const height = Math.max(2, Math.floor(container.clientHeight * scale));
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
                gl.viewport(0, 0, width, height);
            }
            gl.uniform2f(uRes, width, height);
        }

        resize();
        container.setAttribute('data-ready', '');
        window.addEventListener('resize', resize);

        const BASE_SPEED = 1;
        const MAX_BOOST = 11;
        const BOOST_SCALE = 1.9;
        const SMOOTHING = 0.08;
        const DECAY = 0.92;

        let timeOffset = 45;
        let speed = BASE_SPEED;
        let mouseBoost = 0;
        let lastTime = performance.now();
        let lastX = 0;
        let lastY = 0;
        let lastTimestamp = 0;
        let hasPointerMoved = false;

        function onPointerMove(e) {
            const now = performance.now();
            if (hasPointerMoved) {
                const dt = now - lastTimestamp;
                if (dt > 0) {
                    const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
                    const vel = dist / dt;
                    mouseBoost = Math.min(MAX_BOOST, vel * BOOST_SCALE);
                }
            }
            lastX = e.clientX;
            lastY = e.clientY;
            lastTimestamp = now;
            hasPointerMoved = true;
        }

        window.addEventListener('pointermove', onPointerMove, { passive: true });

        function render() {
            gl.uniform1f(uTime, timeOffset);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        }

        let animFrameId = 0;
        let isVisible = true;

        function loop() {
            const now = performance.now();
            let dt = (now - lastTime) / 1000;
            lastTime = now;
            if (dt > 0.1) dt = 0.1;

            mouseBoost *= DECAY;
            speed += (BASE_SPEED + mouseBoost - speed) * SMOOTHING;
            timeOffset += dt * speed;

            render();

            if (isVisible && !prefersReducedMotion) {
                animFrameId = requestAnimationFrame(loop);
            }
        }

        const observer = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
            if (isVisible && !prefersReducedMotion) {
                cancelAnimationFrame(animFrameId);
                lastTime = performance.now();
                animFrameId = requestAnimationFrame(loop);
            }
        }, { threshold: 0 });

        observer.observe(container);

        if (prefersReducedMotion) {
            render();
        } else {
            animFrameId = requestAnimationFrame(loop);
        }

        return () => {
            cancelAnimationFrame(animFrameId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('pointermove', onPointerMove);
            observer.disconnect();
        };
    }, []);

    return (
        <div className="hero__gradient" ref={containerRef}>
            <canvas ref={canvasRef} className="hero__smoke-canvas" aria-hidden="true" />
            <div className="hero__grain" aria-hidden="true" />
        </div>
    );
};
