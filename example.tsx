export default function Home() {
  return (
    <main className="w-full">
     {/* КНОПКИ */}
     <button className="m-5 p-5 border rounded-xl bg-gradient-to-r from-accent to-accent-light">
        Repeat last booking
      </button>
      <button className="m-5 p-5 rounded-xl bg-gradient-to-r from-light to-sand bg-no-repeat text-accent">
        Create new booking
      </button>
      <button className="p-5 rounded-xl bg-auth-button-bgn">SINGUP</button>

      {/* СОЦІАЛЬНІ */}
      <div className="w-[50px] h-[50px] p-2 rounded-full bg-main-fb-bgn text-main">
        FB
      </div>
      <div className="w-[50px] h-[50px] p-2 rounded-full bg-main-wa-bgn text-main">
        WA
      </div>
      <div className="w-[50px] h-[50px] p-2 rounded-full bg-main-google-bgn text-main">
        G
      </div>

      {/* СТЕПИ */}
      <div className="w-[50px] h-[50px] p-2 rounded-full bg-main-gradient text-main">
        2
      </div>
      <div className="w-[50px] h-[50px] p-2 rounded-full bg-not-active-step text-main">
        3
      </div>

      {/* БОРДЕР */}

      <div className="m-4 border-2 rounded-xl border-secondary">
        <h1 className="text-secondary-placeholder/50">Marta</h1>
      </div>

      <div className="m-4 flex rounded-xl items-center justify-center">
        <div className=" w-full rounded-xl bg-gradient-to-r from-tertial to-main p-1">
          <div className=" rounded-xl bg-white">
            <h1 className="p-2 text-text">Marta</h1>
          </div>
        </div>
      </div>

      <div className="m-4 flex rounded-xl items-center justify-center">
        <div className=" w-full rounded-xl bg-gradient-to-r from-accent-light to-accent p-1">
          <div className=" rounded-xl bg-white">
            <h1 className="p-2 text-text">Marta</h1>
          </div>
        </div>
      </div>
    </main>
  );
}
