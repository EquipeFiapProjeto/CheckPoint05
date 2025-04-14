// CardProduto.tsx
import React from "react";
import styles from "../styles/CardProduto.module.css";
import Link from "next/link";

// Interface para as props do componente
interface CardProdutoProps {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

// Componente para exibir um card de produto
const CardProduto: React.FC<CardProdutoProps> = ({ id, title, price, thumbnail }) => {
  return (
    <div className={styles.card}>
      <img src={thumbnail} alt={title} className={styles.image} />
      <h2>{title}</h2>
      <p>Preço: ${price}</p>
      <Link href={`/produto/${id}`}>Ver detalhes</Link>
    </div>
  );
};

export default CardProduto;
