import { ChangeLanguage } from "./ChangeLanguage";

export const NavBar = () => {
  return (
    <div className="grid grid-cols-[1fr_auto] place-items-center px-[10%] py-5">
      <h3 className="place-self-start text-xl">Ryan Zheng</h3>
      <ul className="">
        <li>Projects</li>
      </ul>
      <ChangeLanguage />
    </div>
  );
};
