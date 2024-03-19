import { useState } from "react";

function Home() {
  const [beijos, setBeijos] = useState("");

  function handleClick() {
    setBeijos(beijos + "😘");
  }

  return (
    <>
      <h1>🥰 Te amo meu amô linduuuu!!!</h1>
      <h1>Se você também me ama, da uma risadinha! 🤭</h1>
      <button onClick={handleClick}>Clique aqui para ganhar um beijinho</button>
      <h1>{beijos}</h1>
    </>
  );
}

export default Home;
