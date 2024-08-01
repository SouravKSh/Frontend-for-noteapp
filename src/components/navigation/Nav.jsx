import "./Nav.css";
import keep from "../../assets/keep.png";

export default function Nav() {
  return (
    <>
      <div className="nav">
        <img src={keep} alt="Google Keep" className="logo" />
        <h1 className="logo-title">Google Keep</h1>
      </div>
    </>
  );
}
