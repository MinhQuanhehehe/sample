import PostsList from './features/posts/PostsList';
import AddForm from './features/posts/AddForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Blog</h1>
      </header>
      <AddForm />
      <PostsList />
    </div>
  );
}

export default App;