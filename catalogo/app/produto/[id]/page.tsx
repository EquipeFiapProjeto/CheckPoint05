// app/produto/[id]/page.tsx - Este arquivo define a página de detalhes de um produto específico
"use client"; // Marca este componente como um componente do lado do cliente (roda no navegador)
import { useEffect, useState } from "react"; // Importa hooks do React para gerenciar estado e efeitos colaterais
import { useParams } from "next/navigation"; // Importa o hook para acessar os parâmetros da URL (como o ID do produto)
import api from "@/services/api"; // Importa a nossa "ponte" para falar com o servidor (onde os dados dos produtos estão)
import DetalheProduto from "@/components/DetalheProduto"; // Importa o componente que vai mostrar os detalhes do produto

// Interface de um produto - Define a estrutura dos dados de um produto
interface Produto {
  id: number; // Identificador único do produto
  title: string; // Nome do produto
  description: string; // Descrição detalhada do produto
  price: number; // Preço do produto
  category: string; // Categoria à qual o produto pertence
  rating: number; // Avaliação do produto (geralmente uma nota)
  thumbnail: string; // URL da imagem pequena do produto
}

// Componente funcional para exibir os detalhes de um produto
export default function ProdutoDetalhes() {
  // 'useParams()' é um hook do Next.js que nos dá acesso aos parâmetros dinâmicos da rota
  // No nosso caso, '[id]' na pasta 'produto' significa que teremos um parâmetro 'id' na URL
  const { id } = useParams();
  // 'useState' cria uma variável de estado chamada 'produto' e uma função para atualizá-la ('setProduto')
  // Inicialmente, 'produto' é 'null' porque ainda não buscamos os dados do produto
  const [produto, setProduto] = useState<Produto | null>(null);

  // 'useEffect' é um hook que permite executar código com efeitos colaterais (como chamadas de API)
  // O array de dependências '[id]' significa que este efeito será executado sempre que o valor de 'id' mudar
  useEffect(() => {
    // Verificamos se o 'id' existe (para evitar fazer uma chamada de API com um ID inválido)
    if (id) {
      // Usamos a nossa 'api' para fazer uma requisição GET para um endpoint específico
      // A crase (`) permite usar template literals, onde podemos inserir o valor de 'id' na URL
      api.get(`/${id}`)
        .then((res) => {
          // Quando a requisição tem sucesso ('then'), recebemos a resposta ('res') do servidor
          // Assumimos que os dados do produto estão dentro de 'res.data'
          setProduto(res.data); // Atualizamos o estado 'produto' com os dados recebidos
        });
    }
  }, [id]); // O efeito roda novamente se o 'id' na URL mudar

  // O 'return' define o que será renderizado na tela
  return (
    <div style={{ padding: "2rem" }}> {/* Uma div para dar um espaçamento ao redor do conteúdo */}
      {/* Operador ternário: se 'produto' tiver um valor (ou seja, se os dados foram carregados)... */}
      {produto ? (
        // ...renderiza o componente 'DetalheProduto' e passa as informações do produto como 'props' (propriedades)
        <DetalheProduto
          title={produto.title}
          description={produto.description}
          price={produto.price}
          category={produto.category}
          rating={produto.rating}
          thumbnail={produto.thumbnail}
        />
      ) : (
        // ...caso contrário (se 'produto' ainda for 'null', ou seja, os dados estão carregando), mostra uma mensagem de carregamento
        <p>Carregando produto...</p>
      )}
    </div>
  );
}