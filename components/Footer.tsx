export default function Footer() {
  return (
    <footer>
      <div className="bg-white/80 p-2 pointer-events-auto  border-white border-4 z-50 relative leading-none text-lg lg:text-3xl mt-32 max-w-[50ch]">
        dedicated to my abuela who cried the first time i showed her one of my
        websites.
      </div>
      <div className="bg-white/80 border-white border-4 text-base mt-2  p-2 pointer-events-auto z-50 relative w-fit">
        Each crush is recorded onchain. View the contract{" "}
        <a
          href="https://basescan.org/address/0x9B3249313741fa8599dfF15455AD2545c36543dB"
          target="_blank"
          className="underline"
          rel="noreferrer"
        >
          here
        </a>
        . Design, code & smart contract by{" "}
        <a
          href="https://www.kris10cabrera.com/"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          kris10cabrera
        </a>
        .
      </div>
    </footer>
  )
}
