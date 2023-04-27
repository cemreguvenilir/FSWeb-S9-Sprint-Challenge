// Write your tests here
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import AppFunctional from "./AppFunctional";

test("sanity", () => {
  expect(true).toBe(true);
});

test("hata olmadan render ediliyor", () => {
  render(<AppFunctional />);
});

test("koordinatlar doğru bir şekilde render ediliyor", () => {
  render(<AppFunctional />);
  const koordinat = screen.getByText(/koordinatlar/i);
  expect(koordinat).toHaveTextContent("(2, 2)");
});

test("butonlar görünüyor", () => {
  render(<AppFunctional />);
  const yukarıButon = screen.getByText("YUKARI");
  expect(yukarıButon).toBeInTheDocument();
  const asagiButon = screen.getByText("AŞAĞI");
  expect(asagiButon).toBeInTheDocument();
  const sagButon = screen.getByText("SAĞ");
  expect(sagButon).toBeInTheDocument();
  const solButon = screen.getByText("SOL");
  expect(solButon).toBeInTheDocument();
  const resetButon = screen.getByText("reset");
  expect(resetButon).toBeInTheDocument();
});

test("en soldayken sola tıklandığında hata mesajı alıyor", () => {
  render(<AppFunctional />);
  fireEvent.click(screen.getByTestId("sol-buton"));
  fireEvent.click(screen.getByTestId("sol-buton"));
  expect(screen.getByText("Sola gidemezsiniz")).toBeInTheDocument();
});

test("inputa metin girildiğinde value değişiyor", () => {
  render(<AppFunctional />);
  const mail = screen.getByTestId("mail-input");
  fireEvent.change(mail, { target: { value: "guvenilircemre@gmail.com" } });
  expect(mail.value).toBe("guvenilircemre@gmail.com");
});
