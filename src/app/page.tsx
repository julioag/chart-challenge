"use client";

import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Chart from "../ui/chart";

const firebaseConfig = {
  apiKey: "AIzaSyArGiRgGd2MfE65_9sjE2QX49gt1sP0GmA",
  authDomain: "racional-exam.firebaseapp.com",
  databaseURL: "https://racional-exam.firebaseio.com",
  projectId: "racional-exam",
  storageBucket: "racional-exam.appspot.com",
  messagingSenderId: "669314004725",
  appId: "1:669314004725:web:48bd14a97d7db43c91f7bc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
    // Limpiar el oyente al desmontar el componente
    return () => unsubscribe();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Gráfico evolución de inversión</h1>
      <Chart data={data} />
    </main>
  );
}
