precision mediump float;

uniform sampler2D uTexture;
uniform float u_blurAmount_x;
uniform float u_blurAmount_y;
varying vec2 vTexCoord;

uniform float uWeights[1000];
uniform float uKernelSize; 

void main() {
    vec4 color = vec4(0.0);

    for (int i = 0; i <= 1000; i++) {
        if (i >= int(uKernelSize)) {
            break;
        }
        color += texture2D(uTexture, vTexCoord + vec2((0.0, float(i) - uKernelSize / 2.0) * u_blurAmount_y)) * uWeights[i];
    }

    gl_FragColor = color * 2.0;
}