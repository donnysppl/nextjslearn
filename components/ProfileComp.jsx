import Promtcard from "./Promtcard";

export default function Profile({name, disc, data, handleEdit, handleDelete}) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{disc}</p>

      <div className="mt-16 prompt_layout">
      {
        data && data.map((item,index)=> (
          <Promtcard 
            key={index} post={item} handleEdit={() => handleEdit && handleEdit(item)}
            handleDelete={() => handleDelete && handleDelete(item)}
          />
        ))
      }
    </div>
    </section>
  )
}
