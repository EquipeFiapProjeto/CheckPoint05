// DetalheProduto.tsx - Este arquivo define o componente que mostra os detalhes de um único produto
import React from "react"; // Importa a biblioteca React, essencial para criar componentes

// Interface com os dados do produto - Define o formato esperado para as informações do produto que este componente vai receber
interface DetalheProdutoProps {
  title: string; // O título (nome) do produto
  description: string; // A descrição detalhada do produto
  price: number; // O preço do produto (usualmente um número)
  category: string; // A categoria à qual o produto pertence
  rating: number; // A avaliação do produto (geralmente uma nota numérica)
  thumbnail: string; // O endereço (URL) da imagem pequena do produto
}

// Componente para exibir os detalhes do produto - Um componente funcional React que recebe as informações do produto como 'props'
const DetalheProduto: React.FC<DetalheProdutoProps> = ({ title, description, price, category, rating, thumbnail }) => {
  // O 'return' define o que este componente vai renderizar na tela
  return (
    <div> {/* Uma div (container) para agrupar todos os elementos de detalhe do produto */}
      <img
        src={thumbnail} // Define o atributo 'src' da tag 'img' com o endereço da imagem do produto
        alt={title} // Define o atributo 'alt' (texto alternativo para a imagem) com o título do produto (importante para acessibilidade)
        style={{ maxWidth: "300px" }} // Define um estilo inline para limitar a largura máxima da imagem a 300 pixels, garantindo que não fique muito grande
      />
      <h1>{title}</h1> {/* Exibe o título do produto como um cabeçalho de nível 1 */}
      <p>
        <strong>Descrição:</strong> {description} {/* Exibe a descrição do produto. A palavra "Descrição:" fica em negrito */}
      </p>
      <p>
        <strong>Categoria:</strong> {category} {/* Exibe a categoria do produto. A palavra "Categoria:" fica em negrito */}
      </p>
      <p>
        <strong>Preço:</strong> ${price} {/* Exibe o preço do produto, precedido por um símbolo de dólar. A palavra "Preço:" fica em negrito */}
      </p>
      <p>
        <strong>Avaliação:</strong> {rating}/5 {/* Exibe a avaliação do produto, mostrando a nota em relação a um máximo de 5. A palavra "Avaliação:" fica em negrito */}
      </p>
    </div>
  );
};

export default DetalheProduto; // Exporta o componente DetalheProduto para que possa ser usado em outros arquivos