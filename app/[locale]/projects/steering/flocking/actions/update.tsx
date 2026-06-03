import { clamp } from '@/functions/clamp'
import { Vector } from '@/structure/Vector'
import { useStore, Vehicle } from '../useStore'

const updateVehicle = (vehicle: Vehicle, dt: number): Vehicle => {
  const state = useStore.getState()

  //
  // force
  //
  const seek = state.mousePosition.sub(vehicle.position)

  const speration = state.vehicles
    .filter((v) => v.id !== vehicle.id)
    .filter((v) => v.position.sub(vehicle.position).mag() < 100)
    .map((v) =>
      vehicle.position
        .sub(v.position)
        .normalize()
        .mul(1 / v.position.sub(vehicle.position).mag()),
    )
    .reduce((acc, v) => acc.add(v), new Vector(0, 0))

  const alignment = state.vehicles
    .filter((v) => v.id !== vehicle.id)
    .filter((v) => v.position.sub(vehicle.position).mag() < 100)
    .map((v) => {
      const dist = v.position.sub(vehicle.position).mag()
      return v.velocity.mul(clamp(1 / dist, 0, 1)) // Weight by inverse distance
    })
    .reduce((acc, v) => acc.add(v), new Vector(0, 0))

  const cohesion = state.vehicles
    .filter((v) => v.id !== vehicle.id)
    .filter((v) => v.position.sub(vehicle.position).mag() < 200)
    .map((v) => {
      const offset = v.position.sub(vehicle.position)
      const dist = offset.mag()
      return offset.mul(clamp(1 / dist, 0, 1)) // Weight by inverse distance
    })
    .reduce((acc, v) => acc.add(v), new Vector(0, 0))

  const randomForce = new Vector(state.rand() * 2 - 1, state.rand() * 2 - 1)

  const acceleration = seek
    .mul(0)
    .add(speration.mul(1000))
    .add(alignment.mul(10))
    .add(cohesion.mul(10))
    .add(randomForce.mul(0))

  //
  // velocity
  //
  const v1 = vehicle.velocity.add(acceleration.mul(dt))
  const v2 = v1.mul(1 - state.config.damping * dt)
  const v3 =
    v2.mag() > vehicle.maxSpeed ? v2.normalize().mul(vehicle.maxSpeed) : v2

  //
  // position
  //
  const newPosition = vehicle.position.add(v3.mul(dt))

  //
  // rotation
  //
  const targetAngle = ((Math.atan2(v3.y, v3.x) / Math.PI) * 180) % 360

  return {
    ...vehicle,
    position: newPosition,
    velocity: v3,
    angle: targetAngle,
    positionHistory: [...vehicle.positionHistory, newPosition].slice(-100),
  }
}

export const update = (t1: number) => (t2: number) => {
  const state = useStore.getState()
  const dt = (t2 - t1) / 1000 // Convert milliseconds to seconds

  const newVehicles = state.vehicles.map((vehicle) =>
    updateVehicle(vehicle, dt),
  )

  // Update state
  useStore.setState({
    vehicles: newVehicles,
  })

  // Request next frame update
  const id = requestAnimationFrame(update(t2))
  useStore.setState({ animationId: id })
}
