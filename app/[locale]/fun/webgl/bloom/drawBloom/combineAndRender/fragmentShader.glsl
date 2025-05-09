precision mediump float;

uniform sampler2D u_texture1; // First texture
uniform sampler2D u_texture2; // Second texture
varying vec2 vTexCoord;

void main() {
    vec4 color1 = texture2D(u_texture1, vTexCoord);
    vec4 color2 = texture2D(u_texture2, vTexCoord);
    
    // Combine the two textures (for example, simple addition)
    vec4 combinedColor = color1 + color2 * 1.0;

    gl_FragColor = combinedColor;

}