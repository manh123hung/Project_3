import React, { useEffect, useState } from "react";
import Card from "./Card";
import { firestore } from "../../lib/firebase";
import { collection, DocumentData, getDocs } from "firebase/firestore";

const Content: React.FC = () => {
  const [cardsData, setCardsData] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardsRef = await getDocs(collection(firestore, "Content"));
        const fetchedData: DocumentData[] = [];
        cardsRef.forEach((doc) => {
          fetchedData.push(doc.data());
        });
        setCardsData(fetchedData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="col-md-9">
      <div className="row">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            title={card.title || "No Title"}
            description={card.description || "No Description"}
            title2={card.title2 || "No Status"}
          />
        ))}
      </div>
      <div className="pagination-container" style={{ width: "280px", marginLeft: "400px", marginTop: "20px" }}>
        <button className="pagination-arrow" disabled>
          &lt;
        </button>
        <button className="pagination-page active">1</button>
        <button className="pagination-page">2</button>
        <button className="pagination-page">3</button>
        <span className="pagination-dots">...</span>
        <button className="pagination-page">10</button>
        <button className="pagination-arrow">&gt;</button>
      </div>
    </div>
  );
};

export default Content;
