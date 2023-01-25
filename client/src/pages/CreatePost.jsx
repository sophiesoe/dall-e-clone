import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { Loader, FormField } from "../components";
import { getRandomPrompt } from "../utils";

function CreatePost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://dall-e-clone-qlne.onrender.com/api/v1/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...form }),
          }
        );
        await res.json();
        alert("Success");
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please fill out the form to submit.");
    }
  };
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const surpriseMeHandler = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  const generateImg = async () => {
    if (form.prompt) {
      try {
        setIsGenerating(true);
        const response = await fetch(
          "https://dall-e-clone-qlne.onrender.com/api/v1/dalle/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: form.prompt,
            }),
          }
        );

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setIsGenerating(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[1.5rem]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[1rem] max-w-[40rem]">
          Create imaginative and visually stunning generated through DALL-E AI
          and share them with the community
        </p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={submitHandler}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            name="name"
            type="text"
            placeholder="Sophie Soe"
            value={form.name}
            handleChange={changeHandler}
          />
          <FormField
            labelName="Prompt"
            name="prompt"
            type="text"
            placeholder="an armchair in the shape of an avocado"
            value={form.prompt}
            handleChange={changeHandler}
            isSurpriseMe
            handleSurpriseMe={surpriseMeHandler}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {isGenerating && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            className=" text-white bg-green-700 font-medium rounded-md text-sm sm:w-auto px-24 py-2.5 text-center"
            onClick={generateImg}
          >
            {isGenerating ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            ** Once you have created the image you want, you can share it with
            others in the community **
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm sm:w-auto px-12 py-2.5 text-center"
          >
            {isLoading ? "Sharing" : "Share with the Community"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePost;
