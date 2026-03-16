import ms from "npm:ms";

document.querySelector<HTMLButtonElement>("#ms-button")!.addEventListener("click", () => {
  const input = document.querySelector<HTMLInputElement>("#ms-input")!.value;
  const result = ms(input);
  document.querySelector<HTMLParagraphElement>("#ms-output")!.textContent = result + " ms";
});