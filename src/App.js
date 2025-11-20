import React, { useState } from "react";
import "./App.css";


export default function LuxWarsztat() {
    const initialProducts = [
        { id: 1, name: "Tarcza hamulcowa", start: 12 },
        { id: 2, name: "Łożysko kulkowe", start: 7 },
        { id: 3, name: "Klocki hamulcowe", start: 16 },
        { id: 4, name: "Amortyzator", start: 9 },
        { id: 5, name: "Filtr oleju", start: 14 },
        { id: 6, name: "Pasek rozrządu", start: 6 },
        { id: 7, name: "Pompa wody", start: 11 },
        { id: 8, name: "Świeca zapłonowa", start: 16 },
        { id: 9, name: "Tłumik", start: 8 },
    ];


    const [products, setProducts] = useState(
        initialProducts.map((p) => ({ ...p, qty: p.start }))
    );


    const increase = (id) => {
        setProducts((prev) =>
            prev.map((p) =>
                p.id === id && p.qty < p.start ? { ...p, qty: p.qty + 1 } : p
            )
        );
    };


    const decrease = (id) => {
        setProducts((prev) =>
            prev.map((p) =>
                p.id === id && p.qty > 0 ? { ...p, qty: p.qty - 1 } : p
            )
        );
    };


    const taken = products.filter((p) => p.qty < p.start);
    const shortages = products.filter((p) => p.qty === 0);


    const handleConfirm = () => {
        console.log("Zabrane przedmioty:");
        taken.forEach((t) =>
            console.log(`${t.name} - ${t.start - t.qty} szt.`)
        );


        if (shortages.length > 0) {
            const list = shortages.map((s) => s.name).join("");
            alert(`Brakuje przedmiotów: ${list}`);
        }
    };


    return (
        <div className="container">
            <h1 className="header">LUX WARSZTAT</h1>


            <div className="grid">
                {products.map((p) => (
                    <div className="card" key={p.id}>
                        <div className="placeholder">Zdjęcie</div>
                        <div className="name">{p.name}</div>
                        <div className="qty">Ilość: {p.qty}</div>
                        <div className="btns">
                            <button
                                className="btn minus"
                                onClick={() => increase(p.id)}
                                disabled={p.qty >= p.start}
                            >
                                -
                            </button>
                            <button
                                className="btn plus"
                                onClick={() => decrease(p.id)}
                                disabled={p.qty <= 0}
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            {taken.length > 0 && (
                <div className="taken-box">
                    <strong>Zabierasz:</strong>
                    <div>
                        {taken.map((t) => (
                            <div key={t.id}>
                                {t.name} – {t.start - t.qty} szt.
                            </div>
                        ))}
                    </div>
                </div>
            )}


            {shortages.length > 0 && (
                <div className="alert-box">
                    <strong>Brakuje przedmiotów:</strong>
                    <div>
                        {shortages.map((s) => (
                            <div key={s.id}>{s.name}</div>
                        ))}
                    </div>
                </div>
            )}


            <button className="confirm" onClick={handleConfirm}>
                Zatwierdź
            </button>
        </div>
    );
}