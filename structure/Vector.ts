export class Vector {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  // Get vector length (magnitude)
  mag(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  // Add another vector
  add(vector: Vector): Vector {
    return new Vector(this.x + vector.x, this.y + vector.y)
  }

  // Subtract another vector
  sub(vector: Vector): Vector {
    return new Vector(this.x - vector.x, this.y - vector.y)
  }

  // Scalar multiplication
  mul(scalar: number): Vector {
    return new Vector(this.x * scalar, this.y * scalar)
  }

  // Dot product
  dot(vector: Vector): number {
    return this.x * vector.x + this.y * vector.y
  }

  // Normalize the vector
  normalize(): Vector {
    const mag = this.mag()
    if (mag === 0) {
      throw new Error('Cannot normalize a zero vector')
    }
    return this.mul(1 / mag)
  }

  // Convert to string for easy logging
  toString(): string {
    return `Vector(${this.x}, ${this.y})`
  }
}
