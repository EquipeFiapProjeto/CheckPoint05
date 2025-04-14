"use client";
import { useEffect, useState } from "react";
import api from "../services/api"; // Importa a nossa "ponte API" para falar com o servidor (onde estão os dados dos produtos)
import CardProduto from "../components/CardProduto"; // Importa o componente que mostra um produto individualmente na tela

// Interface de um produto - É como se fosse um "molde" para dizer como um produto deve ser
interface Produto {
  id: number; // Cada produto tem um número único para identificá-lo
  title: string; // O nome do produto
  price: number; // O preço do produto
  thumbnail: string; // O endereço da imagem pequena do produto
}

// Página principal - Este é o componente que vai renderizar a lista de produtos na tela
export default function Home() {
  // useState é um "gancho" do React que nos permite ter variáveis que mudam e fazem a tela se atualizar automaticamente
  // Aqui, 'produtos' é a nossa lista de produtos, e 'setProdutos' é a função que usamos para mudar essa lista
  // Inicialmente, 'produtos' começa como um array vazio ([]) porque ainda não buscamos os dados
  const [produtos, setProdutos] = useState<Produto[]>([]);

  // useEffect é outro "gancho" do React que nos permite executar alguma coisa quando o componente é montado (aparece na tela)
  // ou quando alguma dependência muda (no nosso caso, o array de dependências está vazio ([]), então roda só uma vez ao montar)
  useEffect(() => {
    // Quando o componente é montado, chamamos a nossa "ponte" 'api' para pegar os dados dos produtos do servidor
    api.get("/")
      .then((res) => {
        // 'res' é a resposta do servidor. Dentro dela, os dados dos produtos estão em 'res.data.products'
        // Usamos 'setProdutos' para atualizar a nossa lista de produtos com os dados que vieram do servidor
        setProdutos(res.data.products);
      });
  }, []); // O array vazio aqui significa que este efeito só roda uma vez, quando o componente aparece na tela

  // O 'return' é o que o componente vai mostrar na tela
  return (
    <div style={{ padding: "2rem" }}> {/* Uma div que envolve tudo com um espaçamento interno */}
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}> {/* Um título centralizado com um espaço abaixo */}
        Catálogo de Produtos
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
        {/* Aqui estamos percorrendo a nossa lista de 'produtos' */}
        {produtos.map((produto) => (
          // Para cada 'produto' na lista, vamos renderizar o componente 'CardProduto'
          // Passamos informações do 'produto' para o 'CardProduto' através das 'props' (propriedades)
          <CardProduto
            key={produto.id} // 'key' é importante para o React identificar cada item na lista
            id={produto.id} // Passa o ID do produto para o CardProduto
            title={produto.title} // Passa o título do produto
            price={produto.price} // Passa o preço do produto
            thumbnail={produto.thumbnail} // Passa o link da imagem pequena do produto
          />
        ))}
      </div>
    </div>
  );
}