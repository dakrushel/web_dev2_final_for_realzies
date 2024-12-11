'use client';
import RNGesus from './components/RNGesus';

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-background">
      {/* Centered Dice Roller Title */}
      <header className="row-start-1 text-center">
        <h1 className="text-4xl font-bold text-white">Dice Roller</h1>
      </header>

      {/* RNGesus Component */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <RNGesus />
      </main>
    </div>
  );
}
