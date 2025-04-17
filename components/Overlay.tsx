export default function Overlay() {
  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 1; }
            100% { opacity: 0.3; }
          }
        `}
      </style>
      <div
        className={` 
          fixed 
          inset-0 
          z-[100] 
          pointer-events-none 
          bg-neutral-900/20 
          backdrop-blur-md
          opacity-[0.3]
          transition-opacity
          duration-[5000s]
          animate-[fadeIn_5s]
        `}
      />
    </>
  )
}
