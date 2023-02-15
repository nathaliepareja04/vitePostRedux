import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, deletePost, putPost } from "./redux/postSlice";

const initialState = {
  id: "",
  img: "",
  title: "",
  description: "",
};

function App() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const [isEdit, setIsEdit] = useState(false);
  const [formulario, setFormulario] = useState(initialState);

  const HandleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    !isEdit ? dispatch(addPost(formulario)) : dispatch(putPost(formulario));

    cleanForm();
    setIsEdit(false);
  };

  const clickUpdate = (post) => {
    setIsEdit(true);
    setFormulario(post);
  };

  const cleanForm = () => {
    setFormulario(initialState);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* FORM */}
        <div className="col-3">
          <div className="card border border-5 rounded-4 border-danger">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    <strong>Title</strong>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formulario.title}
                    className="form-control border border-5 rounded-5 border-danger-subtle"
                    onChange={(e) => HandleChange(e)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <strong>Description</strong>
                  </label>
                  <input
                    type="text"
                    name="description"
                    className="form-control border border-5 rounded-5 border-danger-subtle"
                    value={formulario.description}
                    onChange={(e) => HandleChange(e)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <strong>Image</strong>
                  </label>
                  <input
                    type="text"
                    name="img"
                    className="form-control border border-5 rounded-5 border-danger-subtle"
                    value={formulario.img}
                    onChange={(e) => HandleChange(e)}
                  />
                </div>

                <button className="btn btn-success border-3 rounded-pill border-success-subtle">
                  {isEdit ? "Actualizar" : "Guardar"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="row col-9">
          {posts.map((post, i) => (
            <div className="col-5 md-4" key={i}>
              <div className="card">
                <img src={post.img} />
                <div className="card-body">
                  <h2 className="card-title">{post.title}</h2>
                  <h5 className="card-title">{post.id}</h5>
                  <p className="card-text">{post.description}</p>
                </div>

                <div
                  className="card-footer text-center"
                >
                  <button
                    className="btn btn-outline-danger me-4 rounded-pill"
                    onClick={() => dispatch(deletePost(post.id))}
                  >
                    <strong>delete</strong>
                  </button>
                  <button
                    className="btn btn-outline-primary rounded-pill"
                    onClick={() => clickUpdate(post)}
                  >
                    <strong>update</strong>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
