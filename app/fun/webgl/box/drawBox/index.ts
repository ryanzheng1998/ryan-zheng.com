import { createBuffer } from '@/app/fun/webgl/side-effects/createBuffer'
import { createElementBuffer } from '@/app/fun/webgl/side-effects/createElementBuffer'
import { createProgram } from '@/app/fun/webgl/side-effects/createProgram'
import { getGlContext } from '@/app/fun/webgl/side-effects/getGlContext'
import { setAttribute } from '@/app/fun/webgl/side-effects/setAttribute'
import { setUniform } from '@/app/fun/webgl/side-effects/setUniform'
import { useStore } from '../useStore'
import { boxIndices } from './boxIndices'
import { boxVertex } from './boxVertex'
import fragmentShaderText from './fragmentShader.glsl'
import { MvpMatrix } from './MvpMatrix'
import vertexShaderText from './vertexShader.glsl'

const vertexData = boxVertex
const indices = boxIndices

export const drawBox = (canvas: HTMLCanvasElement) => {
  const gl = getGlContext(canvas)

  if (gl instanceof Error) return gl

  const program = createProgram(gl, vertexShaderText, fragmentShaderText)

  createBuffer(gl, vertexData)
  createElementBuffer(gl, indices)

  setAttribute(gl, program, 'position', 3, 6, 0)
  setAttribute(gl, program, 'color', 3, 6, 3)

  gl.useProgram(program)
  gl.enable(gl.DEPTH_TEST)
  gl.enable(gl.CULL_FACE)
  gl.frontFace(gl.CCW)
  gl.cullFace(gl.BACK)

  const mvpMatrix = new MvpMatrix(
    [0, 0, -8],
    [0, 0, 0],
    [0, 1, 0],
    Math.PI / 4,
    canvas.width / canvas.height,
    0.1,
    1000,
  )

  const unsubscribe = useStore.subscribe(
    (x) => [x.rotationX, x.rotationY] as const,
    ([x, y]) => {
      mvpMatrix.setRotate((x / 360) * Math.PI, (y / 360) * Math.PI, 0)

      setUniform(gl, program, 'matrix', mvpMatrix.getMatrix())

      gl.clearColor(0.0, 0.0, 0.0, 1.0)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)
    },
    {
      fireImmediately: true,
    },
  )

  const unsubscribe2 = useStore.subscribe(
    (x) => [x.zoom] as const,
    ([x]) => {
      mvpMatrix.setLookAt([0, 0, -8 * x], [0, 0, 0], [0, 1, 0])

      setUniform(gl, program, 'matrix', mvpMatrix.getMatrix())

      gl.clearColor(0.0, 0.0, 0.0, 1.0)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)
    },
    {
      fireImmediately: true,
    },
  )

  return () => {
    unsubscribe()
    unsubscribe2()

    // Clean up WebGL resources
    gl.deleteProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
    gl.useProgram(null)
  }
}
