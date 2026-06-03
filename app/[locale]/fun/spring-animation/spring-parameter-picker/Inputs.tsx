import { useStore } from "./useStore";

export const Inputs = () => {
  const state = useStore();
  return (
    <div className="grid grid-cols-[auto_auto_auto] gap-3">
      <label className="justify-self-end">From</label>
      <input
        type="range"
        min={0}
        max={500}
        value={state.from}
        onChange={(e) => {
          state.setState({ from: Number(e.target.value) });
        }}
      />
      <input
        className="w-20"
        type="number"
        value={state.from}
        onChange={(e) => {
          state.setState({ from: Number(e.target.value) });
        }}
      />

      <label className="justify-self-end">Spring Position</label>
      <input
        type="range"
        min={0}
        max={500}
        value={state.springPosition}
        onChange={(e) => {
          state.setState({ springPosition: Number(e.target.value) });
        }}
      />
      <input
        className="w-20"
        type="number"
        value={state.springPosition}
        onChange={(e) => {
          state.setState({ springPosition: Number(e.target.value) });
        }}
      />

      <label className="justify-self-end">Stiffness</label>
      <input
        type="range"
        min={0}
        max={500}
        value={state.stiffness}
        onChange={(e) => {
          state.setState({ stiffness: Number(e.target.value) });
        }}
      />
      <input
        className="w-20"
        type="number"
        value={state.stiffness}
        onChange={(e) => {
          state.setState({ stiffness: Number(e.target.value) });
        }}
      />

      <label className="justify-self-end">Damping</label>
      <input
        type="range"
        min={0}
        max={100}
        value={state.damping}
        onChange={(e) => {
          state.setState({ damping: Number(e.target.value) });
        }}
      />
      <input
        className="w-20"
        type="number"
        value={state.damping}
        onChange={(e) => {
          state.setState({ damping: Number(e.target.value) });
        }}
      />

      <label className="justify-self-end">Precision</label>
      <input
        type="range"
        min={0}
        max={1}
        step={0.005}
        value={state.precision}
        onChange={(e) => {
          state.setState({ precision: Number(e.target.value) });
        }}
      />
      <input
        className="w-20"
        type="number"
        value={state.precision}
        onChange={(e) => {
          state.setState({ precision: Number(e.target.value) });
        }}
      />

      <label className="justify-self-end">Mass</label>
      <input
        type="range"
        min={0}
        max={10}
        value={state.mass}
        onChange={(e) => {
          state.setState({ mass: Number(e.target.value) });
        }}
      />
      <input
        className="w-20"
        type="number"
        value={state.mass}
        onChange={(e) => {
          state.setState({ mass: Number(e.target.value) });
        }}
      />

      <label className="justify-self-end">Time Slow Down</label>
      <input
        type="range"
        min={0.1}
        max={3}
        step={0.1}
        value={state.timeSlowdown}
        onChange={(e) => {
          state.setState({ timeSlowdown: Number(e.target.value) });
        }}
      />
      <input
        className="w-20"
        type="number"
        value={state.timeSlowdown}
        onChange={(e) => {
          state.setState({ timeSlowdown: Number(e.target.value) });
        }}
      />

      <label className="justify-self-end">Initial Velocity</label>
      <input
        type="range"
        min={-100}
        max={100}
        value={state.initialVelocity}
        onChange={(e) => {
          state.setState({ initialVelocity: Number(e.target.value) });
        }}
      />
      <input
        className="w-20"
        type="number"
        value={state.initialVelocity}
        onChange={(e) => {
          state.setState({ initialVelocity: Number(e.target.value) });
        }}
      />
    </div>
  );
};
