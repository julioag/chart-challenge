"use client";

import { useEffect, useState } from "react";
import Chart from "../ui/chart";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/database";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const docRef = doc(db, 'investmentEvolutions', 'user1');
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        console.log("Document data:", doc.data()["array"]);
        setData(doc.data()["array"]);
      } else {
        console.log("No such document!");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Gráfico evolución de inversión</h1>
      <Chart data={data} />
    </main>
  );
}
