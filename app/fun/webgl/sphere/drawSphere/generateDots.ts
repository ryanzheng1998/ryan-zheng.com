import { generateSphereData } from './generateSphereData'

export const generateDots = (
  vertexData: number[],
  radius: number,
  latSegments: number = 16,
  longSegments: number = 16
) => {
  const vertices: number[] = []
  const indices: number[] = []

  const vertexStride = 6 // Position [x, y, z] and color [r, g, b]
  const sphereCount = vertexData.length / vertexStride

  let indexOffset = 0

  for (let i = 0; i < sphereCount; i++) {
    const baseIndex = i * vertexStride

    const point: [number, number, number] = [
      vertexData[baseIndex],
      vertexData[baseIndex + 1],
      vertexData[baseIndex + 2],
    ]
    const color: [number, number, number] = [
      vertexData[baseIndex + 3],
      vertexData[baseIndex + 4],
      vertexData[baseIndex + 5],
    ]

    const { vertices: sphereVertices, indices: sphereIndices } =
      generateSphereData(point, radius, color, latSegments, longSegments)

    // Add sphere vertices to the global vertices array
    vertices.push(...sphereVertices)

    // Adjust sphere indices based on the current indexOffset
    const adjustedIndices = sphereIndices.map((index) => index + indexOffset)
    indices.push(...adjustedIndices)

    // Update indexOffset for the next sphere
    indexOffset += sphereVertices.length / vertexStride
  }

  return {
    vertices,
    indices,
  }
}
