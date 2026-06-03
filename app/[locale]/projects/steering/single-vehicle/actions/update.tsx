import { useStore } from '../useStore'

export const update = (t1: number) => (t2: number) => {
  const state = useStore.getState()
  const dt = (t2 - t1) / 1000 // Convert milliseconds to seconds

  // Update position
  const newPositionX = state.vehicle.position.x + state.vehicle.velocity.x * dt
  const newPositionY = state.vehicle.position.y + state.vehicle.velocity.y * dt

  // Compute acceleration based on mouse attraction
  let accelerationX = (state.mousePosition.x - state.vehicle.position.x) * 10
  let accelerationY = (state.mousePosition.y - state.vehicle.position.y) * 10

  const accelerationMagnitude = Math.sqrt(
    accelerationX ** 2 + accelerationY ** 2,
  )

  // Limit acceleration if it exceeds MAX_FORCE
  if (accelerationMagnitude > state.vehicle.maxForce) {
    const scale = state.vehicle.maxForce / accelerationMagnitude
    accelerationX *= scale
    accelerationY *= scale
  }

  // Apply acceleration to velocity properly using dt
  let newVelocityX = state.vehicle.velocity.x + accelerationX * dt
  let newVelocityY = state.vehicle.velocity.y + accelerationY * dt

  // Apply damping (decay velocity over time)
  newVelocityX *= 1 - state.config.damping * dt
  newVelocityY *= 1 - state.config.damping * dt

  // Compute velocity magnitude
  const velocityMagnitude = Math.sqrt(newVelocityX ** 2 + newVelocityY ** 2)

  // Limit velocity if it exceeds MAX_VELOCITY
  if (velocityMagnitude > state.vehicle.maxSpeed) {
    const scale = state.vehicle.maxSpeed / velocityMagnitude
    newVelocityX *= scale
    newVelocityY *= scale
  }

  const targetAngle =
    ((Math.atan2(newVelocityY, newVelocityX) / Math.PI) * 180) % 360

  // Update state
  useStore.setState({
    vehicle: {
      ...state.vehicle,
      position: { x: newPositionX, y: newPositionY },
      velocity: { x: newVelocityX, y: newVelocityY },
      angle: targetAngle,
      positionHistory: [
        ...state.vehicle.positionHistory,
        { x: newPositionX, y: newPositionY },
      ].slice(-100),
    },
    history: [
      ...state.history,
      { position: { x: newPositionX, y: newPositionY }, angle: targetAngle },
    ],
  })

  // Request next frame update
  const id = requestAnimationFrame(update(t2))
  useStore.setState({ animationId: id })
}
