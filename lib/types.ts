export interface Vector {
  x: number
  y: number
}

export interface SpringtifyNumber {
  value: number
  velocity: number
  lastIdealValue: number
  lastIdealVelocity: number
  target: number
  stiffness: number
  damping: number
  precision: number
}
