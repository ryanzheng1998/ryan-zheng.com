import { mat4 } from 'gl-matrix'

export class MvpMatrix {
  projectionMatrix: mat4
  viewMatrix: mat4
  modelMatrix: mat4
  finalMatrix: mat4

  constructor(
    eye: [number, number, number],
    center: [number, number, number],
    up: [number, number, number],
    fovy: number,
    aspect: number,
    near: number,
    far: number
  ) {
    this.projectionMatrix = mat4.create()
    this.viewMatrix = mat4.create()
    this.modelMatrix = mat4.create()
    this.finalMatrix = mat4.create()

    mat4.perspective(this.projectionMatrix, fovy, aspect, near, far)
    mat4.lookAt(this.viewMatrix, eye, center, up)
  }

  setRotate(radX: number, radY: number, radZ: number) {
    mat4.identity(this.modelMatrix)
    mat4.rotateX(this.modelMatrix, this.modelMatrix, radX)
    mat4.rotateY(this.modelMatrix, this.modelMatrix, radY)
    mat4.rotateZ(this.modelMatrix, this.modelMatrix, radZ)
  }

  setLookAt(
    eye: [number, number, number],
    center: [number, number, number],
    up: [number, number, number]
  ) {
    mat4.identity(this.viewMatrix)
    mat4.lookAt(this.viewMatrix, eye, center, up)
  }

  getMatrix() {
    mat4.identity(this.finalMatrix)
    mat4.multiply(this.finalMatrix, this.viewMatrix, this.modelMatrix)
    mat4.multiply(this.finalMatrix, this.projectionMatrix, this.finalMatrix)
    return this.finalMatrix
  }
}
