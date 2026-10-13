import { useStore } from './useStore'

export const Inputs = () => {
  const state = useStore()
  return (
    <div className="grid w-full min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)_4rem] items-center gap-x-3 gap-y-4 text-xs sm:text-sm">
      <label className="justify-self-end">From</label>
      <input
        aria-label="From"
        className="w-full min-w-0 accent-[#183e35]"
        type="range"
        min={0}
        max={500}
        value={state.from}
        onChange={(e) => {
          state.setState({ from: Number(e.target.value) })
        }}
      />
      <input
        className="w-16 rounded border border-neutral-300 bg-white p-1"
        aria-label="From value"
        type="number"
        value={state.from}
        onChange={(e) => {
          state.setState({ from: Number(e.target.value) })
        }}
      />

      <label className="justify-self-end">Spring Position</label>
      <input
        aria-label="Spring Position"
        className="w-full min-w-0 accent-[#183e35]"
        type="range"
        min={0}
        max={500}
        value={state.springPosition}
        onChange={(e) => {
          state.setState({ springPosition: Number(e.target.value) })
        }}
      />
      <input
        className="w-16 rounded border border-neutral-300 bg-white p-1"
        aria-label="Spring Position value"
        type="number"
        value={state.springPosition}
        onChange={(e) => {
          state.setState({ springPosition: Number(e.target.value) })
        }}
      />

      <label className="justify-self-end">Stiffness</label>
      <input
        aria-label="Stiffness"
        className="w-full min-w-0 accent-[#183e35]"
        type="range"
        min={0}
        max={500}
        value={state.stiffness}
        onChange={(e) => {
          state.setState({ stiffness: Number(e.target.value) })
        }}
      />
      <input
        className="w-16 rounded border border-neutral-300 bg-white p-1"
        aria-label="Stiffness value"
        type="number"
        value={state.stiffness}
        onChange={(e) => {
          state.setState({ stiffness: Number(e.target.value) })
        }}
      />

      <label className="justify-self-end">Damping</label>
      <input
        aria-label="Damping"
        className="w-full min-w-0 accent-[#183e35]"
        type="range"
        min={0}
        max={100}
        value={state.damping}
        onChange={(e) => {
          state.setState({ damping: Number(e.target.value) })
        }}
      />
      <input
        className="w-16 rounded border border-neutral-300 bg-white p-1"
        aria-label="Damping value"
        type="number"
        value={state.damping}
        onChange={(e) => {
          state.setState({ damping: Number(e.target.value) })
        }}
      />

      <label className="justify-self-end">Precision</label>
      <input
        aria-label="Precision"
        className="w-full min-w-0 accent-[#183e35]"
        type="range"
        min={0}
        max={1}
        step={0.005}
        value={state.precision}
        onChange={(e) => {
          state.setState({ precision: Number(e.target.value) })
        }}
      />
      <input
        className="w-16 rounded border border-neutral-300 bg-white p-1"
        aria-label="Precision value"
        type="number"
        value={state.precision}
        onChange={(e) => {
          state.setState({ precision: Number(e.target.value) })
        }}
      />

      <label className="justify-self-end">Mass</label>
      <input
        aria-label="Mass"
        className="w-full min-w-0 accent-[#183e35]"
        type="range"
        min={0}
        max={10}
        value={state.mass}
        onChange={(e) => {
          state.setState({ mass: Number(e.target.value) })
        }}
      />
      <input
        className="w-16 rounded border border-neutral-300 bg-white p-1"
        aria-label="Mass value"
        type="number"
        value={state.mass}
        onChange={(e) => {
          state.setState({ mass: Number(e.target.value) })
        }}
      />

      <label className="justify-self-end">Time Slow Down</label>
      <input
        aria-label="Time Slow Down"
        className="w-full min-w-0 accent-[#183e35]"
        type="range"
        min={0.1}
        max={3}
        step={0.1}
        value={state.timeSlowdown}
        onChange={(e) => {
          state.setState({ timeSlowdown: Number(e.target.value) })
        }}
      />
      <input
        className="w-16 rounded border border-neutral-300 bg-white p-1"
        aria-label="Time Slow Down value"
        type="number"
        value={state.timeSlowdown}
        onChange={(e) => {
          state.setState({ timeSlowdown: Number(e.target.value) })
        }}
      />

      <label className="justify-self-end">Initial Velocity</label>
      <input
        aria-label="Initial Velocity"
        className="w-full min-w-0 accent-[#183e35]"
        type="range"
        min={-100}
        max={100}
        value={state.initialVelocity}
        onChange={(e) => {
          state.setState({ initialVelocity: Number(e.target.value) })
        }}
      />
      <input
        className="w-16 rounded border border-neutral-300 bg-white p-1"
        aria-label="Initial Velocity value"
        type="number"
        value={state.initialVelocity}
        onChange={(e) => {
          state.setState({ initialVelocity: Number(e.target.value) })
        }}
      />
    </div>
  )
}
