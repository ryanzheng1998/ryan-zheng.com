// @ts-nocheck
import { generateCylinderVertex } from './generateCylinderVertex'

export const generateWireframe = (
  vertices: number[],
  indices: number[],
  radius: number,
  segment: number = 16,
) => {
  const wireframeVertices: number[] = []
  const wireframeIndices: number[] = []
  let currentIndex = 0

  for (let i = 0; i < indices.length; i += 3) {
    // Get the three vertices of the triangle
    const x1 = vertices[indices[i] * 3]
    const y1 = vertices[indices[i] * 3 + 1]
    const z1 = vertices[indices[i] * 3 + 2]

    const x2 = vertices[indices[i + 1] * 3]
    const y2 = vertices[indices[i + 1] * 3 + 1]
    const z2 = vertices[indices[i + 1] * 3 + 2]

    const x3 = vertices[indices[i + 2] * 3]
    const y3 = vertices[indices[i + 2] * 3 + 1]
    const z3 = vertices[indices[i + 2] * 3 + 2]

    // Generate cylinder for edge 1 (x1 -> x2)
    const { vertices: cylVertices1, indices: cylIndices1 } =
      generateCylinderVertex(x1, y1, z1, x2, y2, z2, radius, [0, 0, 0], segment)

    // Generate cylinder for edge 2 (x2 -> x3)
    const { vertices: cylVertices2, indices: cylIndices2 } =
      generateCylinderVertex(x2, y2, z2, x3, y3, z3, radius, [0, 0, 0], segment)

    // Generate cylinder for edge 3 (x3 -> x1)
    const { vertices: cylVertices3, indices: cylIndices3 } =
      generateCylinderVertex(x3, y3, z3, x1, y1, z1, radius, [0, 0, 0], segment)

    // Add cylinder vertices to the global vertices array
    wireframeVertices.push(...cylVertices1)
    wireframeVertices.push(...cylVertices2)
    wireframeVertices.push(...cylVertices3)

    // Adjust cylinder indices based on the current indexOffset
    const adjustedIndices1 = cylIndices1.map((index) => index + currentIndex)
    const adjustedIndices2 = cylIndices2.map(
      (index) => index + currentIndex + cylVertices1.length / 6, // 6 floats per vertex (x, y, z, r, g, b)
    )
    const adjustedIndices3 = cylIndices3.map(
      (index) =>
        index +
        currentIndex +
        cylVertices1.length / 6 +
        cylVertices2.length / 6,
    )

    wireframeIndices.push(...adjustedIndices1)
    wireframeIndices.push(...adjustedIndices2)
    wireframeIndices.push(...adjustedIndices3)

    // Update currentIndex for the next set of vertices
    currentIndex +=
      cylVertices1.length / 6 +
      cylVertices2.length / 6 +
      cylVertices3.length / 6
  }

  return {
    vertices: wireframeVertices,
    indices: wireframeIndices,
  }
}
