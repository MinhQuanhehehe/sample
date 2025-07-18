import PostsList from './features/posts/PostsList';
import AddForm from './features/posts/AddForm';
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPost from './features/posts/EditPost';
import UsersList from './features/users/UserList';
import UserPage from './features/users/UserPage';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<PostsList />} />

        <Route path="post">
          <Route index element={<AddForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPost />} />
        </Route>

        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>
        
      </Route>
    </Routes>
  );
}

export default App;