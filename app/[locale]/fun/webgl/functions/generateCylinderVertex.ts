export const generateCylinderVertex = (
  x1: number,
  y1: number,
  z1: number, // Start point
  x2: number,
  y2: number,
  z2: number, // End point
  radius: number,
  color: [number, number, number], // Color at start point (r, g, b)
  segment: number = 16
) => {
  const vertices: number[] = []
  const indices: number[] = []

  // Calculate the direction vector from start to end
  const dirX = x2 - x1
  const dirY = y2 - y1
  const dirZ = z2 - z1

  // Normalize the direction vector
  const length = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ)
  const normDirX = dirX / length
  const normDirY = dirY / length
  const normDirZ = dirZ / length

  // Find a vector perpendicular to the direction vector
  // (This step is arbitrary; any vector not parallel to (dirX, dirY, dirZ) will work)
  let perpX = -normDirY
  let perpY = normDirX
  let perpZ = 0

  // If the direction vector is vertical, choose a different perpendicular vector
  if (dirX === 0 && dirY === 0) {
    perpX = 1
    perpY = 0
    perpZ = 0
  }

  // Normalize the perpendicular vector
  const perpLength = Math.sqrt(perpX * perpX + perpY * perpY + perpZ * perpZ)
  perpX /= perpLength
  perpY /= perpLength
  perpZ /= perpLength

  // Calculate a second perpendicular vector using a cross product
  const perp2X = normDirY * perpZ - normDirZ * perpY
  const perp2Y = normDirZ * perpX - normDirX * perpZ
  const perp2Z = normDirX * perpY - normDirY * perpX

  // Generate the base and top circles
  for (let i = 0; i <= segment; i++) {
    const theta = (i * 2 * Math.PI) / segment
    const cosTheta = Math.cos(theta)
    const sinTheta = Math.sin(theta)

    // Base circle vertex
    const baseX = x1 + radius * (perpX * cosTheta + perp2X * sinTheta)
    const baseY = y1 + radius * (perpY * cosTheta + perp2Y * sinTheta)
    const baseZ = z1 + radius * (perpZ * cosTheta + perp2Z * sinTheta)

    // Top circle vertex
    const topX = x2 + radius * (perpX * cosTheta + perp2X * sinTheta)
    const topY = y2 + radius * (perpY * cosTheta + perp2Y * sinTheta)
    const topZ = z2 + radius * (perpZ * cosTheta + perp2Z * sinTheta)

    // Push vertices for the base and top circles
    vertices.push(baseX, baseY, baseZ, ...color) // Base vertex
    vertices.push(topX, topY, topZ, ...color) // Top vertex
  }

  // Generate the side faces (two triangles per quad)
  for (let i = 0; i < segment; i++) {
    const first = i * 2
    const second = first + 2

    // First triangle of the quad
    indices.push(first, second, first + 1)

    // Second triangle of the quad
    indices.push(second, second + 1, first + 1)
  }

  return {
    vertices,
    indices,
  }
}
