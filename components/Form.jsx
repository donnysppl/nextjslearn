import Link from "next/link";

export default function Form({ type, post, setpost, submitting, handleSubmit }) {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {type} Post
        </span>
      </h1>

      <p className="desc text-left max-w-md">
        {type} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium ex nulla eius error illum quod pariatur, quasi debitis ipsam explicabo?
      </p>
      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">

        <label  >
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea value={post.prompt} className="form_textarea"
            onChange={(e) => setpost({ ...post, prompt: e.target.value })}
            placeholder="Write your Prompt here ..." required
          ></textarea>
        </label>

        <label >
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}<span className="font-normal">(#product, #idea)</span>
          </span>
          <input value={post.tag} className="form_input"
            onChange={(e) => setpost({ ...post, tag: e.target.value })}
            placeholder="#tag" required />

        </label>

        <div className="flex-end mx-3 mb-4 gap-4">
          <Link href={'/'} className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button type="submit" disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
            {submitting ? `${type}...` : type}
          </button>
        </div>

      </form>
    </section>
  )
}
