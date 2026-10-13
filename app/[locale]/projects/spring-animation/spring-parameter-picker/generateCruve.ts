export const generateCruve = (config: {
  from: number
  springPosition: number
  stiffness: number
  damping: number
  precision: number
  mass: number
  timeSlowdown: number
  initialVelocity: number
}) => {
  let answer: number[] = [config.from]

  const animationState = {
    position: config.from,
    velocity: config.initialVelocity,
  }

  while (true) {
    const { position, velocity } = animationState
    const {
      springPosition,
      stiffness,
      damping,
      precision,
      mass,
      timeSlowdown,
    } = config
    const timeDelta = 16 / 1000 / Math.max(0.1, timeSlowdown)

    // Cancel animation frame when animation stop
    if (
      Math.abs(velocity) < precision &&
      Math.abs(position - springPosition) < precision
    ) {
      answer.push(springPosition)
      break
    }

    // Prevent non-stop animation
    if (answer.length > 1000) {
      break
    }

    // Apply spring force
    const springForce = (springPosition - position) * stiffness
    const dampingForce = -velocity * damping
    const totalForce = springForce + dampingForce
    const acceleration = totalForce / Math.max(0.1, mass)
    const nextVelocity = velocity + acceleration * timeDelta
    const nextPosition = position + nextVelocity * timeDelta

    if (!Number.isFinite(nextPosition)) break
    answer.push(nextPosition)

    animationState.position = nextPosition
    animationState.velocity = nextVelocity
  }

  return answer
}
