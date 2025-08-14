export function generateGaussianKernel(size: number, sigma: number) {
  const kernel = []
  const halfSize = Math.floor(size / 2)
  const sigma2 = sigma * sigma
  let sum = 0

  for (let i = -halfSize; i <= halfSize; i++) {
    const weight =
      Math.exp((-0.5 * (i * i)) / sigma2) / (Math.sqrt(2 * Math.PI) * sigma)
    kernel.push(weight)
    sum += weight
  }

  // Normalize the kernel so that the sum of all weights equals 1
  for (let i = 0; i < kernel.length; i++) {
    kernel[i]! /= sum
  }

  return kernel
}
