import SignInmongo from "./SignInmongo";
import Mainmongo from "./Mainmongo";

function App() {
  const user = localStorage.getItem("isClient");
  return (
    <>
      {user && <Mainmongo />}
      {!user && <SignInmongo />}
    </>
  );
}

export default App;
