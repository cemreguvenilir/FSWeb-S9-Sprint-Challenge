import React from "react";
import { useState } from "react";
import axios from "axios";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4;

const grid = [
  "(1, 1)",
  "(2, 1)",
  "(3, 1)",
  "(1, 2)",
  "(2, 2)",
  "(3, 2)",
  "(1, 3)",
  "(2, 3)",
  "(3, 3)",
];

export default function AppFunctional(props) {
  const [index, setIndex] = useState(initialIndex);
  const [message, setMessage] = useState(initialMessage);
  const [mail, setMail] = useState(initialEmail);
  const [step, setStep] = useState(initialSteps);
  const [coord, setCoord] = useState({ x: 2, y: 2 });

  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
    return grid[index];
  }

  function getXYMesaj(yon) {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
    if (yon === "left") {
      setMessage("Sola gidemezsiniz");
    } else if (yon === "right") {
      setMessage("Sağa gidemezsiniz");
    } else if (yon === "up") {
      setMessage("Yukarı gidemezsiniz");
    } else if (yon === "down") {
      setMessage("Aşağı gidemezsiniz");
    }
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setIndex(initialIndex);
    setMail(initialEmail);
    setMessage(initialMessage);
    setStep(initialSteps);
    setCoord({ x: 2, y: 2 });
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
  }

  function ilerle(yon) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
    if (yon === "left" && !(index % 3 === 0)) {
      setStep(step + 1);
      setIndex(index - 1);
    } else if (yon === "right" && !(index % 3 === 2)) {
      setStep(step + 1);
      setIndex(index + 1);
    } else if (yon === "up" && index / 3 >= 1) {
      setStep(step + 1);
      setIndex(index - 3);
    } else if (yon === "down" && index / 3 < 2) {
      setStep(step + 1);
      setIndex(index + 3);
    } else getXYMesaj(yon);
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz

    setMail(evt.target.value);
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    evt.preventDefault();
    const formData = {
      x: coord.x,
      y: coord.y,
      steps: step,
      email: mail,
    };
    axios
      .post("http://localhost:9000/api/result", formData)
      .then((response) => {
        console.log(response.data.message);
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      })
      .finally(() => {
        setMail(initialEmail);
      });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar {getXY()} </h3>
        <h3 id="steps">{step} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message} </h3>
      </div>
      <div id="keypad">
        <button onClick={(e) => ilerle(e.target.id)} id="left">
          SOL
        </button>
        <button onClick={(e) => ilerle(e.target.id)} id="up">
          YUKARI
        </button>
        <button onClick={(e) => ilerle(e.target.id)} id="right">
          SAĞ
        </button>
        <button onClick={(e) => ilerle(e.target.id)} id="down">
          AŞAĞI
        </button>
        <button onClick={() => reset()} id="reset">
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          onChange={(e) => onChange(e)}
          value={mail}
          id="email"
          type="email"
          placeholder="email girin"
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
