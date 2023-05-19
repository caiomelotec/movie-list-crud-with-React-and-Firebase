import "./styles/createtitle.css"

export const CreateTitle = ({ handleToggle }) => {
  return (
    <div className="container-ct">
      <button onClick={handleToggle} className="create-title-btn">Create Title</button>
    </div>
  )
}
