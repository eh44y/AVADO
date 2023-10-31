import { useParams } from "react-router-dom";
import CreateArticleForm from "../components/Article/CreateArticleForm";
import { ArticleContextProvider } from "../Store/Article-context";


const UpdateArticlePage = () => {

  let { articleId } = useParams();

  return ( 
    <ArticleContextProvider>
      <CreateArticleForm item={articleId} />
    </ArticleContextProvider>
  );
}

export default UpdateArticlePage;