export const createProgram = (
  gl: WebGLRenderingContext,
  vertexShaderText: string,
  fragmentShaderText: string,
) => {
  //
  // vertex shader
  //
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  if (vertexShader === null) {
    throw new Error("Failed to create shaders");
  }
  gl.shaderSource(vertexShader, vertexShaderText);
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    throw new Error(
      "Failed to compile vertex shader" + gl.getShaderInfoLog(vertexShader),
    );
  }

  //
  // fragment shader
  //
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  if (fragmentShader === null) {
    throw new Error("Failed to create shaders");
  }
  gl.shaderSource(fragmentShader, fragmentShaderText);
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    throw new Error(
      "Failed to compile fragment shader" + gl.getShaderInfoLog(fragmentShader),
    );
  }

  //
  // create program and attach shaders to program
  //
  const program = gl.createProgram();
  if (program === null) {
    throw new Error("Failed to create program");
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  //
  // complete the process of preparing the GPU code for the program's fragment and vertex shaders
  //
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error("Failed to link program" + gl.getProgramInfoLog(program));
  }
  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    throw new Error(
      "Failed to validate program" + gl.getProgramInfoLog(program),
    );
  }

  return program;
};
