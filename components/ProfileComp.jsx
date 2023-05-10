import Promtcard from "./Promtcard";

export default function Profile({name, disc, data, handleEdit, handleDelete, loader}) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{disc}</p>

      <div className="mt-16 prompt_layout">
      {
        !loader ?
        data && data.map((item,index)=> (
          <Promtcard 
            key={index} post={item} handleEdit={() => handleEdit && handleEdit(item)}
            handleDelete={() => handleDelete && handleDelete(item)}
          />
        )) : "Loader ..."
      }
    </div>
    </section>
  )
}
