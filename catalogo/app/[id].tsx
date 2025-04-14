// [id].tsx - Este arquivo representa a página de detalhes de um produto específico, usando um ID dinâmico na URL
"use client"; // Marca este componente para ser renderizado no navegador (client-side rendering)
import { useRouter } from "next/router"; // Importa o hook 'useRouter' do Next.js para acessar informações da rota, como os parâmetros da URL
import { useEffect, useState } from "react"; // Importa hooks do React para gerenciar o estado do componente e executar efeitos colaterais
import api from "@/services/api"; // Importa a instância da nossa API para fazer chamadas ao servidor
import DetalheProduto from "@/components/DetalheProduto"; // Importa o componente responsável por exibir os detalhes do produto

// Interface do produto - Define a estrutura dos dados que esperamos receber para um produto
interface Produto {
  id: number; // Identificador único do produto
  title: string; // Nome do produto
  description: string; // Descrição detalhada do produto
  price: number; // Preço do produto
  category: string; // Categoria à qual o produto pertence
  rating: number; // Avaliação do produto (geralmente uma nota)
  thumbnail: string; // URL da imagem pequena do produto
}

// Página de detalhes do produto - Este é o componente principal desta página
export default function ProdutoDetalhes() {
  // 'useRouter()' nos dá acesso ao objeto 'router', que contém informações sobre a rota atual
  const router = useRouter();
  // 'router.query' é um objeto que contém os parâmetros da URL. Para uma rota como '/produto/123', 'router.query.id' seria '123'
  const { id } = router.query;

  // 'useState' cria uma variável de estado chamada 'produto' para armazenar os detalhes do produto
  // Inicialmente, ela é 'null' porque ainda não buscamos os dados
  const [produto, setProduto] = useState<Produto | null>(null);

  // 'useEffect' é um hook que permite executar código após a renderização do componente
  // O array de dependências '[id]' significa que este efeito será executado sempre que o valor de 'id' mudar
  useEffect(() => {
    // Verificamos se 'id' tem um valor (para evitar fazer uma chamada à API sem um ID)
    if (id) {
      // Usamos a nossa 'api' para fazer uma requisição GET para um endpoint específico, usando o 'id' da rota
      // A crase (`) permite usar template literals para inserir o valor de 'id' na URL
      api.get(`/${id}`)
        .then((res) => {
          // Quando a chamada à API é bem-sucedida ('then'), recebemos a resposta ('res')
          // Assumimos que os dados do produto estão dentro de 'res.data'
          setProduto(res.data); // Atualizamos o estado 'produto' com os dados recebidos
        });
    }
  }, [id]); // O efeito roda novamente se o 'id' na URL mudar

  // O 'return' define o que será renderizado na tela
  return (
    <div style={{ padding: "2rem" }}> {/* Uma div para dar um espaçamento ao redor do conteúdo */}
      {/* Renderização condicional: se 'produto' tiver um valor (ou seja, os dados foram carregados)... */}
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
        // ...caso contrário (se 'produto' ainda for 'null', indicando que os dados estão carregando), mostra uma mensagem
        <p>Carregando produto...</p>
      )}
    </div>
  );
}