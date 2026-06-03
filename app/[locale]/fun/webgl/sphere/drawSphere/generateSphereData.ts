export const generateSphereData = (
  point: [number, number, number],
  radius: number,
  color: [number, number, number],
  latSegments: number = 16,
  longSegments: number = 16
) => {
  const vertices: number[] = []
  const indices: number[] = []

  const [centerX, centerY, centerZ] = point

  // Generate vertices
  for (let lat = 0; lat <= latSegments; lat++) {
    const theta = (lat * Math.PI) / latSegments // From 0 to PI
    const sinTheta = Math.sin(theta)
    const cosTheta = Math.cos(theta)

    for (let lon = 0; lon <= longSegments; lon++) {
      const phi = (lon * 2 * Math.PI) / longSegments // From 0 to 2PI
      const sinPhi = Math.sin(phi)
      const cosPhi = Math.cos(phi)

      // Calculate the vertex position
      const x = centerX + radius * sinTheta * cosPhi
      const y = centerY + radius * cosTheta
      const z = centerZ + radius * sinTheta * sinPhi

      vertices.push(x, y, z, ...color)
    }
  }

  // Generate indices (two triangles per quad)
  for (let lat = 0; lat < latSegments; lat++) {
    for (let lon = 0; lon < longSegments; lon++) {
      const first = lat * (longSegments + 1) + lon
      const second = first + longSegments + 1

      // First triangle of the quad
      indices.push(first, second, first + 1)

      // Second triangle of the quad
      indices.push(second, second + 1, first + 1)
    }
  }

  return {
    vertices,
    indices,
  }
}
